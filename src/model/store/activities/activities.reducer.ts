import { ActivitiesActionTypes, ActivitiesAction } from "./activities.actions";
import { initialStoreState } from "../state";
import { Activity } from "src/model/entities/activity";
import { EntityWrapper, EntityState } from "../../shared/entity-wrapper";

export function activitiesReducer(
  state = initialStoreState.activities,
  action: ActivitiesAction
): EntityWrapper<Activity[]> {
  switch (action.type) {
    case ActivitiesActionTypes.LoadActivities:
      return {
        state: EntityState.Loading,
        value: state.value
      };
    case ActivitiesActionTypes.LoadActivitiesFailure:
      return {
        state: EntityState.Failed,
        value: null
      };
    case ActivitiesActionTypes.LoadActivitiesSuccess:
      return {
        state: EntityState.Success,
        value: action.payload.activities
      };
    case ActivitiesActionTypes.CreateNewActivitiySuccess:
      if (state.state == EntityState.Success) {
        return {
          state: EntityState.Success,
          value: [...state.value, action.payload.activity]
        };
      } else return state;
    default:
      return state;
  }
}
