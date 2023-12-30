import ReactDOM from "react-dom";
import React, { useEffect, useMemo, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useMemo(() => {
    const chatUrl = new URL("ws://localhost:8080//chat");

    return new WebSocket(chatUrl);
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.addEventListener("open", () => {
      // socket.send("Hello from client!");
    });

    socket.addEventListener("message", async (event) => {
      console.log({ event });

      const newMessage =
        event.data instanceof Blob ? await event.data.text() : event.data;

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          socket.send(message);
          setMessage("");
        }}
      >
        <input onChange={(e) => setMessage(e.target.value)} value={message} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((loggedMessage) => (
          <li>{loggedMessage}</li>
        ))}
      </ul>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
