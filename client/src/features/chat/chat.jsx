import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket.js";
import axios from "axios";

export const Chat = () => {
  const { konsultasiId } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState(null);
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

  useEffect(() => {
    const fetchDokters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/konsultasi/dokter/${user?.id}`
        );
        setDokters(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dokters:", error);
      }
    };
    fetchDokters();
  }, [user?.id]);

  useEffect(() => {

  })

  function handleSelectDokter(dokter) {
    setSelectedDokter(dokter);
    setMessages([]);
    console.log(dokter);
    
  }

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
      <div className="w-[200px] h-screen p-4">
        <h1>list dokter</h1>
        <ul>
          {dokters &&
            dokters.map((dokter) => (
              <li key={dokter.id} onClick={() => handleSelectDokter(dokter)}>
                {dokter.username}
              </li>
            ))}
        </ul>
      </div>
      <div className="p-4">
        {selectedDokter && (
          <>
            <h2>{selectedDokter.username}</h2>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
            <h2 className="mt-2">Chat</h2>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>
                    {msg.senderId === user.id ? "You" : selectedDokter.username}:
                  </strong>{" "}
                  {msg.content}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
