import React, { useState, KeyboardEvent } from 'react';

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

  return (
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
  );
};

export default MessageInput;
