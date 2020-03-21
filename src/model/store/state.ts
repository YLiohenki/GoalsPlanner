import { EntityState, EntityWrapper } from "../shared/entity-wrapper";
import { Activity } from "../entities/activity";
import { IUIState, initialUIState } from "./ui/ui.state";

export interface IStoreState {
  activities: EntityWrapper<Activity[]>;
  ui: IUIState;
}

export const initialStoreState: IStoreState = {
  activities: { state: EntityState.Pristine, value: null },
  ui: initialUIState
};
