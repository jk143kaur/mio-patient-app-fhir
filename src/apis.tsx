import axios from "axios";
import FHIRPath from "fhirpath";

const backendUrl = "http://localhost:3001/fhir/";

interface FHIRResource {
  resource: {
    id: string;
    name: {
      prefix: string;
      given: string[];
      family: string;
    };
    birthDate: string;
    gender: string;
    contact: Array<{
      name: {
        given: string[];
        family: string;
      };
      telecom: { value: string }[];
    }>;
    identifier: Array<{
      type: {
        coding: { code: string; display: string }[];
      };
      value: string;
    }>;
    telecom: Array<{ value: string }>;
    meta: {
      lastUpdated: string;
      profile: string[];
      versionId: string;
    };
  };
}

 export interface Patient {
  patientId: string;
  firstName: string;
  lastName: string;
  prefix: string;
  birthDate: string;
  gender: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  identifierCode: string;
  identifierType: string;
  identifierTypeValue: string;
  phone: string;
  metaProfile: string;
  metaVersionId: string;
  metaLastUpdated: string;
}

export async function getPatients(): Promise<Patient[] | void> {
  try {
    const res = await axios.get(`${backendUrl}/Patient`);
    const data = res.data;
    if (!data.entry) {
      throw new Error("No patient data found in response");
    }

    const patients: Patient[] = data.entry.map((patient: FHIRResource) =>
      processPatientData(patient)
    );
    console.log(patients);
    return patients;
  } catch (error) {
    console.error("Error fetching patient data", error);
  }
}

const processPatientData = (patient: FHIRResource): Patient => {
  const patientId =
    (FHIRPath.evaluate(patient, "resource.id") as string[])[0] ||
    "No Id available";
  const prefix =
    (FHIRPath.evaluate(patient, "resource.name.prefix") as string[])[0] ||
    "No prefix available";
  const firstName =
    (FHIRPath.evaluate(patient, "resource.name.given") as string[])[0] ||
    "No name provided";
  const lastName =
    (FHIRPath.evaluate(patient, "resource.name.family") as string[])[0] ||
    "No name provided";
  const birthDate =
    (FHIRPath.evaluate(patient, "resource.birthDate") as string[])[0] ||
    "No birthdate provided";

const emergencyContactName =
  (
    FHIRPath.evaluate(patient, "resource.contact.name.given") as string[]
  )[0] || "None specified";

  const emergencyContactPhone = (FHIRPath.evaluate(patient, "resource.contact.telecom.value") as string[]
      )[0] || "None specified"
   

  const gender =
    (FHIRPath.evaluate(patient, "resource.gender") as string[])[0] ||
    "No gender specified";
  const identifierCode =
    (
      FHIRPath.evaluate(
        patient,
        "resource.identifier.type.coding.code"
      ) as string[]
    )[0] || "No identifier specified";
  const phone =
    (FHIRPath.evaluate(patient, "resource.telecom.value") as string[])[0] ||
    "No phone provided";
  const identifierType =
    (
      FHIRPath.evaluate(
        patient,
        "resource.identifier.type.coding.display"
      ) as string[]
    )[0] || "None specified";
  const identifierTypeValue =
    (FHIRPath.evaluate(patient, "resource.identifier.value") as string[])[0] ||
    "None specified";
  const metaLastUpdated =
    (FHIRPath.evaluate(patient, "resource.meta.lastUpdated") as string[])[0] ||
    "None specified";
  const metaProfile =
    (FHIRPath.evaluate(patient, "resource.meta.profile") as string[])[0] ||
    "None specified";
  const metaVersionId =
    (FHIRPath.evaluate(patient, "resource.meta.versionId") as string[])[0] ||
    "None specified";

  return {
    patientId,
    firstName,
    lastName,
    prefix,
    birthDate,
    gender,
    emergencyContactName,
    emergencyContactPhone,
    identifierCode,
    identifierType,
    identifierTypeValue,
    phone,
    metaProfile,
    metaVersionId,
    metaLastUpdated,
  };
};

export async function getPatient(id: string): Promise<Patient | void> {
  try {
    const res = await axios.get(`${backendUrl}/Patient/${id}`);
    const patientData  = res.data;
    const entry: FHIRResource = { resource: patientData };
    const patient: Patient = processPatientData(entry);
    console.log(patient);
    return patient;
  } catch (error) {
    console.error("Error fetching patient details", error);
  }
}
