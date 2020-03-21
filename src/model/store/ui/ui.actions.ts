import { Action } from "@ngrx/store";

export enum UIActionTypes {
  ShowAddActivity = "[UI] Show Add Activity Popup",
  HideAddActivity = "[UI] Hide Add Activity Popup"
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

export type UIAction = ShowAddActivityAction | HideAddActivityAction;
