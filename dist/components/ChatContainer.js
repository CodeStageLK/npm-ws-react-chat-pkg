import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useWebSocket } from '../hooks/useWebSocket';
var ChatContainer = function (_a) {
    var roomId = _a.roomId, token = _a.token, userId = _a.userId, wsUrl = _a.wsUrl, wsImgProp = _a.wsImgProp, wsUserNameProp = _a.wsUserNameProp;
    var _b = useWebSocket(roomId, token, userId, wsUrl), messages = _b.messages, sendMessage = _b.sendMessage, notifyTyping = _b.notifyTyping, showChatProgress = _b.showChatProgress;
    var _c = useState(false), typing = _c[0], setTyping = _c[1];
    var handleSendMessage = function (message) {
        sendMessage(message);
    };
    var handleTyping = function () {
        if (!typing) {
            setTyping(true);
            notifyTyping(true);
        }
    };
    return (React.createElement("div", { id: "chat-container" },
        React.createElement("h3", null, "Chat Room"),
        React.createElement(MessageList, { messages: messages }),
        React.createElement(MessageInput, { onSendMessage: handleSendMessage, onTyping: handleTyping })));
};
export default ChatContainer;
