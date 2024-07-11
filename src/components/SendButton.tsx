import React from 'react';

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <button id="send-button" onClick={onClick}>
      Send
    </button>
  );
};

export default SendButton;
