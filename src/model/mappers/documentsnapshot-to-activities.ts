import { Activity } from "../entities/activity";
import {
  DocumentData,
  DocumentSnapshot
} from "@angular/fire/firestore";

export class DocumentSnapshotToActivites {
  public static Map(doc: DocumentSnapshot<DocumentData>): Activity {
    var docData = doc.data();
    return new Activity(docData.name, doc.id);
  }
}
