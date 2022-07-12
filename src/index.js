import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DepartmentsProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DepartmentsProvider>
      <App />
    </DepartmentsProvider>
  </React.StrictMode>
);
