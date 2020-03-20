import { EntityState, EntityWrapper } from '../shared/entity-wrapper';
import { Activity } from '../entities/activity';

export interface IStoreState {
    activities: EntityWrapper<Activity[]>;
}

export const initialStoreState: IStoreState = {
    activities: { state: EntityState.Pristine, value: null }
}