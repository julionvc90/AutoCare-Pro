import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

// React dibuja toda la app dentro del <div id="root"> de index.html.
// BrowserRouter permite tener varias "páginas" (URLs) sin recargar.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
