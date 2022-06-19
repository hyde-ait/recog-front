import Head from "next/head";
import { useState, createContext, useEffect } from "react";
import MediaOptions from "../components/MediaOptions";
import PhotoMedia from "../components/PhotoMedia";
import Sdp from "../components/Sdp";
import VideoStream from "../components/VideoStream";
import { MetadataProvider } from "../context/MetadataProvider";
import useAuth from "../hooks/useAuth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [photoDisplay, setPhotoDisplay] = useState("none");
  const [buttonDisplay, setButtonDisplay] = useState("inline");
  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [editorDisplay, setEditorDisplay] = useState("none");
  const [stunChecked, setStunChecked] = useState(true);
  const user = useAuth();

  useEffect(() => {
    console.log(user.user);
  }, []);

  const handleDisplay = (mediaType) => {
    // change media type
    if (mediaType === "photo") {
      setPhotoDisplay("inline");
      setButtonDisplay("none");
    } else {
      setPhotoDisplay("none");
      setButtonDisplay("inline");
    }
  };

  const handleAnswer = (a) => {
    console.log(a);
    setAnswer(a);
  };

  const handleOffer = (o) => {
    setOffer(o);
  };

  const changeTransform = (transform) => {
    console.log(transform);
    //send type of transformation
    if (transform === "custom") {
      //show protobuf editor for custom models
      setEditorDisplay("inline");
    } else {
      setEditorDisplay("none");
    }
  };

  const changeStun = (status) => {
    setStunChecked(status);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Recog Prototype</title>
        <meta
          name="description"
          content="Front end for opencv object recognition"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ position: "relative", left: "250px" }}>
        <MetadataProvider>
          <div
            style={{
              width: "20%",
              float: "left",
              margin: "10px 50px 0px 10px",
            }}
          >
            <MediaOptions
              change={handleDisplay}
              transform={changeTransform}
              stunChecked={changeStun}
            ></MediaOptions>
          </div>
          <div
            style={{
              float: "left",
              alignItems: "stretch",
              margin: "10px 0px 0px 0px",
            }}
          >
            <PhotoMedia display={photoDisplay}></PhotoMedia>
            <VideoStream
              display={buttonDisplay}
              stunChecked={stunChecked}
              offer={setOffer}
              answer={setAnswer}
            ></VideoStream>
          </div>
          <div
            style={{
              margin: "10px 0px 0px 0px",
              width: "50%",
            }}
          >
            <Sdp
              style={{ display: buttonDisplay }}
              offer={handleOffer}
              answer={handleAnswer}
            ></Sdp>
          </div>
        </MetadataProvider>
      </div>
    </div>
  );
}
