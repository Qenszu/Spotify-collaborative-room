import React from "react";
import { Grid, Button } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";

export default function RenderSettings({
  voteToSkip,
  guessCanPause,
  roomCode,
  setShowSettings,
  getRoomDetails,
}) {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} align="center">
        <CreateRoomPage
          title={"Update Settings"}
          votesToSkip={voteToSkip}
          guessCanPause={guessCanPause}
          roomCode={roomCode}
          updateCallback={getRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
}
