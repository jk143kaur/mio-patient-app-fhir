import axios from "axios";
import FHIRPath from "fhirpath";
import { FHIRResource, Patient } from "./types";


const backendUrl = import.meta.env.VITE_BACKEND_URL 

export async function getPatients(): Promise<Patient[]> {
  try {
    const res = await axios.get(`${backendUrl}/Patient`);
    const data = res.data;

    if (!data.entry) {
      throw new Error("No patient data found in response");
    }

    return data.entry.map((entry: FHIRResource) => processPatientData(entry));
  } catch (error) {
    console.error("Error fetching patient data", error);
    throw error;
  }
}

const processPatientData = (patient: FHIRResource): Patient => {

  const extractFHIRValue = (path: string): string => {
    const result = FHIRPath.evaluate(patient, path);
    return Array.isArray(result) && result.length > 0 ? String(result[0]) : "";
  };

  return {
    patientId: extractFHIRValue("resource.id"),
    prefix: extractFHIRValue("resource.name[0].prefix"),
    firstName: extractFHIRValue("resource.name[0].given[0]"),
    lastName: extractFHIRValue("resource.name[0].family"),
    birthDate: extractFHIRValue("resource.birthDate"),
    gender: extractFHIRValue("resource.gender"),
    emergencyContactName: extractFHIRValue("resource.contact[0].name.given[0]"),
    emergencyContactPhone: extractFHIRValue(
      "resource.contact[0].telecom[0].value"
    ),
    identifierCode: extractFHIRValue(
      "resource.identifier[0].type.coding[0].code"
    ),
    identifierType: extractFHIRValue(
      "resource.identifier[0].type.coding[0].display"
    ),
    identifierTypeValue: extractFHIRValue("resource.identifier[0].value"),
    phone: extractFHIRValue("resource.telecom[0].value"),
    metaProfile: extractFHIRValue("resource.meta.profile[0]"),
    metaVersionId: extractFHIRValue("resource.meta.versionId"),
    metaLastUpdated: extractFHIRValue("resource.meta.lastUpdated"),
  };
};

export async function getPatient(id: string): Promise<Patient> {
  try {
    const res = await axios.get(`${backendUrl}/Patient/${id}`);
    return processPatientData({ resource: res.data });
  } catch (error) {
    console.error("Error fetching patient details", error);
    throw error;
  }
}
