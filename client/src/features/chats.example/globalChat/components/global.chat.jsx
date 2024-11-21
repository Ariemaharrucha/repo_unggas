import { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3000");

export const GlobalChat = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    // console.log(socket);
  
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
  
      // socket.emit("joinRoom", "global");
      // socket.on("receiveMessage", (msg) => {
      //   setMessages((prev) => [...prev, msg]);
      // });
  
      // return () => {
      //   socket.off("receiveMessage");
      // };
    }, []);
  
    function handleMessageChange(e) {
      setMessage(e.target.value);
    }
  
    function handleSendMessage() {
      // const messageData = {
      //   room: "global",
      //   message,
      //   sender: user.name,
      //   time: new Date().toLocaleTimeString(),
      // };
      // socket.emit("sendMessage", messageData);
      // setMessage(" ");
    }

  return (
    <div>
      <div className="space-y-3">
        {user ? (
          <>
            <p>{user.username}</p>
            <input
              type="text"
              className="border-2 p-2"
              placeholder="Type a message..."
              onChange={handleMessageChange}
              value={message}
            />
            {"  "}
            <button onClick={handleSendMessage}>kirim</button>
          </>
        ) : (
          <p>Please log in to access the chat.</p>
        )}
      </div>
      <ul>
        {messages.map((msg, index) => {
          return (
            <li key={index} className="space-y-2">
              <strong>{msg.sender} : </strong>
              {msg.message}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
