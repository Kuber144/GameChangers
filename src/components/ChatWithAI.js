// import React, { useState } from "react";
// import axios from "axios";

// const ChatAI = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [error, setError] = useState(null);

//   const handleSendMessage = async () => {
//     if (newMessage.trim() !== "") {
//       const message = {
//         text: newMessage,
//         username: "User",
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       try {
//         const response = await generateAnswer();
//         console.log(response);
//         setMessages([
//           ...messages,
//           message,
//           {
//             text: response,
//             username: "AI",
//             timestamp: new Date().toLocaleTimeString(),
//           },
//         ]);
//         setNewMessage("");
//         setError(null); // Clear any previous errors
//       } catch (error) {
//         console.error("Error sending message:", error);
//         setError("Failed to send message. Please try again."); // Set error message
//       }
//     }
//   };

//   const generateAnswer = async () => {
//     const response = await axios({
//       url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCCqxW8b7yEL5Y6jougbcGkVTRWsL5lixY",
//       method: "post",
//       data: {
//         contents: [{ parts: [{ text: newMessage }] }],
//       },
//     });
//     // console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
//     return response["data"]["candidates"][0]["content"]["parts"][0]["text"];
//   };

//   // Function to format code snippets
//   const formatCode = (text) => {
//     return (
//       <pre>
//         <code>{text}</code>
//       </pre>
//     );
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h1>Chat Section : </h1>
//       </div>
//       <div className="chat-messages-container">
//         {error ? (
//           <p className="error-message">{error}</p> // Display error message
//         ) : messages.length === 0 ? (
//           <p className="no-messages">Chat with AI</p>
//         ) : (
//           <div className="chat-messages">
//             <ul>
//               {messages.map((message, index) => (
//                 <li key={index} className="chat-message">
//                   <div className="message-info">
//                     <strong>{message.username}</strong> ({message.timestamp}):
//                   </div>
//                   <div className="message-text">
//                     {message.text.startsWith("```")
//                       ? formatCode(message.text.slice(3, -3))
//                       : message.text}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatAI;


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
        const response = await generateAnswer();
        console.log(response);
        setMessages([
          ...messages,
          message,
          {
            text: response,
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

  const generateAnswer = async () => {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCCqxW8b7yEL5Y6jougbcGkVTRWsL5lixY",
      method: "post",
      data: {
        contents: [{ parts: [{ text: newMessage }] }],
      },
    });
    // console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
    return response["data"]["candidates"][0]["content"]["parts"][0]["text"];
  };

  // Function to format code snippets
  const formatCode = (text) => {
    return (
      <pre>
        <code>{text}</code>
      </pre>
    );
  };

  // Function to format non-code sections
  // const formatText = (text) => {
  //   const lines = text.split("\n");
  //   const paragraphs = [];
  //   let paragraph = [];

  //   for (let i = 0; i < lines.length; i++) {
  //     if (i > 0 && i % 6 === 0) {
  //       paragraphs.push(paragraph.join(" "));
  //       paragraph = [];
  //     }
  //     paragraph.push(lines[i]);
  //   }

  //   if (paragraph.length > 0) {
  //     paragraphs.push(paragraph.join(" "));
  //   }

  //   return paragraphs.map((paragraph, index) => (
  //     <p key={index}>{paragraph}</p>
  //   ));
  // };
  // Function to format non-code sections
const formatText = (text) => {
  const lines = text.split("\n");
  const paragraphs = [];
  let paragraph = [];

  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && i % 6 === 0) {
      paragraphs.push(paragraph.join(" "));
      paragraph = [];
    }
    if (lines[i].trim().startsWith("*")) {
      if (paragraph.length > 0) {
        paragraphs.push(paragraph.join(" "));
        paragraph = [];
      }
      paragraphs.push(lines[i]);
    } else {
      paragraph.push(lines[i]);
    }
  }

  if (paragraph.length > 0) {
    paragraphs.push(paragraph.join(" "));
  }

  return paragraphs.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));
};


  // Function to format messages
  const formatMessage = (message) => {
    if (message.text.startsWith("```")) {
      return formatCode(message.text.slice(3, -3));
    } else {
      return formatText(message.text);
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
                  <div className="message-text">
                    {formatMessage(message)}
                  </div>
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
