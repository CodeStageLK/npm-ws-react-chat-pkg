import React, { useState, useEffect, useRef } from "react";
import "./ChatApp.css";
import ChatInput from "./ChatInput";

// interface ChatProps {
//   roomId: string;
//   token: string;
//   userId: number;
//   wsUrl: string;
//   wsImgParam: string;
//   weUserNameParam: string;
// }

const ChatApp = ({
  roomId,
  token,
  userId,
  wsUrl,
  wsImgParam,
  weUserNameParam,
}) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket(wsUrl);
    setWs(websocket);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
      websocket.send(
        JSON.stringify({
          event: "joinRoom",
          data: { roomId, token },
        })
      );
    };

    websocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const { event: eventType, data } = messageData;

      if (eventType === "updateMessages") {
        updateMessages(data.data, data.firstRender);
      } else if (eventType === "chat-onChangeReceive") {
        console.log("User is typing:", data.userId);
      }
    };

    websocket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      websocket.close();
    };
  }, [roomId, token]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          event: "send-message",
          data: { roomId, message, token },
        })
      );
      setMessage("");
      setTyping(false);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      ws.send(
        JSON.stringify({
          event: "chat-onChange",
          data: { roomId, onChange: true, userId },
        })
      );
    }
  };

  const updateMessages = (newMessages, firstRender) => {
    if (firstRender) {
      setMessages(newMessages);
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessages]);
    }
  };

  return (
    <div id="chat-container">
      <h3>Chat Room inside node modules</h3>
      <div id="messages" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        id="message-input"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <ChatInput/>
      <button id="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
