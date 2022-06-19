import { Grid } from "@mui/material";
import React, { useState } from "react";

function Sdp(props) {
  const [offerSdp, setOfferSdp] = useState(props.offer);
  const [answerSdp, setAnswerSdp] = useState(props.answer);
  return (
    <div>
      <div style={{ width: "50%" }}>
        <h2>SDP</h2>
        <Grid container>
          <Grid item xs={6}>
            <h3>Offer</h3>
            <pre id="offer-sdp">{offerSdp}</pre>
          </Grid>
          <Grid item xs={6}>
            <h3>Answer</h3>
            <pre id="answer-sdp">{answerSdp}</pre>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Sdp;
