import { createRoot } from "react-dom/client";
import React from "react";
import HomePage from "./HomePage";
import { Box, Typography, Button } from "@mui/material";

const gradientAnimation = {
  "@keyframes gradientShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
};

export default function App() {
  return (
    <div className="center">
      <Box
        sx={{
          // Rejestracja animacji CSS
          ...gradientAnimation,
          // Rozciągamy kontener na cały ekran
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          // Definicja gradientu (możesz dobrać własne kolory)
          // Kolory zbliżone do tych z image_cae860.png i image_cae87a.png: niebieski, fiolet, koralowy/czerwony
          background:
            "linear-gradient(-45deg, #1e3c72, #2a5298, #6f5175, #e056fd, #ed4c67)",
          // Zwiększamy rozmiar tła, żeby animacja miała przestrzeń do przesuwania się
          backgroundSize: "400% 400%",
          // Wywołanie animacji: nazwa, czas trwania, płynność (ease), nieskończone powtarzanie
          animation: "gradientShift 15s ease infinite",

          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <HomePage />
      </Box>
    </div>
  );
}

const appDiv = document.getElementById("app");
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(<App />);
}
