import React, { useState } from 'react';
var MessageInput = function (_a) {
    var onSendMessage = _a.onSendMessage, onTyping = _a.onTyping;
    var _b = useState(''), message = _b[0], setMessage = _b[1];
    var handleKeyPress = function (e) {
        if (e.key === 'Enter') {
            onSendMessage(message);
            setMessage('');
        }
    };
    return (React.createElement("input", { type: "text", id: "message-input", value: message, onChange: function (e) {
            setMessage(e.target.value);
            onTyping();
        }, onKeyPress: handleKeyPress, placeholder: "Type a message" }));
};
export default MessageInput;
