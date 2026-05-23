import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function CreateRoomPage() {
  const defaultVotes = 2;
  const [guessCanPause, setGuessCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const navigate = useNavigate();

  function handleVotesChange(e) {
    if (e.target.value === "") {
      setVotesToSkip(1);
      return;
    }

    const val = parseInt(e.target.value, 10);

    if (val >= 1) {
      setVotesToSkip(val);
    } else {
      setVotesToSkip(1);
    }
  }

  function handleGuessCanPauseChange(e) {
    setGuessCanPause(e.target.value === "true" ? true : false);
  }

  function handleButtonRoomPressed() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guess_can_pause: guessCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
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
            <div align="center">Votes required to skip song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleButtonRoomPressed}
        >
          Create a Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
