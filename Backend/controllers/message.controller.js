import { Message } from "../models/message.schema.js"

export const saveMessage = async (data) => {
    try {
        const msg = await Message.create({
            userId: data.userId,
            hostel: data.hostel,
            text: data.text,
            timestamp: new Date(),
        });

        return msg;
    } catch (error) {
        console.log("Error saving message", error)
    }
};

export const getRecentMessage = async() => {
    try {
        return await Message.find({})
            .sort({timestamp: 1})
            .lean();
    } catch (error) {
        console.log("Error fethcing message:", error)
    }
}