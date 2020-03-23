import { Activity } from "../entities/activity";
import { DocumentData, DocumentSnapshot } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DocumentSnapshotToActivy {
  public Map(doc: DocumentSnapshot<DocumentData>): Observable<Activity> {
    var docData = doc.data();
    return of(new Activity(doc.id, docData.name));
  }
}
