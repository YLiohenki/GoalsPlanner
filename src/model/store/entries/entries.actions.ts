import { Action } from "@ngrx/store";
import { Entry } from "src/model/entities/entry";

export enum EntriesActionTypes {
  LoadEntries = "[Entries] Load Entries",
  LoadEntriesSuccess = "[Entries] Load Entries Success",
  LoadEntriesFailure = "[Entries] Load Entries Failure",
  CreateNewEntry = "[Entries] Create New Entry",
  CreateNewEntrySuccess = "[Entries] Create New Entry Success"
}

export interface LoadTodayEntriesActionPayload {
  startDate: Date;
  endDate: Date;
}

export class LoadEntriesAction implements Action {
  public readonly type: EntriesActionTypes.LoadEntries =
    EntriesActionTypes.LoadEntries;
  constructor(public payload: LoadTodayEntriesActionPayload) {}
}

export class LoadEntriesSuccessAction implements Action {
  public readonly type: EntriesActionTypes.LoadEntriesSuccess =
    EntriesActionTypes.LoadEntriesSuccess;
  constructor(
    public payload: { entries: Entry[]; params: LoadTodayEntriesActionPayload }
  ) {}
}

export class LoadEntriesFailureAction implements Action {
  public readonly type: EntriesActionTypes.LoadEntriesFailure =
    EntriesActionTypes.LoadEntriesFailure;
  constructor(public payload: { error: any, params: LoadTodayEntriesActionPayload }) {}
}

export class CreateNewEntryAction implements Action {
  public readonly type: EntriesActionTypes.CreateNewEntry =
    EntriesActionTypes.CreateNewEntry;
  constructor(public payload: { entry: Entry }) {}
}

export class CreateNewEntrySuccessAction implements Action {
  public readonly type: EntriesActionTypes.CreateNewEntrySuccess =
    EntriesActionTypes.CreateNewEntrySuccess;
  constructor(public payload: { entry: Entry }) {}
}

export type EntriesAction =
  | LoadEntriesAction
  | LoadEntriesSuccessAction
  | LoadEntriesFailureAction
  | CreateNewEntryAction
  | CreateNewEntrySuccessAction;
