import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./Css/index.css";
import { AuthCont } from "./Components/Services/AuthContext.jsx";
//import "bootstrap/dist/css/bootstrap.css";
const faviconHref =
  AuthCont.theme === "light" ? "/car-white.svg" : "/car-black.svg";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <link rel="icon" type="image/svg+xml" href={faviconHref} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
