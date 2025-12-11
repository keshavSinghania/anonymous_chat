import mongoose, { modelNames } from "mongoose";
const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    hostel: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
        index: true,
    }
});

// Auto delete after 24 hours (86400 sec)
messageSchema.index({timestamp: 1}, {expireAfterSeconds: 7200});
export const Message = mongoose.model("Message", messageSchema);