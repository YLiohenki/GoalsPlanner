import { DocumentData, DocumentSnapshot } from "@angular/fire/firestore";
import { Entry } from "../entities/entry";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IStoreState } from "../store/state";
import { map, first } from "rxjs/operators";
import { Activity } from "../entities/activity";
import { EntityWrapper, EntityState } from "../shared/entity-wrapper";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DocumentSnapshotToEntry {
  constructor(private store: Store<IStoreState>) {}

  public Map(doc: DocumentSnapshot<DocumentData>): Observable<Entry> {
    var docData = doc.data();
    return this.store
      .select(s => s.activities)
      .pipe(
        first(ew => ew.state == EntityState.Success),
        map(
          (activities: EntityWrapper<Activity[]>) =>
            new Entry(
              doc.id,
              activities.value.find(
                a =>
                  a.id ==
                  docData.activity.id
              ),
              docData.date.seconds * 1000,
              docData.amount
            )
        )
      );
  }
}
