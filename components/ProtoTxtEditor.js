import React, { useState } from "react";
import {
  highlight,
  highlightAll,
  languages,
} from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-protobuf";
import "prismjs/themes/prism-dark.css"; //Example style, you can use another

const ProtoTxtEditor = (props) => {
  /*Test : Model file validation
           Config file validation
           Code file validation */

  var re = /(?:\.([^.]+))?$/; //regex to extract file extension

  const date = Date.now();

  const [code, setCode] = useState(
    `input: "data"\ninput_shape{\n  dim: 1\n  dim: 3\n}`
  );
  const [language, setLanguage] = useState(languages.protobuf);
  const [modelFile, setModelFile] = useState(null);
  const [configFile, setConfigFile] = useState(null);
  const [configError, setConfigError] = useState(null);
  const [modelError, setModelError] = useState(null);
  const [modelType, setModelType] = useState("caffemodel");
  const [configType, setConfigType] = useState("prototxt");
  const [editorDisplay, setEditorDisplay] = useState(true);
  const [submitDisplay, setsubmitDisplay] = useState(true);

  const handleInput = (e) => {
    setCode(e.target.value);
    highlightAll();
  };

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
    <fieldset style={{ display: props.display }}>
      <legend>Custom model</legend>
      {/*############################# Model weight file input ############################# */}
      <div>
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
      </div>
      {/* ########################### Configuration file editor ####################################### */}
      <div>
        {/* ternary operation:  show field set if editorDisplay is true else show null (editorDisplay ? fieldset : null) */}
        {editorDisplay ? (
          <fieldset className="editor">
            <legend>Configuration file :</legend>
            <label>Write model configuration : </label>
            <div className="code-editor">
              <textarea></textarea>
              <pre>
                <code>{code}</code>
              </pre>
            </div>
            <button onClick={handleSubmit}>Submit</button>
            <div>
              <label>Or upload the {configType} configuration file : </label>
              <input type="file" onChange={handleConfigFileChange} />
            </div>
            <div>
              {/* Display error when invalid model file type */}
              {configError && (
                <div>
                  <label style={{ color: "red" }}>[Invalid file type]</label>{" "}
                  {configError}
                </div>
              )}{" "}
            </div>
          </fieldset>
        ) : null}
      </div>
      <div>
        <button>Upload custom model</button>
      </div>
    </fieldset>
  );
};

export default ProtoTxtEditor;
