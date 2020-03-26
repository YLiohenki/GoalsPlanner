import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IStoreState } from "../../../model/store/state";
import { map, filter, take } from "rxjs/operators";
import { EntityState } from "src/model/shared/entity-wrapper";
import { Observable } from "rxjs";
import { Entry } from "src/model/entities/entry";
import { toUTCDateTimeStamp } from "src/model/helpers/date";
import { ShowAddEntryAction } from "src/model/store/ui/ui.actions";
import { LoadEntriesAction } from "src/model/store/entries/entries.actions";
import { Activity } from "src/model/entities/activity";

@Injectable({
  providedIn: "root"
})
export class EntriesFacadeService {
  public entries$: Observable<Entry[]>;
  public activities$: Observable<Activity[]>;

  private timestamp: number;

  constructor(private store: Store<IStoreState>) {}

  public OnDateChange(date: Date): void {
    this.timestamp = toUTCDateTimeStamp(date);
    var endDate = this.timestamp;
    this.entries$ = this.store
      .select(s => s.entries.history[this.timestamp])
      .pipe(
        filter(ew => ew != null && ew.state === EntityState.Success),
        map(ew => ew.value)
      );
    this.activities$ = this.store
      .select(s => s.activities)
      .pipe(
        filter(ew => ew != null && ew.state === EntityState.Success),
        map(ew => ew.value)
      );
    this.store
      .select(s => s.entries[this.timestamp])
      .pipe(take(1))
      .subscribe(ew => {
        if (
          ew == null ||
          ew.state === EntityState.Pristine ||
          ew.state === EntityState.Failed
        ) {
          this.store.dispatch(
            new LoadEntriesAction({
              startDate: new Date(this.timestamp),
              endDate: new Date(endDate)
            })
          );
        }
      });
  }

  public OnAddEntryClick(): void {
    this.store.dispatch(
      new ShowAddEntryAction({ date: new Date(this.timestamp) })
    );
  }
}
