import { Action } from "@ngrx/store";
import { Activity } from "./../../entities/activity";

export enum ActivitiesActionTypes {
  LoadActivities = "[Activities] Load Activities",
  LoadActivitiesSuccess = "[Activities] Load Activities Success",
  LoadActivitiesFailure = "[Activities] Load Activities Failure",
  CreateNewActivitiy = "[Activities] Create New Activitiy",
  CreateNewActivitiySuccess = "[Activities] Create New Activitiy Success"
}

export class LoadActivitiesAction implements Action {
  public readonly type: ActivitiesActionTypes.LoadActivities =
    ActivitiesActionTypes.LoadActivities;
  constructor() {}
}

export class LoadActivitiesSuccessAction implements Action {
  public readonly type: ActivitiesActionTypes.LoadActivitiesSuccess =
    ActivitiesActionTypes.LoadActivitiesSuccess;
  constructor(public payload: { activities: Activity[] }) {}
}

export class LoadActivitiesFailureAction implements Action {
  public readonly type: ActivitiesActionTypes.LoadActivitiesFailure =
    ActivitiesActionTypes.LoadActivitiesFailure;
  constructor(public payload: { error: any }) {}
}

export class CreateNewActivitiyAction implements Action {
  public readonly type: ActivitiesActionTypes.CreateNewActivitiy =
    ActivitiesActionTypes.CreateNewActivitiy;
  constructor(public payload: { activity: Activity }) {}
}

export class CreateNewActivitiySuccessAction implements Action {
  public readonly type: ActivitiesActionTypes.CreateNewActivitiySuccess =
    ActivitiesActionTypes.CreateNewActivitiySuccess;
  constructor(public payload: { activity: Activity }) {}
}

export type ActivitiesAction =
  | LoadActivitiesAction
  | LoadActivitiesSuccessAction
  | LoadActivitiesFailureAction
  | CreateNewActivitiyAction
  | CreateNewActivitiySuccessAction;
