import ReactDOM from "react-dom";
import React, { useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

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
