import { Action } from "@ngrx/store";
import { Activity } from './../../entities/activity';

export enum ActivitiesActionTypes {
  LoadActivities = "[Activities] Load Activities",
  LoadActivitiesSuccess = "[Activities] Load Activities Success",
  LoadActivitiesFailure = "[Activities] Load Activities Failure"
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
  constructor(public payload: { error: Activity[] }) {}
}

export type ActivitiesAction = LoadActivitiesAction | LoadActivitiesSuccessAction | LoadActivitiesFailureAction;