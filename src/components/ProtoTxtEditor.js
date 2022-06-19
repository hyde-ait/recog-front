import { Grid } from "@mui/material";
import React, { useState } from "react";
import ClassList from "./ClassList";

const ProtoTxtEditor = () => {
  /*Test : Model file validation
           Config file validation
           Code file validation */

  var re = /(?:\.([^.]+))?$/; //regex to extract file extension

  const date = Date.now();

  const [code, setCode] = useState(
    `input: "data"\ninput_shape{\n  dim: 1\n  dim: 3\n}`
  );
  const [list, setList] = useState({});
  const [modelFile, setModelFile] = useState(null);
  const [configFile, setConfigFile] = useState(null);
  const [classFile, setClassFile] = useState(null);
  const [configError, setConfigError] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [modelType, setModelType] = useState("caffemodel");
  const [configType, setConfigType] = useState("prototxt");
  const [editorDisplay, setEditorDisplay] = useState(true);
  const [submitDisplay, setsubmitDisplay] = useState(true);

  const handleTypeChange = (e) => {
    let type = e.target.value;
    setModelType(type);
    setEditorDisplay(true);
    switch (type) {
      case "yaml":
        setEditorDisplay(false);
        setConfigType("yaml");
        break;
      case "caffemodel":
        setConfigType("prototxt");
        break;
      case "pb":
        setConfigType("pbtxt");
        break;
      case "weights":
        setConfigType("cfg");
        break;
      default:
        alert("config type error");
    }
  };

  const handleModelFileChange = (e) => {
    let model = e.target.files[0];
    if (model && re.exec(model.name)[1] === modelType) {
      setModelFile(e.target.files[0]);
    } else {
      setModelFile(null);
      console.log(re.exec(model.name)[1]);
      setModelError(
        "Please input a model weight file with the right format !! (" +
          modelType +
          ")"
      );
      e.target.value = ""; //Delete file from element
    }
  };

  const handleConfigFileChange = async (e) => {
    e.preventDefault();
    let config = e.target.files[0];
    if (config && re.exec(config.name)[1] === configType) {
      setConfigFile(config);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        setCode(text);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      setConfigFile(null);
      setConfigError(
        "Please input a configuration file with the right format !! (" +
          configType +
          ")"
      );
      e.target.value = ""; //Delete file from element
    }
  };

  const handleSubmit = () => {
    setConfigFile(
      new File([code], "filename." + configType, {
        type: "text/plain",
        lastModified: date,
      })
    );
  };

  const handleUpload = () => {};

  return (
    <Grid style={{ padding: "2px" }}>
      <fieldset>
        <legend>
          <h1>Custom model</h1>
        </legend>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/*############################# Model weight file input ############################# */}
          <Grid item xs={10}>
            <fieldset className="modeltype">
              <legend>Model weights file : </legend>
              <label>Choose model weights type : </label>
              <select value={modelType} onChange={handleTypeChange}>
                <option value="caffemodel">Caffe</option>
                <option value="pb">Tensorflow</option>
                <option value="weights">Darknet(YOLO)</option>
                <option value="yaml">LBPH Face Recognizer model</option>
              </select>
              <div style={{ display: "block" }}>
                <label>
                  Upload <b>.{modelType}</b> file :
                </label>
                <input type="file" onChange={handleModelFileChange} />
              </div>
              <div>
                {/* Display error when invalid model file type */}
                {modelError && (
                  <div>
                    <label style={{ color: "red" }}>[Invalid file type]</label>{" "}
                    {modelError}
                  </div>
                )}{" "}
              </div>
            </fieldset>
          </Grid>
          {/* ########################### Configuration file editor ####################################### */}
          <Grid item xs={6}>
            {/* ternary operation:  show field set if editorDisplay is true else show null (editorDisplay ? fieldset : null) */}
            {editorDisplay ? (
              <fieldset className="editor">
                <legend>Configuration file :</legend>
                <label>Write model configuration : </label>
                <div>
                  <textarea
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    defaultValue={code}
                    rows="6"
                    cols="20"
                  ></textarea>
                  <p>Config file content preview :</p>
                  <pre>
                    <code>{code}</code>
                  </pre>
                </div>
                <div>
                  <label>
                    Or upload the {configType} configuration file :{" "}
                  </label>
                  <input type="file" onChange={handleConfigFileChange} />
                </div>
                <button onClick={handleSubmit}>Submit</button>

                <div>
                  {/* Display error when invalid model file type */}
                  {configError && (
                    <div>
                      <label style={{ color: "red" }}>
                        [Invalid file type]
                      </label>{" "}
                      {configError}
                    </div>
                  )}{" "}
                </div>
              </fieldset>
            ) : null}
          </Grid>
          {/* ########################### Classification classes editor ####################################### */}
          <Grid item xs={6}>
            <fieldset>
              <legend>Classification classes list</legend>
              <ClassList file={setClassFile}></ClassList>
            </fieldset>
          </Grid>
          <Grid item xs={6}>
            <button>Upload custom model</button>
          </Grid>
        </Grid>
      </fieldset>
    </Grid>
  );
};

export default ProtoTxtEditor;
