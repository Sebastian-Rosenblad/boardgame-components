import { ComponentTypeE } from "../enums/component-types.enum";
import { CardM } from "./card.model";

export interface DataItemM {
  id: string;
  name: string;
  type: ComponentTypeE;
  list: Array<CardM>;
}
