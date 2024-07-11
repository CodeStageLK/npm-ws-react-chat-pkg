import React from 'react';
var MessageList = function (_a) {
    var messages = _a.messages;
    return (React.createElement("div", { id: "messages" }, messages.map(function (msg, index) { return (React.createElement("div", { key: index }, msg.message)); })));
};
export default MessageList;
