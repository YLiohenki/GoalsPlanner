import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IStoreState } from "../../../model/store/state";
import { map, filter, take } from "rxjs/operators";
import { EntityState, EntityWrapper } from "src/model/shared/entity-wrapper";
import { Observable, combineLatest } from "rxjs";
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

  private dates: Date[];

  constructor(private store: Store<IStoreState>) {}

  public OnDatesIntervalChange(dates: Date[]): void {
    this.dates = dates;
    var endTimeStamp = toUTCDateTimeStamp(dates[0]);
    var startTimeStamp = toUTCDateTimeStamp(dates[dates.length - 1]);

    this.entries$ = combineLatest(
      dates.map(date =>
        this.store.select(s => s.entries.history[toUTCDateTimeStamp(date)])
      )
    ).pipe(
      filter((ewls: EntityWrapper<Entry[]>[]) =>
        ewls.every(ew => ew != null && ew.state === EntityState.Success)
      ),
      map(ewls =>
        ewls.map(ew => ew.value).reduce((es1, es2) => es1.concat(es2))
      )
    );
    this.activities$ = this.store
      .select(s => s.activities)
      .pipe(
        filter(ew => ew != null && ew.state === EntityState.Success),
        map(ew => ew.value)
      );
    this.store
      .select(s => s.entries[startTimeStamp])
      .pipe(take(1))
      .subscribe(ew => {
        if (
          ew == null ||
          ew.state === EntityState.Pristine ||
          ew.state === EntityState.Failed
        ) {
          this.store.dispatch(
            new LoadEntriesAction({
              startDate: new Date(startTimeStamp),
              endDate: new Date(endTimeStamp)
            })
          );
        }
      });
  }

  public OnAddEntryClick(): void {
    this.store.dispatch(
      new ShowAddEntryAction({
        date: new Date(toUTCDateTimeStamp(this.dates[this.dates.length - 1]))
      })
    );
  }
}
