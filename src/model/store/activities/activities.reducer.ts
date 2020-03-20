import { ActivitiesActionTypes } from './activities.actions';
import { initialStoreState } from '../state';

export function ActivitiesReducer(
    state = initialStoreState.activities,
    action: ActivitiesActionTypes
  ):  {
    switch (action.type) {
      case HouseActionTypes.FetchHouses:
        return {
          state: EntityState.Loading,
          value: state.value
        };
      case HouseActionTypes.FetchHousesFailure:
        return {
          state: EntityState.Failed,
          value: null
        };
      case HouseActionTypes.FetchHousesSuccess:
        return {
          state: EntityState.Success,
          value: action.payload.houses
        };
      default:
        return state;
    }
  };
  