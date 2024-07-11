var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState } from "react";
export var useWebSocket = function (payperviewId, token, userId, wsUrl) {
    var _a = useState([]), messages = _a[0], setMessages = _a[1];
    var _b = useState(null), ws = _b[0], setWs = _b[1];
    var _c = useState(false), showChatProgress = _c[0], setChatProgress = _c[1];
    useEffect(function () {
        var socket = new WebSocket(wsUrl);
        setWs(socket);
        socket.onopen = function () {
            console.log("Connected to WebSocket");
            socket.send(JSON.stringify({ event: "joinRoom", data: { payperviewId: payperviewId, token: token } }));
        };
        socket.onmessage = function (event) {
            var messageData = JSON.parse(event.data);
            var eventType = messageData.event, data = messageData.data;
            if (eventType === "updateMessages") {
                setMessages(function (prevMessages) {
                    if (data.firstRender) {
                        return data.data;
                    }
                    return __spreadArray(__spreadArray([], prevMessages, true), [data.data], false);
                });
            }
            else if (eventType === "chat-onChangeReceive") {
                if (data.userId === userId) {
                    setChatProgress(false);
                }
                else {
                    console.log("User is typing:", data.userId);
                    setChatProgress(data.onChange);
                }
            }
        };
        socket.onclose = function () {
            console.log("Disconnected from WebSocket");
        };
        return function () {
            socket.close();
        };
    }, [payperviewId, token]);
    var sendMessage = function (message) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                event: "send-message",
                data: { payperviewId: payperviewId, message: message, token: token },
            }));
            notifyTyping(false);
        }
    };
    var notifyTyping = function (state) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                event: "chat-onChange",
                data: { payperviewId: payperviewId, onChange: state, userId: userId },
            }));
        }
    };
    return { messages: messages, sendMessage: sendMessage, notifyTyping: notifyTyping, showChatProgress: showChatProgress };
};
