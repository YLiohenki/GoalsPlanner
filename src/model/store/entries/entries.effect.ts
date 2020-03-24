import { Injectable } from "@angular/core";
import { ofType, Actions, Effect } from "@ngrx/effects";
import { EMPTY, from, forkJoin } from "rxjs";
import { map, mergeMap, catchError, switchMap, first } from "rxjs/operators";
import {
  AngularFirestore,
  DocumentData,
  QuerySnapshot,
  DocumentReference,
  DocumentSnapshot
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { flatMap, filter, take } from "rxjs/operators";
import { User } from "firebase";
import {
  EntriesAction,
  EntriesActionTypes,
  LoadEntriesSuccessAction,
  LoadEntriesAction,
  CreateNewEntryAction,
  CreateNewEntrySuccessAction
} from "./entries.actions";
import { QuerySnapshotToEntries } from "src/model/mappers/querysnapshot-to-entries";
import { DocumentSnapshotToEntry } from "src/model/mappers/documentsnapshot-to-entry";
import { Entry } from "./../../entities/entry";
import { EntryToDocument } from "src/model/mappers/entry-to-document";

@Injectable()
export class EntriesEffect {
  @Effect()
  public loadEntries$ = this.actions$.pipe(
    ofType<EntriesAction>(EntriesActionTypes.LoadEntries),
    switchMap((action: LoadEntriesAction) =>
      this.auth.user.pipe(
        first(user => user != null),
        mergeMap((user: User) =>
          this.afs
            .collection(`/users/${user.uid}/entries`, ref =>
              ref
                .where(
                  "date",
                  ">=",
                  action.payload.startDate
                )
                .where(
                  "date",
                  "<=",
                  action.payload.endDate
                )
            )
            .get()
            .pipe(
              switchMap((collection: QuerySnapshot<DocumentData>) =>
                this.querySnapshotToEntries.Map(collection).pipe(
                  map(
                    (entries: Entry[]) =>
                      new LoadEntriesSuccessAction({
                        entries: entries,
                        params: action.payload
                      })
                  )
                )
              ),
              catchError((error: any) => {
                console.error(error);
                return EMPTY;
              })
            )
        )
      )
    )
  );

  @Effect()
  public createNewEntry$ = this.actions$.pipe(
    ofType<EntriesAction>(EntriesActionTypes.CreateNewEntry),
    mergeMap((action: CreateNewEntryAction) =>
      forkJoin([
        this.auth.user.pipe(first(user => user != null)),
        this.entryToDocument.Map(action.payload.entry)
      ]).pipe(
        flatMap(([user, doc]: [User, any]) =>
          from(this.afs.collection(`/users/${user.uid}/entries`).add(doc))
        ),
        switchMap((ref: DocumentReference) => from(ref.get())),
        switchMap((doc: DocumentSnapshot<DocumentData>) =>
          this.documentSnapshotToEntry.Map(doc).pipe(
            map(
              (entry: Entry) =>
                new CreateNewEntrySuccessAction({
                  entry: entry
                })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private querySnapshotToEntries: QuerySnapshotToEntries,
    private documentSnapshotToEntry: DocumentSnapshotToEntry,
    private entryToDocument: EntryToDocument
  ) {}
}
