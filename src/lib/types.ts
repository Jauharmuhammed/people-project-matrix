export enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  TO_BE_STARTED = "To Be Started",
}

export interface IProjectDetails {
  key: string;
  value: string;
  type: "boolean" | "select";
}

export enum MemberRole {
  QC_MANAGER = "QC MANAGER",
  ARCHITECTURE = "ARCHITECTURE",
  STRUCTURAL = "STRUCTURAL",
  CIVIL = "CIVIL",
  MECHANICAL = "MECHANICAL",
  ELECTRICAL = "ELECTRICAL",
  FIRE_PROTECTION = "Fire Protection",
  GEOTECHNICAL_ENGINEER = "Geotechnical Engineer",
  LAND_SURVEYOR = "Land Surveyor",
  CERTIFIED_INDUSTRIAL_HYGIENIST = "Certified Industrial Hygienist",
}

export interface IMembers {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: MemberRole;
}

export interface IProject {
  id: string;
  title: string;
  client: string;
  location: string;
  designCompletionDate: string;
  constructionCompletionDate: string;
  cost: number;
  status: ProjectStatus;
  projectDetails: IProjectDetails[];
  members: IMembers[];
}

export type FieldType =
  | "boolean"
  | "select"
  | "text"
  | "number"
  | "date"
  | "person";
