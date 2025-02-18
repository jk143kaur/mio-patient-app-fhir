import "./App.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import PatientProfile from "./components/PatientProfile";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Patient/:id" element={<PatientProfile />} />
      </Routes>
    </>
  );
};

export default App;
