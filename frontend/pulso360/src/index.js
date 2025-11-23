
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Start MSW (Mock Service Worker) in development so frontend can work without backend
if (process.env.NODE_ENV === "development") {
  // Use dynamic import so this only runs in dev and doesn't affect production bundles
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  }).catch((err) => {
    // If MSW isn't installed or fails, fall back silently (real backend may be used)
    // console.warn('MSW worker failed to start', err);
  });
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
