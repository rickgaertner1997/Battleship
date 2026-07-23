import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// Auto-import all CSS files in /styles
const styleModules = import.meta.glob(
  "./styles/**/*.css",
  { eager: true }
);

Object.values(styleModules);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Root element with id "root" was not found.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);