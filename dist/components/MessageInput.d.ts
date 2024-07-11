import React from 'react';
interface MessageInputProps {
    onSendMessage: (message: string) => void;
    onTyping: () => void;
}
declare const MessageInput: React.FC<MessageInputProps>;
export default MessageInput;
