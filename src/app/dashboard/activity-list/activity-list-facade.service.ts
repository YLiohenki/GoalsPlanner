import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStoreState } from '../../../model/store/state';
import { map, filter } from 'rxjs/operators';
import { Activity } from 'src/model/entities/activity';
import { EntityState } from 'src/model/shared/entity-wrapper';
import { ShowAddActivityAction } from 'src/model/store/ui/ui.actions';


@Injectable({
    providedIn: "root"
})
export class ActivityListFacadeService {
    public readonly activities$;
    constructor(private store: Store<IStoreState>) {
        this.activities$ = this.store.select(s => s.activities).pipe(filter(ew => ew.state === EntityState.Success), map(ew => ew.value));
    }

    public OnAddActivityClick(): void {
        this.store.dispatch(new ShowAddActivityAction());
    }
}
