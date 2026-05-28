import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Collapse,
} from "@mui/material";
import Alert from "@mui/material/Alert";

export default function CreateRoomPage({
  title = "Create a Room",
  votesToSkip: initialVotes = 2,
  guessCanPause: initialPause = true,
  roomCode = null,
  updateCallback = () => {},
}) {
  const [guessCanPause, setGuessCanPause] = useState(initialPause);
  const [votesToSkip, setVotesToSkip] = useState(initialVotes);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setGuessCanPause(initialPause);
    setVotesToSkip(initialVotes);
  }, [initialVotes, initialPause]);

  function handleVotesChange(e) {
    if (e.target.value === "") {
      setVotesToSkip(1);
      return;
    }
    const val = parseInt(e.target.value, 10);
    setVotesToSkip(val >= 1 ? val : 1);
  }

  function handleGuessCanPauseChange(e) {
    setGuessCanPause(e.target.value === "true" ? true : false);
  }

  function handleButtonRoomPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guess_can_pause: guessCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  }

  function handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guess_can_pause: guessCanPause,
        code: roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg("Room updated successfully!");
        setErrorMsg("");
      } else {
        setErrorMsg("Error updating room...");
        setSuccessMsg("");
      }
      updateCallback();
    });
  }

  function renderCreateButtons() {
    return (
      <Grid container spacing={1} direction="column">
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleButtonRoomPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1} direction="column">
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg !== "" ? (
            <Alert severity="success" onClose={() => setSuccessMsg("")}>
              {successMsg}
            </Alert>
          ) : (
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title == "Create a Room" ? "Create a Room" : "Update Settings"}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            value={guessCanPause}
            onChange={handleGuessCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            value={votesToSkip}
            slotProps={{
              htmlInput: {
                min: 1,
                style: { textAlign: "center" },
              },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>

      {title == "Create a Room" ? renderCreateButtons() : renderUpdateButtons()}
    </Grid>
  );
}
