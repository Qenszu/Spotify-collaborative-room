import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import RenderSettingsButton from "./RenderSettingsButton";
import RenderSettings from "./RenderSettings";

export default function Room({ leaveRoomCallback }) {
  const [guessCanPause, setGuessCanPause] = useState(false);
  const [voteToSkip, setVoteToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { roomCode } = useParams();
  const navigate = useNavigate();

  function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallback();
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setVoteToSkip(data.votes_to_skip);
        setGuessCanPause(data.guess_can_pause);
        setIsHost(data.is_host);
      });
  }

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json " },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      leaveRoomCallback();
      navigate("/");
    });
  }

  if (showSettings) {
    return RenderSettings({
      voteToSkip,
      guessCanPause,
      roomCode,
      setShowSettings,
      getRoomDetails,
    });
  }
  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {voteToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guess can pause: {guessCanPause ? "Yes, they can" : "No, they cannot"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost ? "True" : "False"}
        </Typography>
      </Grid>
      {isHost ? RenderSettingsButton({ showSettings, setShowSettings }) : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
