import React, { Component } from "react";
import { createRoot } from "react-dom/client";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Testing</h1>;
  }
}

// 3. Nowy sposób montowania aplikacji w React 19
const appDiv = document.getElementById("app");
if (appDiv) {
  const root = createRoot(appDiv);
  root.render(<App />);
}
