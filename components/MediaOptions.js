import React, { useEffect, useState, useContext } from "react";
import {
  MetadataContext,
  SetMetadataContext,
} from "../context/MetadataProvider";

export default function MediaOptions(props) {
  const [vidResolution, setVidResolution] = useState("320x240");
  const [vidTransform, setVidTransform] = useState("none");
  const [vidCodec, setVidCodec] = useState("H264/90000");
  const [photoDisplay, setphotoDisplay] = useState("inline");
  const [stunDisplay, setstunDisplay] = useState("block");
  const [stun, setStun] = useState(true);
  const metadata = useContext(MetadataContext);
  const setMetadata = useContext(SetMetadataContext);

  useEffect(() => {
    setMetadata({
      resolution: vidResolution,
      transform: vidTransform,
      codec: vidCodec,
      stun: stun,
    });
    console.log(metadata);
  }, [vidResolution, vidTransform, vidCodec, stun]);

  const handleChange = (event) => {
    props.change(event.target.value);
    if (event.target.value === "photo") {
      setphotoDisplay("none");
      setstunDisplay("none");
    } else {
      setphotoDisplay("inline");
      setstunDisplay("block");
    }
  };

  const handleTransform = (event) => {
    setVidTransform(event.target.value);
    props.transform(event.target.value);
  };

  const changeRes = (event) => {
    setVidResolution(event.target.value);
  };

  const changeCodec = (event) => {
    setVidCodec(event.target.value);
  };

  return (
    <div className="option">
      <h2>Options</h2>
      <label>Use</label>
      <select id="type" onChange={handleChange}>
        <option value="video">Video</option>
        <option value="photo">Photo</option>
      </select>
      <select
        onChange={handleTransform}
        value={vidTransform}
        id="video-transform"
      >
        <option value="none">No transform</option>
        <option value="face">Face Detection</option>
        <option value="facecv">Face Detection (with cvlib)</option>
        <option value="object">Object Detection (with cvlib)</option>
        <option value="gender">Gender Detection (with cvlib)</option>
        <option value="edges">Edge detection</option>
        <option value="cartoon">Cartoon effect</option>
        <option value="rotate">Rotate</option>
        <option value="custom">Custom model</option>
      </select>
      <select
        value={vidResolution}
        onChange={changeRes}
        style={{ display: photoDisplay }}
        id="video-resolution"
      >
        <option value="320x240">320x240</option>
        <option value="640x480">640x480</option>
        <option value="960x540">960x540</option>
        <option value="1280x720">1280x720</option>
      </select>
      <select
        value={vidCodec}
        onChange={changeCodec}
        style={{ display: photoDisplay }}
        id="video-codec"
      >
        <option value="H264/90000">H264</option>
        <option value="VP8/90000">VP8</option>
      </select>
      <div className="option" style={{ display: stunDisplay }} id="stun">
        <input
          type="checkbox"
          value={stun}
          onChange={(e) => {
            setStun(e.target.checked);
            props.stunChecked(e.target.checked);
          }}
          checked={stun}
          id="use-stun"
        />
        <label htmlFor="use-stun">
          Use STUN server (NOT needed in a local network)
        </label>
      </div>
    </div>
  );
}
