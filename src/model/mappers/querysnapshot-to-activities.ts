import { Activity } from "../entities/activity";
import {
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from "@angular/fire/firestore";
import { DocumentSnapshotToActivites } from './documentsnapshot-to-activities';

export class QuerySnapshotToActivites {
  public static Map(collection: QuerySnapshot<DocumentData>): Activity[] {
    return collection.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => DocumentSnapshotToActivites.Map(<DocumentSnapshot<DocumentData>>doc));
  }
}
