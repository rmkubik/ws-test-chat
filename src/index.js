import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const chatUrl = new URL("ws://" + window.location.host + "/chat");
    const socket = new WebSocket(chatUrl);

    socket.addEventListener("open", () => {
      socket.send("Hello from client!");
    });

    socket.addEventListener("message", (event) => {
      setMessages([...messages, event.data]);
    });
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          console.log(message);
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
