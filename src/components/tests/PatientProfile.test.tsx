import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PatientProfile from "../PatientProfile";
import { getPatient } from "../../apis";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

vi.mock("../../apis", () => ({
  getPatient: vi.fn().mockResolvedValue(null), 
}));


describe("PatientProfile Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPatient = {
    patientId: "123",
    prefix: "Mr.",
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01",
    gender: "Male",
    phone: "123-456-7890",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "987-654-3210",
    identifierCode: "ID123",
    identifierType: "Passport",
    identifierTypeValue: "XYZ789",
    metaLastUpdated: "2024-02-18",
    metaProfile: "Patient Profile",
    metaVersionId: "1",
  };

  const renderComponent = (id = "123") => {
    /**
     * @vitest-environment jsdom
     */
    return render(
      <MemoryRouter initialEntries={[`/patient/${id}`]}>
        <Routes>
          <Route path="/patient/:id" element={<PatientProfile />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders loading state initially", () => {
    renderComponent();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("fetches and displays patient details", async () => {
    getPatient.mockResolvedValue(mockPatient);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
      expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    });
  });

  it("handles API error gracefully", async () => {
    getPatient.mockRejectedValue(new Error("API Error"));
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText(
          "An error occurred while fetching the patient details."
        )
      ).toBeInTheDocument();
    });
  });
});


//   it("allows switching between sections", async () => {
//     getPatient.mockResolvedValue(mockPatient);
//     renderComponent();

//     await waitFor(() => {
//       expect(screen.getByText("Patient Details")).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText("Identifiers"));
//     expect(screen.getByText("Identifier Code")).toBeInTheDocument();

//     fireEvent.click(screen.getByText("Emergency Contact"));
//     expect(screen.getByText("Jane Doe")).toBeInTheDocument();
//   });
// });
