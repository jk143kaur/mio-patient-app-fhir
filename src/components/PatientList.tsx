import React, { useState, useEffect } from "react";
import { getPatients } from "../apis";
import { useNavigate } from "react-router-dom";


interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
}

const PatientsList: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function patientsLoader() {
      try {
        const data = await getPatients();
        if (!data) {
          console.warn("No patient data received");
          setError("Failed to fetch patient data.");
        } else {
          setPatients(data);
        }
      } catch (error) {
        console.error("Error fetching patient details", error);
        setError("Failed to fetch patient data.");
      }
    }

    patientsLoader();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-16 px-4 sm:px-8">
      <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-4xl">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">S No.</th>
              <th className="py-3 px-4 text-left">Patient Name</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.patientId}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } transition-all hover:bg-blue-50 cursor-pointer`}
                onClick={() => navigate(`/Patient/${patient.patientId}`)}
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">
                  {patient.firstName + " " + patient.lastName}
                </td>
                <td className="py-4 px-4">{patient.gender}</td>
                <td className="py-4 px-4">{patient.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsList;
