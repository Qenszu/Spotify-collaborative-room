import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const [guessCanPause, setGuessCanPause] = useState(false);
  const [voteToSkip, setVoteToSkip] = useState(2);
  const [isHost, setIsHost] = useState(false);

  const { roomCode } = useParams();

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVoteToSkip(data.votes_to_skip);
        setGuessCanPause(data.guess_can_pause);
        setIsHost(data.is_host);
      });
  }, [roomCode]);

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {voteToSkip}</p>
      <p>Guess can pause: {guessCanPause ? "true" : "false"}</p>
      <p>Host: {isHost ? "true" : "false"}</p>
    </div>
  );
}
