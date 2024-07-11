import { useEffect, useState } from 'react';
import { Message } from '../types';

export const useWebSocket = (payperviewId: number, token: string, userId: number, wsUrl:string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    setWs(socket);

    socket.onopen = () => {
      console.log('Connected to WebSocket');
      socket.send(JSON.stringify({ event: 'joinRoom', data: { payperviewId, token } }));
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const { event: eventType, data } = messageData;

      if (eventType === 'updateMessages') {
        setMessages(data.data);
      } else if (eventType === 'chat-onChangeReceive') {
        console.log('User is typing:', data.userId);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => {
      socket.close();
    };
  }, [payperviewId, token]);

  const sendMessage = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event: 'send-message', data: { payperviewId, message, token } }));
    }
  };

  const notifyTyping = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event: 'chat-onChange', data: { payperviewId, onChange: true, userId } }));
    }
  };

  return { messages, sendMessage, notifyTyping };
};
