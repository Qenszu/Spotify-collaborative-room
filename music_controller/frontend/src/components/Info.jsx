import { useState, useEffect } from "react";
import React from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info() {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return (
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="500"
            align="center"
          >
            Join a Room
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ maxWidth: "340px", width: "100%" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ lineHeight: 1.6 }}
          >
            Enter the room code to join your friends, press enter, and jump
            straight into the fun!
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function createInfo() {
    return (
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="500"
            align="center"
          >
            Create a Room
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ maxWidth: "340px", width: "100%" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ lineHeight: 1.6 }}
          >
            Set up your own customized room, adjust the settings to your liking,
            and invite your friends to start the party!
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} alignItems="center" direction="column">
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party???
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
