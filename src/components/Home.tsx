import React from "react";
import PatientList from "./PatientList";
import Navbar from "./Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <PatientList />
    </div>
  );
};

export default Home;
