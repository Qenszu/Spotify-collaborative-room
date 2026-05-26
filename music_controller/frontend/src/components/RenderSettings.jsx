import React from "react";
import { Grid, Button } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";

export default function RenderSettings({
  voteToSkip,
  guessCanPause,
  roomCode,
  setShowSettings,
}) {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update={true}
          voteToSkip={voteToSkip}
          guessCanPause={guessCanPause}
          roomCode={roomCode}
          updateCallback={null}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
}
