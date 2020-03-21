import { ActionReducerMap, Action } from '@ngrx/store';
import { IStoreState } from './state';
import { activitiesReducer } from './activities/activities.reducer';
import { uiReducer } from './ui/ui.reducer';

export const appReducers: ActionReducerMap<IStoreState, Action> = {
    activities: activitiesReducer,
    ui: uiReducer
  };