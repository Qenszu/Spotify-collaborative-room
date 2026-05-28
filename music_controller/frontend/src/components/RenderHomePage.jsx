import React from "react";
import { Grid, Typography, Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export default function RenderHomePage() {
  return (
    <Grid container spacing={3} direction="column" alignItems="center">
      <Grid item xs={12} align="center">
        <Typography variant="h3" component="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="warning" to="/info" component={Link}>
            Info
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
