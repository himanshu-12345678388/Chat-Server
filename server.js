import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import Redis from 'ioredis';
import http from 'http';
import { Message } from './models/user.js';

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);


//initializing socket.io with cors
const io = new Server(server , {
    cors:{
        origin : "*",
        methods: ['GET','POST']
    }
});

//initialising redis client 
const pubClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const subClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

const REDIS_CHAT_CHANNEL = 'CHAT_ROOMS';

subClient.subscribe(REDIS_CHAT_CHANNEL,(err,count)=>{
    if(err){
        console.error('Failed to subscribe to Redis channel:', err);
    }
    else {
        console.log(`subscribed successfully to ${count} REDIS CHANNELS`);
    }
});


// CHANGE THIS: subClient.on('message', ...)
// TO THIS SAFEST REDIS SUBSCRIPTION FORMAT:
subClient.on('message', (channel, message) => {
  if (channel === REDIS_CHAT_CHANNEL) {
    try {
      const parsedData = JSON.parse(message);
      const { room, sender, text, timestamp } = parsedData;
      
      // Make sure io instance is defined above this block
      io.to(room).emit('recieve_message', { sender, text, timestamp });
    } catch (e) {
      console.error("Error parsing redis payload:", e);
    }
  }
});

    //mange websocket connections
    io.on('connection',(socket) => {
        console.log('user connected: $(socket.id} ');

        //client requests to join a room
        socket.on('join_room',async (roomName)=>{
            socket.join(roomName);
            console.log(`user ${socket.id} joined room: ${roomName}`);

            try{
                const chatHistory = await Message.find({room: roomName})
                .sort({createdAt: 1 })  // sorting chronologically
                .limit(20);

                socket.emit('chat_history',chatHistory);
            }catch(error){
                console.error('Failed to fetch chat history:', error);
            }
        });

        //client sends a new message
        socket.on('send_message',async (data)=>{
            const { room, sender,text } = data;

            try{
                const newMessage = new Message({room,sender,text});
                await newMessage.save();

            const messagePayload = {
                room,
                sender,
                text,
                timestamp: newMessage.timestamp
            };

            //publishing it to redis so all backend instances pick it up
            await pubClient.publish(REDIS_CHAT_CHANNEL, JSON.stringify(messagePayload));
        }
        catch(err) {
            console.error("failed to save or broadcast message:",err);
        }
        });

            socket.on('disconnect',()=>{
                console.log(`user disconneted: ${socket.id}`);
            });
    });

       app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});






const port= process.env.PORT || 5000;

server.listen(port,"0.0.0.0",() =>{
    console.log(`server is running on port ${port}`);
});


