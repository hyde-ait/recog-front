import React, { useRef, useState, useContext } from "react";
import { MetadataContext } from "../context/MetadataProvider";

export default function PhotoMedia(props) {
  const [startDisplay, setStartDisplay] = useState("block");
  const [stopDisplay, setStopDisplay] = useState("none");
  const metadata = useContext(MetadataContext);
  const webcam = useRef();
  const canvas = useRef();
  const imgTransform = useRef();

  const handleStart = async () => {
    // Start webcam
    setStopDisplay("block");
    setStartDisplay("none");
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    webcam.current.srcObject = stream;
    window.localStream = stream;
  };

  const handleStop = () => {
    // Stop webcam
    window.localStream.getTracks().forEach((track) => {
      track.stop();
    });
    setStopDisplay("none");
    setStartDisplay("block");
  };

  const handleCapture = () => {
    //Send webcam screenshot to server and receive processed image
    canvas.current
      .getContext("2d")
      .drawImage(
        webcam.current,
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );
    canvas.current.toBlob(function (blob) {
      var formData = new FormData();
      formData.append(metadata.transform, blob);
      var requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch("https://recog-prototype.herokuapp.com/photo", requestOptions)
        .then((response) => response.blob())
        .then((imageBlob) => {
          var imageObjectURL = URL.createObjectURL(imageBlob);
          imgTransform.current.src = imageObjectURL;
        })
        .catch((error) => console.log("error", error));
    });
  };

  return (
    <div id="photo-media" style={{ display: props.display }}>
      <h2>Photo processing</h2>
      <div className="wrapper">
        <fieldset className="webcam">
          <legend>WEBCAM</legend>
          <video
            id="webcam"
            width="320"
            height="240"
            autoPlay={true}
            ref={webcam}
            style={{ display: stopDisplay }}
          ></video>
        </fieldset>
      </div>
      <div className="wrapper">
        <button
          id="start-camera"
          onClick={() => {
            handleStart();
          }}
          style={{ display: startDisplay }}
        >
          Start Camera
        </button>
        <button
          id="stop-camera"
          onClick={() => {
            handleStop();
          }}
          style={{ display: stopDisplay }}
        >
          Stop Camera
        </button>
        <button
          onClick={() => {
            handleCapture();
          }}
          id="click-photo"
          style={{ display: stopDisplay }}
        >
          Capture
        </button>
      </div>
      <div className="wrapper">
        <fieldset className="results">
          <legend>RAW IMAGE</legend>
          <canvas
            id="canvas"
            ref={canvas}
            width="320"
            height="240"
            style={{ display: stopDisplay }}
          ></canvas>
        </fieldset>
        <fieldset className="results">
          <legend>TRANSFORMATION RESULT </legend>
          <img
            alt=""
            id="img-transform"
            ref={imgTransform}
            width="320"
            height="240"
            style={{ display: stopDisplay }}
          ></img>
        </fieldset>
      </div>
    </div>
  );
}
