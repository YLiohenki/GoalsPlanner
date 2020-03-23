import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IStoreState } from "../../../model/store/state";
import { HideAddEntryAction } from "src/model/store/ui/ui.actions";
import { Entry } from "src/model/entities/entry";
import { CreateNewEntryAction } from "src/model/store/entries/entries.actions";
import { Observable } from 'rxjs';
import { Activity } from 'src/model/entities/activity';
import { filter, map } from 'rxjs/operators';
import { EntityState } from 'src/model/shared/entity-wrapper';

@Injectable({
  providedIn: "root"
})
export class AddEntryFacadeService {
  public readonly show$: Observable<boolean>;
  public readonly initialDate$: Observable<Date>;
  public readonly activities$: Observable<Activity[]>;
  
  constructor(private store: Store<IStoreState>) {
    this.show$ = this.store.select(s => s.ui.addEntryPopup.show);
    this.initialDate$ = this.store.select(s => s.ui.addEntryPopup.initialDate);
    this.activities$ = this.store.select(s => s.activities).pipe(filter(s => s.state == EntityState.Success), map(s => s.value));
  }

  public OnHideAddEntryClick(): void {
    this.store.dispatch(new HideAddEntryAction());
  }

  public OnCreateNewEntryClick(entry: Entry): void {
    this.store.dispatch(new HideAddEntryAction());
    this.store.dispatch(new CreateNewEntryAction({ entry: entry }));
  }
}
