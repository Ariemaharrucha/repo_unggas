import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import socket from "../socket/socket.js";

export const ListDokter = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    socket.emit("joinRoom", 26);
    socket.on("receiveMessage", (msg) => {
      console.log("Message received in frontend:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  function handleSendMessage() {
    if (message.trim()) {
      socket.emit("sendMessage", {
        konsultasiId: 26,
        senderId: user.id,
        content: message,
      });
    }
    setMessage("");
  }

  return (
    <div>
      <h1>hi {user?.username} </h1>
      <h1>List Dokter</h1>
      <div>
        <div>
          <h2>Chat</h2>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.senderId === user.id ? "You" : "Dokter"}:</strong>{" "}
              {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
