import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onWebSocket } from "../webSocket/websocket";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState("");
  const [userId] = useState(uuidv4()); // temporary unique ID for this session
  const [hostelName, setHostelName] = useState("");
  const messagesEndRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  // Redirect if hostel not selected
  useEffect(() => {
    if (state?.hostelName) {
      setHostelName(state.hostelName);
    } else {
      navigate("/choose-hostel");
    }
  }, [state, navigate]);

  useEffect(() => {
    if (!hostelName) return;

    const socket = onWebSocket();

    socket.on("connect", () => {
      console.log("Connected to chat server");
      socket.emit("userConnected", { hostel: hostelName, userId });
    });

    // Load all previous messages from backend
    socket.on("loadMessages", (msgs) => {
      // Format timestamp for old messages
      const formatted = msgs.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      }));
      setMessages(formatted);
    });

    // Someone joined
    socket.on("someoneJoined", (data) => {
      setPopup(`User #${data.userId.slice(-4)} from ${data.hostel} joined`);
      setTimeout(() => setPopup(""), 3000);
    });

    // Receiving new messages
    socket.on("receiveMessage", (data) => {
      if (data.userId !== userId) {
        const formatted = {
          ...data,
          timestamp: new Date(data.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        };
        setMessages((prev) => [...prev, formatted]);
      }
    });

    return () => socket.disconnect();
  }, [hostelName, userId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const socket = onWebSocket();

    const messageData = {
      userId,
      hostel: hostelName,
      text: input,
      timestamp: new Date().toISOString(), // send ISO to backend for consistency
    };

    // Send to backend
    socket.emit("sendMessage", messageData);

    // Display immediately with nice format
    setMessages((prev) => [
      ...prev,
      { ...messageData, timestamp: new Date(messageData.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) }
    ]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const getBubbleClasses = (msg) =>
    msg.userId === userId
      ? "max-w-[70%] p-3 rounded-xl bg-cyan-900/80 text-cyan-100 ml-auto rounded-br-none border border-cyan-500/50 shadow-cyan-600/50"
      : "max-w-[70%] p-3 rounded-xl bg-violet-900/70 text-gray-300 mr-auto rounded-tl-none border border-violet-500/30 shadow-violet-600/40";

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden text-white">
      {/* Background Fog */}
      <div className="absolute inset-0 bg-gradient-to-black from-black/90 via-gray-900/60 to-black/90 pointer-events-none animate-pulse-slow"></div>

      {/* Header */}
      <header className="p-4 z-10 relative border-b border-gray-700/50 bg-black/80 text-center backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-red-600 drop-shadow-md">
          ⚠️ Subhartian Dark Confession ⚠️
        </h1>
        <p className="text-xs text-gray-400 mt-1">Anonymous & temporary. 24h auto-delete.</p>
      </header>

      {/* Popup */}
      {popup && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg animate-fadeIn z-50">
          {popup}
        </div>
      )}

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.userId === userId ? "items-end" : "items-start"}`}>
            {msg.userId !== userId && (
              <div className="text-xs text-gray-500 mb-1 font-mono tracking-widest opacity-80">
                User #{msg.userId.slice(-4)} from {msg.hostel}
              </div>
            )}
            <div className={getBubbleClasses(msg)}>
              <p className="text-sm break-words">{msg.text}</p>
              <span className="text-[10px] block mt-1 opacity-70">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="p-4 border-t border-gray-700/50 bg-black/90 backdrop-blur-sm flex items-center space-x-3 z-10">
        <input
          type="text"
          placeholder="Type your dark confession..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-3 rounded-full bg-gray-900/80 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-600/50 placeholder-gray-400 transition duration-200 shadow-inner"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-3 bg-red-700/80 text-white font-semibold rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg shadow-red-900/50 active:scale-95"
        >
          Send
        </button>
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.6; }
          }
          .animate-pulse-slow { animation: pulse-slow 8s infinite; }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translate(-50%, -10px); }
            100% { opacity: 1; transform: translate(-50%, 0); }
          }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        `}
      </style>
    </div>
  );
};

export default Chat;
