import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import RenderSettingsButton from "./RenderSettingsButton";
import RenderSettings from "./RenderSettings";
import MusicPlayer from "./MusicPlayer";

export default function Room({ leaveRoomCallback }) {
  const [guessCanPause, setGuessCanPause] = useState(false);
  const [voteToSkip, setVoteToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState(null);

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

        if (data.is_host) {
          authenticateSpotify();
        }
      });
  }

  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);

  function getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (response.status === 204 || !response.ok) {
          return null;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
      });
  }

  useEffect(() => {
    getCurrentSong();
    const interval = setInterval(getCurrentSong, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
      {!song ? (
        <Grid item xs={12} align="center">
          <p>Play music on spotify to start</p>
        </Grid>
      ) : (
        <MusicPlayer {...song} />
      )}

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
