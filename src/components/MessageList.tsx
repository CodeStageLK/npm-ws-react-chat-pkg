import React from 'react';
import { Message } from '../types';

interface MessageListProps {
  messages: any[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div id="messages">
      {messages.map((msg, index) => (
        <div key={index}>{msg.message}</div>
      ))}
    </div>
  );
};

export default MessageList;
