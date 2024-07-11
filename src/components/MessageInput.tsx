import React, { useState, KeyboardEvent } from 'react';
import SendButton from './SendButton';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onTyping: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage(message);
      setMessage('');
    }
  };
  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };
  return (
    <div id="message-input-container">
    <input
      type="text"
      id="message-input"
      value={message}
      onChange={(e) => {
        setMessage(e.target.value);
        onTyping();
      }}
      onKeyPress={handleKeyPress}
      placeholder="Type a message"
    />
    <SendButton onClick={handleSendClick} />
  </div>
  );
};

export default MessageInput;
