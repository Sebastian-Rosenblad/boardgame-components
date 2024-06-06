import { DataItemM } from "./data-item.model";

export interface ProjectM {
  id: string;
  name: string;
  path: string;
  created: number;
  edited: number;
  data: Array<DataItemM>;
}
