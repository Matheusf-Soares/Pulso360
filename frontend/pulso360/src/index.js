
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Start MSW (Mock Service Worker) in development so frontend can work without backend
// Mocks só iniciam se explicitamente habilitados via variável de ambiente
if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_ENABLE_MOCKS === 'true'
) {
  import('./mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .catch(() => {
      // Silencioso: se falhar, seguimos usando backend real
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
