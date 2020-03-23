import { initialStoreState } from "../state";
import { EntityState, EntityWrapper } from "../../shared/entity-wrapper";
import { EntriesAction, EntriesActionTypes } from "./entries.actions";
import { getDateUTCTimestamp } from "src/model/helpers/date";
import { IEntriesState } from "./entires.state";
import { Entry } from "src/model/entities/entry";

export function entriesReducer(
  state = initialStoreState.entries,
  action: EntriesAction
): IEntriesState {
  switch (action.type) {
    case EntriesActionTypes.LoadEntries:
      return mutateState(state, action.payload.startDate, action.payload.endDate, null, EntityState.Loading);
    case EntriesActionTypes.LoadEntriesFailure:
      return mutateState(state, action.payload.params.startDate, action.payload.params.endDate, null, EntityState.Failed);
    case EntriesActionTypes.LoadEntriesSuccess:
      return mutateState(state, action.payload.params.startDate, action.payload.params.endDate, action.payload.entries, EntityState.Success);
    case EntriesActionTypes.CreateNewEntrySuccess:
      if (
        state.history[action.payload.entry.date].state == EntityState.Success
      ) {
        var result = {
          ...state,
          history: {
            ...state.history,
            [action.payload.entry.date]: <EntityWrapper<Entry[]>>{
              state: EntityState.Success,
              value: [
                ...state.history[action.payload.entry.date].value,
                action.payload.entry
              ]
            }
          }
        };
        return result;
      } else return state;
    default:
      return state;
  }
}

function mutateState(state: IEntriesState, startDate: Date, endDate: Date, entries: Entry[], entityState: EntityState): IEntriesState {
  var date = startDate;
  var result = { ...state, history: { ...state.history } };
  while (date <= endDate) {
    var timestamp = getDateUTCTimestamp(date);
    result.history[timestamp] = {
      state: entityState,
      value: entries.filter(e => e.date == timestamp)
    };
    date.setDate(date.getUTCDate() + 1);
  }
  return result;
}