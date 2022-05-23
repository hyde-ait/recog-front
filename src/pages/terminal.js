import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const ws = new W3CWebSocket("ws://localhost:8000", "echo-protocol");

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [commandList, setCommandList] = useState([]);

  useEffect(() => {
    ws.onmessage = (msg) => {
      setCommandList((currentState) => [
        ...currentState,
        JSON.parseFloat(msg.data),
      ]);
    };
  }, []);

  const onSend = () => {
    let data = { method: "command", command: command };
    ws.send(JSON.stringify(data));
    setCommand("");
  };

  return (
    <div className="App">
      <div className="terminal">
        {commandList.map((list, i) => {
          return (
            <div id="history" style={{ textAlign: "left" }} key={i}>
              {list.data}
            </div>
          );
        })}
        <div className="line">
          <span id="path">&nbsp;&nbsp;</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter your command"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                onSend();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
