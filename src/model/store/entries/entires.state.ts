import { Entry } from "src/model/entities/entry";
import { EntityWrapper } from "src/model/shared/entity-wrapper";

export interface IEntriesState {
  history: { [key: number]: EntityWrapper<Entry[]> };
}

export const initialEntiresState: IEntriesState = {
  history: {}
};
