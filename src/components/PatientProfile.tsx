import React, { useEffect, useState } from "react";
import { getPatient } from "../apis";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaIdCard,
  FaPhone,
  FaClock,
} from "react-icons/fa";

export interface Patient {
  patientId: string;
  prefix: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  identifierCode: string;
  identifierType: string;
  identifierTypeValue: string;
  metaLastUpdated: string;
  metaProfile: string;
  metaVersionId: string;
}

function PatientProfile() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("All");
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatient() {
      if (id) {
        try {
          const patientDetails = await getPatient(id);
          if (patientDetails) setPatient(patientDetails);
          else {
            setError("Error fetching patient details");
          }
        } catch (err) {
          console.error("Error fetching patient", err);
          setError("An error occurred while fetching the patient details.");
        }
      } else {
        setError("Patient ID is missing");
      }
    }
    fetchPatient();
  }, [id]);

  console.log(error);
  if (!patient && !error) {
    return <div>Loading...</div>;
  }

  const sections = [
    "All",
    "Patient Details",
    "Identifiers",
    "Emergency Contact",
    "Metadata",
  ];

  return (
    <div>
      <Navbar />
      <main className="flex-grow p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => (
            <button
              key={section}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all 
                  ${
                    selectedSection === section
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {patient ? (
          <div className="grid grid-cols-1 gap-6">
            {(selectedSection === "All" ||
              selectedSection === "Patient Details") && (
              <MainCard title="Patient Details">
                <Detail
                  title="Prefix"
                  value={patient.prefix}
                  icon={<FaUser />}
                />
                <Detail
                  title="First Name"
                  value={patient.firstName}
                  icon={<FaUser />}
                />
                <Detail
                  title="Last Name"
                  value={patient.lastName}
                  icon={<FaUser />}
                />
                <Detail
                  title="Birth Date"
                  value={patient.birthDate}
                  icon={<FaBirthdayCake />}
                />
                <Detail
                  title="Gender"
                  value={patient.gender}
                  icon={<FaVenusMars />}
                />
                <Detail
                  title="Phone"
                  value={patient.phone}
                  icon={<FaPhone />}
                />
              </MainCard>
            )}

            {(selectedSection === "All" ||
              selectedSection === "Identifiers") && (
              <MainCard title="Identifiers">
                <Detail
                  title="Identifier Code"
                  value={patient.identifierCode}
                  icon={<FaIdCard />}
                />
                <Detail
                  title="Identifier Type"
                  value={patient.identifierType}
                  icon={<FaIdCard />}
                />
                <Detail
                  title="Identifier Type Value"
                  value={patient.identifierTypeValue}
                  icon={<FaIdCard />}
                />
              </MainCard>
            )}

            {(selectedSection === "All" ||
              selectedSection === "Emergency Contact") && (
              <MainCard title="Emergency Contact">
                <Detail
                  title="Name"
                  value={patient.emergencyContactName}
                  icon={<FaUser />}
                />
                <Detail
                  title="Phone"
                  value={patient.emergencyContactPhone}
                  icon={<FaPhone />}
                />
              </MainCard>
            )}

            {(selectedSection === "All" || selectedSection === "Metadata") && (
              <MainCard title="Metadata">
                <Detail
                  title="Last Updated"
                  value={patient.metaLastUpdated}
                  icon={<FaClock />}
                />
                <Detail
                  title="Profile"
                  value={patient.metaProfile}
                  icon={<FaIdCard />}
                />
                <Detail
                  title="Version ID"
                  value={patient.metaVersionId}
                  icon={<FaIdCard />}
                />
              </MainCard>
            )}
          </div>
        ) : !error ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

interface MainCardProps {
  title: string;
  children: React.ReactNode;
}

function MainCard({ title, children }: MainCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all">
      <div className="bg-blue-600 text-white text-lg font-semibold p-4">
        {title}
      </div>
      <div className="p-4 grid gap-4">{children}</div>
    </div>
  );
}

interface DetailProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function Detail({ icon, title, value }: DetailProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-blue-600 text-lg">{icon}</div>
      <div className="flex-1">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-gray-700 text-sm break-words truncate">{value}</p>
      </div>
    </div>
  );
}

export default PatientProfile;
