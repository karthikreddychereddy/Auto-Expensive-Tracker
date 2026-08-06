import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "highlight.js/styles/atom-one-dark.css";

import App from "./App";
import AppProvider from "./context/AppProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <Toaster position="top-right" />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);