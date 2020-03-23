import { Injectable, OnChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { IStoreState } from "../../../model/store/state";
import { map, filter } from "rxjs/operators";
import { EntityState, EntityWrapper } from "src/model/shared/entity-wrapper";
import { Observable } from "rxjs";
import { Entry } from "src/model/entities/entry";
import { getDateUTCTimestamp } from "src/model/helpers/date";
import { ShowAddEntryAction } from "src/model/store/ui/ui.actions";

@Injectable({
  providedIn: "root"
})
export class EntriesFacadeService {
  public entries$: Observable<EntityWrapper<Entry[]>>;

  private date: Date;

  constructor(private store: Store<IStoreState>) {}

  public OnDateChange(date: Date): void {
    this.date = date;
    this.entries$ = this.store
      .select(s => s.entries[getDateUTCTimestamp(date)])
      .pipe(
        filter(ew => ew.state === EntityState.Success),
        map(ew => ew.value)
      );
  }

  public OnAddEntryClick(): void {
    this.store.dispatch(new ShowAddEntryAction({ date: this.date }));
  }
}
