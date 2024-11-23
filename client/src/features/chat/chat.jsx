import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import socket from "../socket/socket.js";
import axios from "axios";

export const Chat = () => {
  const { konsultasiId } = useParams();
  const location = useLocation()
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const konsultasi_id = parseInt(konsultasiId);
  const [loading, setLoading] = useState(false);
  const namaDokter = location.state?.nama_dokter || "Dokter Tidak Diketahui";
  const spesialisDokter = location.state?.spesialis || "spesialis Tidak Diketahui";
  const imageProfile = location.state?.image_profile || "image profile Tidak Diketahui";
  
  
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
        // setDokters(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch dokters:", error);
      }
    };
    fetchDokters();
  }, [user?.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/messages/${konsultasi_id}`
        );
        setMessages(response.data.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
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
      <div className="p-4">
        <div className="size-10">
          <img src={`http://localhost:3000/${imageProfile}`} alt="image profile dokter" className="object-cover h-full w-full"/>
        </div>
        <h1>{namaDokter}</h1>
        <h2>spesialis: {spesialisDokter}</h2>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <h2 className="mt-2">Chat</h2>
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>
                    {msg.senderId === user.id ? "anda" : "dokter"}:
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
