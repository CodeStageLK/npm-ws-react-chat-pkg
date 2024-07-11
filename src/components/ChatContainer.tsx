import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useWebSocket } from '../hooks/useWebSocket';
import { Message } from '../types';

interface ChatContainerProps {
  roomId: number;
  token: string;
  userId: number;
  wsUrl:string;
  wsImgProp:string;
  wsUserNameProp:string
}

const ChatContainer: React.FC<ChatContainerProps> = ({ roomId, token, userId, wsUrl, wsImgProp, wsUserNameProp }) => {
  const { messages, sendMessage, notifyTyping, showChatProgress } = useWebSocket(roomId, token, userId, wsUrl);
  const [typing, setTyping] = useState(false);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleTyping = () => {
    if (!typing) {
      setTyping(true);
      notifyTyping(true);
    }
  };

  return (
    <div id="chat-container">
      <h3>Chat Room</h3>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatContainer;
