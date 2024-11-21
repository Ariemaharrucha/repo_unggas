import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket/socket.js";

export const ChatDokter = () => {
  const [dokter, setDokter] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dokterData = localStorage.getItem("user");
    if (dokterData) {
      setDokter(JSON.parse(dokterData));
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (dokter?.id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/dokter/${dokter.id}/users`
          );
          setUsers(response.data.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      }
    };
    fetchUsers();
  }, [dokter?.id]);

  useEffect(() => {
    if (selectedUser?.konsultasi_id) {
      socket.emit("joinRoom", selectedUser.konsultasi_id);

      socket.on("receiveMessage", (msg) => {
        console.log("Message received in frontend:", msg);
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [selectedUser?.konsultasi_id]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        konsultasiId: selectedUser.konsultasi_id,
        senderId: dokter.id,
        content: message,
      });
    }
    setMessage("");
  };


  return (
    <div className="flex">
      <aside>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setMessages([]);
                console.log(selectedUser);
              }}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </aside>
      <section>
        {selectedUser ? (
          <>
            <h2>Chat with {selectedUser.username}</h2>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>
                    {msg.senderId === dokter.id ? "You" : selectedUser.username}:
                  </strong>{" "}
                  {msg.content}
                </li>
              ))}
            </ul>          
          </>
        ) : (
          <p>Select user to start chatting.</p>
        )}
      </section>
    </div>
  );
};
