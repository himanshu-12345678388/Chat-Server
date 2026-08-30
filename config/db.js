import mongoose from 'mongoose';

async function connectDB(){
    try{
       await mongoose.connect(process.env.MONGO_URL);
       console.log('MongoDB connected successfully');
    }
    catch(error){
        console.log('Database connection issue',error);
        process.exit(1);
    }
}































export {connectDB};
