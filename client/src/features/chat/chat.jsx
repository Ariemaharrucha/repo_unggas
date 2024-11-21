import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket.js";

export const Chat = () => {
  const { konsultasiId } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // console.log(socket);
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (konsultasiId) {
      socket.emit("joinRoom", konsultasiId);
    }

    socket.on("receiveMessage", (msg) => {
      console.log("Message received in frontend:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [konsultasiId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        konsultasiId,
        senderId: user.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.senderId === user.id ? "You" : "Dokter"}:</strong> {msg.content}
          </li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};
