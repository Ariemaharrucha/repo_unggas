import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket.js";

export const Chat = () => {
  const { konsultasiId } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const konsultasi_id = parseInt(konsultasiId);
  // console.log(socket);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    socket.emit("joinRoom", konsultasi_id);

    socket.on("receiveMessage", (msg) => {
      console.log("Message received in frontend:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [konsultasi_id]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        konsultasiId: konsultasi_id,
        senderId: user.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex ">
      <div className="w-[200px] h-screen">
        <h1>list dokter</h1>
      </div>
      <div>
        <h2>Chat</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.senderId === user.id ? "You" : "Dokter"}:</strong>{" "}
              {msg.content}
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
    </div>
  );
};
