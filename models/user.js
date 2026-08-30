import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    room: { type: String, required: true, index: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }},
    {
        timestamps: true 
});

export const Message = mongoose.model('Message', messageSchema);
