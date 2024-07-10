import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css';

const ChatApp = ({ payperviewId, token, userId, url }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket(url);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('Connected to WebSocket');
      websocket.send(
        JSON.stringify({
          event: 'joinRoom',
          data: { payperviewId, token },
        })
      );
    };

    websocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const { event: eventType, data } = messageData;

      if (eventType === 'updateMessages') {
        updateMessages(data.data, data.firstRender);
      } else if (eventType === 'chat-onChangeReceive') {
        console.log('User is typing:', data.userId);
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      websocket.close();
    };
  }, [payperviewId, token]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          event: 'send-message',
          data: { payperviewId, message, token },
        })
      );
      setMessage('');
      setTyping(false);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      ws.send(
        JSON.stringify({
          event: 'chat-onChange',
          data: { payperviewId, onChange: true, userId },
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
      <h3>Chat Room</h3>
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
          if (e.key === 'Enter') sendMessage();
        }}
      />
      <button id="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
