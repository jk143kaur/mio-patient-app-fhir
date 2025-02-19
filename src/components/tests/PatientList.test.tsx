import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PatientList from "../PatientList";
import { getPatients } from "../../apis";
import { Patient } from "../../types";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";



vi.mock("../../apis", () => ({
  getPatients: vi.fn<() => Promise<Patient[]>>(),
}));

const mockPatients: Patient[] = [
  {
    patientId: "1",
    firstName: "John",
    lastName: "Doe",
    prefix: "Prof",
    phone: "",
    gender: "Male",
    birthDate: "1990-01-01",
    emergencyContactPhone: "",
    emergencyContactName: "",
    identifierCode: "",
    identifierType: "",
    identifierTypeValue: "",
    metaLastUpdated: "",
    metaProfile: "",
    metaVersionId: "",
  },
];

describe("PatientList", () => {
  it("should render patient list with name, gender, and date of birth", async () => {
    (getPatients as Mock).mockResolvedValue(mockPatients);
    /**
     * @vitest-environment jsdom
     */
    render(
      <MemoryRouter>
        <PatientList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Male")).toBeInTheDocument();
      expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    });
  });

  it("should display an error message if the patient data fails to load", async () => {
    (getPatients as Mock).mockRejectedValue(
      new Error("Failed to fetch patient data.")
    );
    render(
      <MemoryRouter>
        <PatientList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch patient data.")
      ).toBeInTheDocument();
    });
  });
});
