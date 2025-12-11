import express from "express";
import { Server } from "socket.io";
import http from "http";
import { connectDb } from "./db.js";
import { getRecentMessage, saveMessage } from "./controllers/message.controller.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

//connecting to the database
connectDb();

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  // When a user joins
  socket.on("userConnected", async(data) => {
    console.log("User joined from hostel:", data.hostel, "ID:", data.userId);

    //loading all the old chats and sending to the new joined user

    //extracting all the messages from database
    const messages =  await getRecentMessage();
    //sending all the message to the new joined user
    socket.emit("loadMessages", messages);

    // Notify others only (broadcast)
    socket.broadcast.emit("someoneJoined", {
      hostel: data.hostel,
      userId: data.userId
    });
  });

  // When a message is sent
  socket.on("sendMessage", async(data) => {
    console.log("Message:", data.text, "from hostel:", data.hostel);

    const savedMsg = await saveMessage(data);
    // Send to all except sender
    socket.broadcast.emit("receiveMessage", data);
  });
});

server.listen(4040, () => {
  console.log("Server listening on 4040");
});
