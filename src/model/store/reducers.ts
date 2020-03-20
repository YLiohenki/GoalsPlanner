import { ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<IStoreState, Action> = {
    houses: housesReducer,
    characters: charactersReducer
  };