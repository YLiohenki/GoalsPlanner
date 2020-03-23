import {
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from "@angular/fire/firestore";
import { Entry } from "../entities/entry";
import { DocumentSnapshotToEntry } from "./documentsnapshot-to-entry";
import { forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class QuerySnapshotToEntries {
  constructor(private documentSnapshotToEntry: DocumentSnapshotToEntry) {}
  public Map(collection: QuerySnapshot<DocumentData>): Observable<Entry[]> {
    return forkJoin(
        collection.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
          this.documentSnapshotToEntry.Map(<DocumentSnapshot<DocumentData>>doc)
        )
      );
  }
}
