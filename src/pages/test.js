import React from "react";

export default function test() {
  return (
    <div>
      <iframe
        style={{ width: "100%", height: "1000px", backgroundColor: "white" }}
        allow="camera;microphone"
        src="http://127.0.0.1:8000"
      ></iframe>
    </div>
  );
}
