import React, { useState } from "react";
import axios from "axios";

const ChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const message = {
        text: newMessage,
        username: "User",
        timestamp: new Date().toLocaleTimeString(),
      };

      try {
        const response = await axios.post("/api/chat", { message });
        setMessages([
          ...messages,
          message,
          {
            text: response.data.text,
            username: "AI",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        setNewMessage("");
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again."); // Set error message
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Section : </h1>
      </div>
      <div className="chat-messages-container">
        {error ? (
          <p className="error-message">{error}</p> // Display error message
        ) : messages.length === 0 ? (
          <p className="no-messages">Chat with AI</p>
        ) : (
          <div className="chat-messages">
            <ul>
              {messages.map((message, index) => (
                <li key={index} className="chat-message">
                  <div className="message-info">
                    <strong>{message.username}</strong> ({message.timestamp}):
                  </div>
                  <div className="message-text">{message.text}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatAI;
