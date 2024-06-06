import { CardTypeE } from "../enums/card-types.enum";

export interface CardM {
  id: string;
  type: CardTypeE;
  path: string;
}
