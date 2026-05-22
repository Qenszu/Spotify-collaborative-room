import { createRoot } from "react-dom/client";
import React from "react";
import HomePage from "./HomePage";

export default function App() {
  return (
    <>
      <h1>Testing</h1>
      <HomePage />
    </>
  );
}

const appDiv = document.getElementById("app");
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(<App />);
}
