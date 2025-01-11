import { FieldType } from "./constants";

export enum ProjectStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  TO_BE_STARTED = "TO_BE_STARTED",
  PLANNING = "PLANNING",
  ON_HOLD = "ON_HOLD",
}

export interface IProjectDetails {
  key: string;
  value: string | number | boolean | Date;
  type: FieldType;
}

export enum MemberRole {
  QC_MANAGER = "QC MANAGER",
  ARCHITECTURE = "ARCHITECTURE",
  STRUCTURAL = "STRUCTURAL",
  CIVIL = "CIVIL",
  MECHANICAL = "MECHANICAL",
  ELECTRICAL = "ELECTRICAL",
  FIRE_PROTECTION = "FIRE PROTECTION",
  GEOTECHNICAL_ENGINEER = "GEOTECHNICAL ENGINEER",
  LAND_SURVEYOR = "LAND SURVEYOR",
  CERTIFIED_INDUSTRIAL_HYGIENIST = "CERTIFIED INDUSTRIAL HYGIENIST",
}

export interface IMembers {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: MemberRole;
}

export interface IProjectRole {
  key: MemberRole;
  value: boolean;
  type: FieldType.ROLE;
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
