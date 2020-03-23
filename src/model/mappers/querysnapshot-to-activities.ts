import { Activity } from "../entities/activity";
import {
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from "@angular/fire/firestore";
import { DocumentSnapshotToActivy } from "./documentsnapshot-to-activity";
import { Observable, forkJoin } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class QuerySnapshotToActivites {
  constructor(private documentSnapshotToActivy: DocumentSnapshotToActivy) {}
  public Map(collection: QuerySnapshot<DocumentData>): Observable<Activity[]> {
    return forkJoin(
      collection.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
        this.documentSnapshotToActivy.Map(<DocumentSnapshot<DocumentData>>doc)
      )
    );
  }
}
