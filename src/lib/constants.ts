import { IProjectDetails, IProjectRole, MemberRole } from "./types";

export enum FieldType {
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  NUMBER = "NUMBER",
  TEXT = "TEXT",
  ROLE = "ROLE",
}

export const PROJECT_DETAILS_ITEMS: IProjectDetails[] = [
  { key: "new_construction", value: false, type: FieldType.BOOLEAN },
  { key: "renovation", value: false, type: FieldType.BOOLEAN },
  { key: "commissioning", value: false, type: FieldType.BOOLEAN },
  { key: "vertical_construction", value: false, type: FieldType.BOOLEAN },
  { key: "horizontal_construction", value: false, type: FieldType.BOOLEAN },
];

export const PROJECT_ROLE_ITEMS: IProjectRole[] = [
  { key: MemberRole.QC_MANAGER, value: false, type: FieldType.ROLE },
  { key: MemberRole.ARCHITECTURE, value: false, type: FieldType.ROLE },
  { key: MemberRole.STRUCTURAL, value: false, type: FieldType.ROLE },
  { key: MemberRole.CIVIL, value: false, type: FieldType.ROLE },
  { key: MemberRole.MECHANICAL, value: false, type: FieldType.ROLE },
  { key: MemberRole.ELECTRICAL, value: false, type: FieldType.ROLE },
  { key: MemberRole.FIRE_PROTECTION, value: false, type: FieldType.ROLE },
];
