import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket/socket.js";

export const ChatDokter = () => {
  const [dokter, setDokter] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const fetchMessages = async () => {
      if (selectedUser?.konsultasi_id) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/api/v1/messages/${selectedUser.konsultasi_id}`
          );
          setMessages(response.data.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMessages();
  }, [selectedUser?.konsultasi_id]);

  useEffect(() => {
    if (selectedUser?.konsultasi_id) {
      socket.emit("joinRoom", selectedUser.konsultasi_id);

      const handleReceiveMessage = (msg) => {
        console.log("Message received in frontend:", msg);
        setMessages((prev) => [...prev, msg]);
      };

      socket.on("receiveMessage", handleReceiveMessage);
      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
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
    <div className="flex p-6">
      <aside className="border-r p-4 h-screen">
        <h2>Users / pasien</h2>
        <ul>
          {users.map((user) => (
              <div key={user.id} className="flex gap-4">
                <div className="size-10">
                  <img
                    src={user.image_profile}
                    alt="image profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  onClick={() => {
                    if (selectedUser?.id !== user.id) {
                      setSelectedUser(user);
                      setMessages([]);
                      console.log(user);
                    }
                  }}
                >
                  {user.username}
                </div>
              </div>
          ))}
        </ul>
      </aside>
      <section className="ps-3">
        {selectedUser ? (
          <>
            <div className="flex gap-4">
            <div className="size-10">
                  <img
                    src={selectedUser.image_profile}
                    alt="image profile"
                    className="h-full w-full object-cover"
                  />
            </div>
            <h2>Chat dengan {selectedUser.username}</h2>
            </div>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
            {loading ? (
              <p>Loading messages...</p>
            ) : (
              <>
                <ul>
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>
                        {msg.senderId === dokter.id
                          ? "Anda"
                          : selectedUser.username}
                        :
                      </strong>{" "}
                      {msg.content}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        ) : (
          <p>Select user to start chatting.</p>
        )}
      </section>
    </div>
  );
};
