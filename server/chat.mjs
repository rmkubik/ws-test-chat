import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    console.log("received: %s", data);

    // ws is JUST the specific connection
    // ws.send(data);

    // I copied this code
    // - what does readyState mean?
    // - what does binary mean?
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("something");
});
