import { Entry } from "../entities/entry";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { first, map } from "rxjs/operators";
import { User } from "firebase";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class EntryToDocument {
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {}

  public Map(entry: Entry): Observable<any> {
    return this.auth.user.pipe(
      first(user => user != null),
      map((user: User) => {
        var result = {
          ...entry,
          activity: this.afs.doc(
            `/users/${user.uid}/activities/${entry.activity.id}`
          ).ref
        };
        delete result.id;
        return result;
      })
    );
  }
}
