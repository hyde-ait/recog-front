import Head from "next/head";
import { useState, createContext, useEffect } from "react";
import MediaOptions from "../components/MediaOptions";
import PhotoMedia from "../components/PhotoMedia";
import ProtoTxtEditor from "../components/ProtoTxtEditor";
import VideoStream from "../components/VideoStream";
import { MetadataProvider } from "../context/MetadataProvider";
import useAuth from "../hooks/useAuth";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [photoDisplay, setPhotoDisplay] = useState("none");
  const [buttonDisplay, setButtonDisplay] = useState("inline");
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

      <div>
        <MetadataProvider>
          <div
            style={{
              width: "50%",
              float: "left",
              padding: "20px",
            }}
          >
            <PhotoMedia display={photoDisplay}></PhotoMedia>
            <VideoStream
              display={buttonDisplay}
              stunChecked={stunChecked}
            ></VideoStream>
          </div>

          <div
            style={{
              width: "20%",
              float: "left",
              padding: "20px",
            }}
          >
            <MediaOptions
              change={handleDisplay}
              transform={changeTransform}
              stunChecked={changeStun}
            ></MediaOptions>

            <ProtoTxtEditor display={editorDisplay}></ProtoTxtEditor>
          </div>
        </MetadataProvider>
      </div>
    </div>
  );
}
