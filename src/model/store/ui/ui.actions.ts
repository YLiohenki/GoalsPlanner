import { Action } from "@ngrx/store";

export enum UIActionTypes {
  ShowAddActivity = "[UI] Show Add Activity Popup",
  HideAddActivity = "[UI] Hide Add Activity Popup",
  ShowAddEntry = "[UI] Show Add Entry Popup",
  HideAddEntry = "[UI] Hide Add Entry Popup"
}

export class ShowAddActivityAction implements Action {
  public readonly type: UIActionTypes.ShowAddActivity =
    UIActionTypes.ShowAddActivity;
  constructor() {}
}

export class HideAddActivityAction implements Action {
  public readonly type: UIActionTypes.HideAddActivity =
    UIActionTypes.HideAddActivity;
  constructor() {}
}

export class ShowAddEntryAction implements Action {
  public readonly type: UIActionTypes.ShowAddEntry = UIActionTypes.ShowAddEntry;
  constructor(public payload: { date: Date }) {}
}

export class HideAddEntryAction implements Action {
  public readonly type: UIActionTypes.HideAddEntry = UIActionTypes.HideAddEntry;
  constructor() {}
}

export type UIAction =
  | ShowAddActivityAction
  | HideAddActivityAction
  | ShowAddEntryAction
  | HideAddEntryAction;
