import { useEffect, useState } from "react";
import { Message } from "../types";

export const useWebSocket = (
  payperviewId: number,
  token: string,
  userId: number,
  wsUrl: string
) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [showChatProgress, setChatProgress] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
    setWs(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      socket.send(
        JSON.stringify({ event: "joinRoom", data: { payperviewId, token } })
      );
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const { event: eventType, data } = messageData;

      if (eventType === "updateMessages") {
        setMessages((prevMessages) => {
          if (data.firstRender) {
            return data.data;
          }
          return [...prevMessages, data.data];
        });
      } else if (eventType === "chat-onChangeReceive") {
        if (data.userId === userId) {
          setChatProgress(false);
        } else {
          console.log("User is typing:", data.userId);
          setChatProgress(data.onChange);
        }
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      socket.close();
    };
  }, [payperviewId, token]);

  const sendMessage = (message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          event: "send-message",
          data: { payperviewId, message, token },
        })
      );
      notifyTyping(false);
    }
  };

  const notifyTyping = (state: boolean) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          event: "chat-onChange",
          data: { payperviewId, onChange: state, userId },
        })
      );
    }
  };

  return { messages, sendMessage, notifyTyping, showChatProgress };
};
