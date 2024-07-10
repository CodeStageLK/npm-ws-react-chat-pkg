document.addEventListener("DOMContentLoaded", (event) => {
  const payperviewId = 52; // Replace with actual payperviewId
  const token = "1676|fYxK6kgdrFLhDALRwEszJJnS3MTHNlovXCgWeKWq"; // Replace with actual token

  const ws = new WebSocket("ws://localhost:8080/ws");
  const messagesContainer = document.getElementById("messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  let typing = false;

  ws.onopen = () => {
    console.log("Connected to WebSocket");
    ws.send(
      JSON.stringify({
        event: "joinRoom",
        data: { payperviewId, token },
      })
    );
  };

  ws.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    const { event: eventType, data } = messageData;

    if (eventType === "updateMessages") {
      updateMessages(data.data, data.firstRender);
    } else if (eventType === "chat-onChangeReceive") {
      console.log("User is typing:", data.userId);
    }
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket");
  };

  sendButton.addEventListener("click", () => {
    sendMessage();
  });

  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  messageInput.addEventListener("input", () => {
    if (!typing) {
      typing = true;
      ws.send(
        JSON.stringify({
          event: "chat-onChange",
          data: { payperviewId, onChange: true, userId: 1 }, // Replace userId with actual user id
        })
      );
    }
  });

  function sendMessage() {
    const message = messageInput.value.trim();
    if (message && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          event: "send-message",
          data: { payperviewId, message, token },
        })
      );
      messageInput.value = "";
      typing = false;
    }
  }

  function updateMessages(messages, firstRender) {
    const messageElement = document.createElement("div");
    console.log(messages);

    if (firstRender) {
      console.log(firstRender);

      messages.forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.textContent = msg.message;
        messagesContainer.appendChild(messageElement);
      });
    } else {
      messageElement.textContent = messages.message;
      messagesContainer.appendChild(messageElement);
    }
  }
});
