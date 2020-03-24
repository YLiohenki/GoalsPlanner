import { initialStoreState } from "../state";
import { EntityState, EntityWrapper } from "../../shared/entity-wrapper";
import { EntriesAction, EntriesActionTypes } from "./entries.actions";
import { toUTCDateTimeStamp } from "src/model/helpers/date";
import { IEntriesState } from "./entires.state";
import { Entry } from "src/model/entities/entry";

export function entriesReducer(
  state = initialStoreState.entries,
  action: EntriesAction
): IEntriesState {
  switch (action.type) {
    case EntriesActionTypes.LoadEntries:
      return mutateState(
        state,
        action.payload.startDate,
        action.payload.endDate,
        null,
        EntityState.Loading
      );
    case EntriesActionTypes.LoadEntriesFailure:
      return mutateState(
        state,
        action.payload.params.startDate,
        action.payload.params.endDate,
        null,
        EntityState.Failed
      );
    case EntriesActionTypes.LoadEntriesSuccess:
      return mutateState(
        state,
        action.payload.params.startDate,
        action.payload.params.endDate,
        action.payload.entries,
        EntityState.Success
      );
    case EntriesActionTypes.CreateNewEntrySuccess:
      if (
        state.history[action.payload.entry.timestamp] != null &&
        state.history[action.payload.entry.timestamp].state ==
          EntityState.Success
      ) {
        var result = {
          ...state,
          history: {
            ...state.history,
            [action.payload.entry.timestamp]: <EntityWrapper<Entry[]>>{
              state: EntityState.Success,
              value: [
                ...state.history[action.payload.entry.timestamp].value,
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

function mutateState(
  state: IEntriesState,
  startDate: Date,
  endDate: Date,
  entries: Entry[],
  entityState: EntityState
): IEntriesState {
  var date = new Date(startDate);
  var result = { ...state, history: { ...state.history } };
  var mutated = false;
  while (date <= endDate) {
    var timestamp = toUTCDateTimeStamp(date);
    var newValue =
      entries != null ? entries.filter(e => e.timestamp == timestamp) : entries;
    var newSuccessValue = entityState == EntityState.Success;
    var mutateOldValue =
      result.history[timestamp] != null &&
      (result.history[timestamp].state !== entityState ||
        result.history[timestamp].value != newValue);
    if (newSuccessValue || mutateOldValue) {
      result.history[timestamp] = {
        state: entityState,
        value: newValue
      };
      mutated = true;
    }
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return mutated ? result : state;
}
