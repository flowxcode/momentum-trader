import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SMATrader from "./SMATrader";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
    <SMATrader period={20} />{" "}
    {/* Use the SMATrader component with a specified period */}
  </React.StrictMode>,
);
