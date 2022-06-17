import React, { useState, useEffect, useRef, useContext } from "react";
import { MetadataContext } from "../context/MetadataProvider";

export default function VideoStream(props) {
  const [loader, setLoader] = useState(false);
  const [offerSdp, setOfferSdp] = useState("");
  const [answerSdp, setAnswerSdp] = useState("");
  const [framerate, setFramerate] = useState(0);
  const [vidHeight, setVidHeight] = useState(320);
  const [vidWidth, setVidWidth] = useState(240);
  const [displayButton, setDisplayButton] = useState(true);
  const [server, setServer] = useState(
    "https://recog-prototype.herokuapp.com/offer"
  );
  const metadata = useContext(MetadataContext);
  const video = useRef();

  // peer connection
  const [pc, setPc] = useState(null);

  useEffect(() => {
    console.log(props.stunChecked);
  }, [props.stunChecked]);

  const changePc = (x) => {
    setPc(x);
  };

  const chargePc = () => {
    var config = {
      sdpSemantics: "unified-plan",
    };
    if (props.checked) {
      config.iceServers = [
        { urls: ["stun:stun.l.google.com:19302"] },
        {
          urls: "turn:openrelay.metered.ca:80",
          username: "openrelayproject",
          credential: "openrelayproject",
        },

        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ];
    }
    changePc(new RTCPeerConnection(config));
  };

  useEffect(() => {
    chargePc();
  }, []);

  const createPeerConnection = () => {
    // connect video
    pc.addEventListener("track", function (evt) {
      console.log("listening to track...");
      setLoader(false);
      video.current.srcObject = evt.streams[0];

      setInterval(() => {
        // Show fps
        let fps = evt.streams[0].getVideoTracks()[0].getSettings().frameRate;
        if (fps) {
          setFramerate(fps);
        }
        setVidHeight(evt.streams[0].getVideoTracks()[0].getSettings().height);
        setVidWidth(evt.streams[0].getVideoTracks()[0].getSettings().width);
      }, 10);
    });

    return pc;
  };

  const negotiate = () => {
    return pc
      .createOffer()
      .then(function (offer) {
        return pc.setLocalDescription(offer);
      })
      .then(function () {
        // wait for ICE gathering to complete
        return new Promise(function (resolve) {
          if (pc.iceGatheringState === "complete") {
            resolve();
          } else {
            function checkState() {
              if (pc.iceGatheringState === "complete") {
                pc.removeEventListener("icegatheringstatechange", checkState);
                resolve();
              }
            }
            pc.addEventListener("icegatheringstatechange", checkState);
          }
        });
      })
      .then(function () {
        console.log(pc);
        var offer = pc.localDescription;
        var codec;

        codec = metadata.codec;
        if (codec !== "default") {
          offer.sdp = sdpFilterCodec("video", codec, offer.sdp);
        }

        setOfferSdp(offer.sdp);

        return fetch(server, {
          body: JSON.stringify({
            sdp: offer.sdp,
            type: offer.type,
            video_transform: metadata.transform,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (answer) {
        setAnswerSdp(answer.sdp);
        return pc.setRemoteDescription(answer);
      })
      .catch(function (e) {
        alert(e);
      });
  };

  const start = () => {
    console.log(metadata);
    setLoader(true);
    setDisplayButton(false);
    changePc(createPeerConnection());

    var time_start = null;

    function current_stamp() {
      if (time_start === null) {
        time_start = new Date().getTime();
        return 0;
      } else {
        return new Date().getTime() - time_start;
      }
    }

    var constraints = {
      video: false,
    };

    var resolution = metadata.resolution;
    if (resolution) {
      resolution = resolution.split("x");
      constraints.video = {
        width: parseInt(resolution[0], 0),
        height: parseInt(resolution[1], 0),
      };
    } else {
      constraints.video = true;
    }

    console.log("before get user media");
    if (constraints.video) {
      navigator.mediaDevices.getUserMedia(constraints).then(
        function (stream) {
          stream.getTracks().forEach(function (track) {
            pc.addTrack(track, stream);
          });
          return negotiate();
        },
        function (err) {
          alert("Could not acquire media: " + err);
        }
      );
    } else {
      negotiate();
    }
  };

  const stop = () => {
    // close local video
    pc.getSenders().forEach(function (sender) {
      sender.track.stop();
    });
    try {
      // close transceivers
      if (pc.getTransceivers) {
        pc.getTransceivers().forEach(function (transceiver) {
          if (transceiver.stop) {
            transceiver.stop();
          }
        });
      }
      // close peer connection
      setTimeout(function () {
        pc.close();
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      video.current.srcObject = null;
      chargePc();
      setAnswerSdp("");
      setOfferSdp("");
      setDisplayButton(true);
    }
  };

  // Fonction pour filtrer codec dans SDP
  function sdpFilterCodec(kind, codec, realSdp) {
    var allowed = [];
    var rtxRegex = new RegExp("a=fmtp:(\\d+) apt=(\\d+)\r$");
    var codecRegex = new RegExp("a=rtpmap:([0-9]+) " + escapeRegExp(codec));
    var videoRegex = new RegExp("(m=" + kind + " .*?)( ([0-9]+))*\\s*$");

    var lines = realSdp.split("\n");

    var isKind = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("m=" + kind + " ")) {
        isKind = true;
      } else if (lines[i].startsWith("m=")) {
        isKind = false;
      }

      if (isKind) {
        var match = lines[i].match(codecRegex);
        if (match) {
          allowed.push(parseInt(match[1]));
        }

        match = lines[i].match(rtxRegex);
        if (match && allowed.includes(parseInt(match[2]))) {
          allowed.push(parseInt(match[1]));
        }
      }
    }

    var skipRegex = "a=(fmtp|rtcp-fb|rtpmap):([0-9]+)";
    var sdp = "";

    isKind = false;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("m=" + kind + " ")) {
        isKind = true;
      } else if (lines[i].startsWith("m=")) {
        isKind = false;
      }

      if (isKind) {
        var skipMatch = lines[i].match(skipRegex);
        if (skipMatch && !allowed.includes(parseInt(skipMatch[2]))) {
          continue;
        } else if (lines[i].match(videoRegex)) {
          sdp += lines[i].replace(videoRegex, "$1 " + allowed.join(" ")) + "\n";
        } else {
          sdp += lines[i] + "\n";
        }
      } else {
        sdp += lines[i] + "\n";
      }
    }

    return sdp;
  }

  function escapeRegExp(string) {
    console.log(string);
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  return (
    <div style={{ display: props.display }}>
      <div id="media">
        <h2>Video:</h2>
        {displayButton ? (
          <button id="start" onClick={start}>
            Start
          </button>
        ) : (
          <button id="stop" onClick={stop}>
            Stop
          </button>
        )}
        <div style={{ display: "flex" }}>
          <pre id="framerate"> FPS : {framerate} |</pre>
          <pre id="height"> Height: {vidHeight} |</pre>
          <pre id="width"> Width : {vidWidth} |</pre>
        </div>

        <fieldset className="webcam">
          <legend>STREAM</legend>
          {loader ? <div id="loader"></div> : null}
          <video
            id="video"
            ref={video}
            autoPlay={true}
            playsInline={true}
          ></video>
        </fieldset>
        <fieldset style={{ display: "flex", width: "100%" }}>
          <legend>
            <h2>SDP</h2>
          </legend>
          <div>
            <div>
              <h3>Offer</h3>
              <pre id="offer-sdp">{offerSdp}</pre>
            </div>
            <div>
              <h3>Answer</h3>
              <pre id="answer-sdp">{answerSdp}</pre>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
