export interface FHIRResource {
  resource: {
    id?: string;
    name?: Array<{
      prefix?: string;
      given?: string[];
      family?: string;
    }>;
    birthDate?: string;
    gender?: string;
    contact?: Array<{
      name?: {
        given?: string[];
        family?: string;
      };
      telecom?: { value: string }[];
    }>;
    identifier?: Array<{
      type?: {
        coding?: { code?: string; display?: string }[];
      };
      value?: string;
    }>;
    telecom?: Array<{ value?: string }>;
    meta?: {
      lastUpdated?: string;
      profile?: string[];
      versionId?: string;
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
