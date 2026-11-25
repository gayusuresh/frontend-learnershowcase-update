import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
<<<<<<< HEAD
import "./styles.css";
=======
import "./styles/main.css";
import "./styles/layout.css";
import "./styles/admin.css";
>>>>>>> 251e00f (sixth)
createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
