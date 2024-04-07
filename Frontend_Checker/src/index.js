import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import CreateTests from "./components/CreateTests";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestList from "./components/deleteTests";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreateTests />} /> {/* For creating */}
      <Route path="/delete" element={<TestList />} /> {/* For deleting */}
    </Routes>
  </Router>
);
