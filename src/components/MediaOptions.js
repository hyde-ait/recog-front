import React, { useEffect, useState, useContext } from "react";
import {
  MetadataContext,
  SetMetadataContext,
} from "../context/MetadataProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          sx={{ backgroundColor: "primary", color: "white" }}
          id="type"
        >
          Media Type
        </InputLabel>
        <Select
          labelId="type"
          id="demo-simple-select"
          label="Media Type"
          onChange={handleChange}
          defaultValue={"video"}
          sx={{ backgroundColor: "primary", color: "white" }}
        >
          <MenuItem value={"video"}>Videostream</MenuItem>
          <MenuItem value={"photo"}>Photo</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          sx={{ backgroundColor: "primary", color: "white" }}
          id="type"
        >
          Transformation Type
        </InputLabel>
        <Select
          label="Transformation Type"
          onChange={handleTransform}
          value={vidTransform}
          sx={{ backgroundColor: "primary", color: "white" }}
        >
          <MenuItem value="none">No transform</MenuItem>
          <MenuItem value="face">Face Detection</MenuItem>
          <MenuItem value="facecv">Face Detection (with cvlib)</MenuItem>
          <MenuItem value="object">Object Detection (with cvlib)</MenuItem>
          <MenuItem value="gender">Gender Detection (with cvlib)</MenuItem>
          <MenuItem value="edges">Edge detection</MenuItem>
          <MenuItem value="cartoon">Cartoon effect</MenuItem>
          <MenuItem value="rotate">Rotate</MenuItem>
          <MenuItem value="custom">Custom model</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          sx={{
            backgroundColor: "primary",
            color: "white",
            display: photoDisplay,
          }}
          id="type"
        >
          Video Resolution
        </InputLabel>
        <Select
          label="Video Resolution"
          onChange={changeRes}
          value={vidResolution}
          sx={{
            backgroundColor: "primary",
            color: "white",
            display: photoDisplay,
          }}
        >
          <MenuItem value="320x240">320x240</MenuItem>
          <MenuItem value="640x480">640x480</MenuItem>
          <MenuItem value="960x540">960x540</MenuItem>
          <MenuItem value="1280x720">1280x720</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          sx={{
            backgroundColor: "primary",
            color: "white",
            display: photoDisplay,
          }}
          id="type"
        >
          Video Codec
        </InputLabel>
        <Select
          label="Video Codec"
          value={vidCodec}
          onChange={changeCodec}
          style={{ display: photoDisplay }}
          id="video-codec"
          sx={{
            backgroundColor: "primary",
            color: "white",
          }}
        >
          <MenuItem value="H264/90000">H264</MenuItem>
          <MenuItem value="VP8/90000">VP8</MenuItem>
        </Select>
      </FormControl>

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
