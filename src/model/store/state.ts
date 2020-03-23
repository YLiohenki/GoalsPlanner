import { EntityState, EntityWrapper } from "../shared/entity-wrapper";
import { Activity } from "../entities/activity";
import { IUIState, initialUIState } from "./ui/ui.state";
import { initialEntiresState, IEntriesState } from './entries/entires.state';

export interface IStoreState {
  activities: EntityWrapper<Activity[]>;
  ui: IUIState;
  entries: IEntriesState;
}

export const initialStoreState: IStoreState = {
  activities: { state: EntityState.Pristine, value: null },
  ui: initialUIState,
  entries: initialEntiresState
};
