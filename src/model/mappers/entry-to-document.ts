import { Entry } from "../entities/entry";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { first, map } from "rxjs/operators";
import { User } from "firebase";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class EntryToDocument {
  constructor(private auth: AngularFireAuth) {}

  public Map(entry: Entry): Observable<any> {
    return this.auth.user.pipe(
      first(user => user != null),
      map((user: User) => ({
        ...entry,
        activity: `/users/${user.uid}/activities/${entry.activity.id}`
      }))
    );
  }
}
