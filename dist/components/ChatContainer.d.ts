import React from "react";
import "../styles/index.css";
interface ChatContainerProps {
    roomId: number;
    token: string;
    userId: number;
    wsUrl: string;
    wsImgProp: string;
    wsUserNameProp: string;
}
declare const ChatContainer: React.FC<ChatContainerProps>;
export default ChatContainer;
