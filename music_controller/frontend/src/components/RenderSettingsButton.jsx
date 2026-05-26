import React from "react";
import { Grid, Button } from "@mui/material";

export default function RenderSettingsButton({
  showSettings,
  setShowSettings,
}) {
  return (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </Button>
    </Grid>
  );
}
