import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStoreState } from '../../../model/store/state';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from 'src/model/entities/activity';
import { EntityWrapper, EntityState } from 'src/model/shared/entity-wrapper';


@Injectable({
    providedIn: "root"
})
export class ActivityListFacadeService {
    public readonly activities$;
    constructor(private store: Store<IStoreState>) { 
        this.activities$ = this.store.select(s => s.activities).pipe(filter(ew => ew.state === EntityState.Success), map(ew => ew.value));
    }
}