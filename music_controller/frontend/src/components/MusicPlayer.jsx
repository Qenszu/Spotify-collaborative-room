import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function MusicPlayer({
  title,
  image_url,
  artist,
  time,
  duration,
  is_playing,
}) {
  const songProgress = duration > 0 ? (time / duration) * 100 : 0;
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 500,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 1 }}>
          <CardContent
            sx={{ flex: "1 0 auto", p: 1, "&:last-child": { pb: 1 } }}
          >
            <Typography
              component="div"
              variant="h5"
              noWrap
              sx={{ maxWidth: 280 }}
            >
              {title || "No Title"}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {artist || "Unknown Artist"}
            </Typography>
          </CardContent>

          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause" size="large">
              {is_playing ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayArrowIcon fontSize="large" />
              )}
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 140, height: 140, objectFit: "cover" }}
          image={image_url || "https://via.placeholder.com/140"}
          alt="Album cover"
        />
      </Box>
      <LinearProgress
        variant="determinate"
        value={songProgress}
        sx={{ width: "100%" }}
      />
    </Card>
  );
}
