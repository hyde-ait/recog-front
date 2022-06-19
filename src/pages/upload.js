import { Grid } from "@mui/material";
import React from "react";
import ProtoTxtEditor from "../components/ProtoTxtEditor";

function Upload() {
  return (
    <Grid style={{ padding: "30px" }}>
      <ProtoTxtEditor></ProtoTxtEditor>
    </Grid>
  );
}

export default Upload;
