import { IProjectDetails } from "./types";

export enum FieldType {
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
  NUMBER = "NUMBER",
  STRING = "STRING",
}

export const PROJECT_DETAILS_ITEMS: IProjectDetails[] = [
  { key: "new_construction", value: false, type: FieldType.BOOLEAN },
  { key: "renovation", value: false, type: FieldType.BOOLEAN },
  { key: "commissioning", value: false, type: FieldType.BOOLEAN },
  { key: "vertical_construction", value: false, type: FieldType.BOOLEAN },
  { key: "horizontal_construction", value: false, type: FieldType.BOOLEAN },
];
