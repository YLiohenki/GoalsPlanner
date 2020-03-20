import { Activity } from '../entities/activity';
import { DocumentData, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';

export class QuerySnapshotToActivites {
    public static Map(collection: QuerySnapshot<DocumentData>): Activity[] {
        return collection.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            var docData = doc.data();
            return new Activity(docData.name, doc.id);
        });
    }
}
