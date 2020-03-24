import { Injectable } from "@angular/core";
import { ofType, Actions, Effect } from "@ngrx/effects";
import { EMPTY, from, forkJoin } from "rxjs";
import { map, mergeMap, catchError, switchMap, first } from "rxjs/operators";
import {
  ActivitiesActionTypes,
  ActivitiesAction,
  LoadActivitiesSuccessAction,
  CreateNewActivitiyAction,
  CreateNewActivitiySuccessAction
} from "./activities.actions";
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
import { QuerySnapshotToActivites } from "src/model/mappers/querysnapshot-to-activities";
import { DocumentSnapshotToActivy } from "src/model/mappers/documentsnapshot-to-activity";
import { Activity } from "src/model/entities/activity";
import { ActivityToDocument } from "src/model/mappers/activity-to-document";

@Injectable()
export class ActivitiesEffect {
  @Effect()
  public loadActivities$ = this.actions$.pipe(
    ofType<ActivitiesAction>(ActivitiesActionTypes.LoadActivities),
    switchMap(() => this.auth.user.pipe(first(user => user != null))),
    mergeMap((user: User) =>
      this.afs.collection(`/users/${user.uid}/activities`).get()
    ),
    switchMap((collection: QuerySnapshot<DocumentData>) =>
      this.querySnapshotToActivites.Map(collection)
    ),
    map(
      (activities: Activity[]) =>
        new LoadActivitiesSuccessAction({
          activities: activities
        })
    ),
    catchError((error: any) => {
      console.error(error);
      return EMPTY;
    })
  );

  @Effect()
  public createNewActivity$ = this.actions$.pipe(
    ofType<ActivitiesAction>(ActivitiesActionTypes.CreateNewActivitiy),
    mergeMap((action: CreateNewActivitiyAction) =>
      forkJoin([
        this.auth.user.pipe(first(user => user != null)),
        this.activityToDocument.Map(action.payload.activity)
      ]).pipe(
        flatMap(([user, doc]: [User, any]) =>
          from(this.afs.collection(`/users/${user.uid}/activities`).add(doc))
        )
      )
    ),
    switchMap((ref: DocumentReference) => from(ref.get())),
    switchMap((doc: DocumentSnapshot<DocumentData>) =>
      this.documentSnapshotToActivy.Map(doc)
    ),
    map(
      (activity: Activity) =>
        new CreateNewActivitiySuccessAction({
          activity: activity
        })
    ),
    catchError((error: any) => {
      console.error(error);
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private querySnapshotToActivites: QuerySnapshotToActivites,
    private documentSnapshotToActivy: DocumentSnapshotToActivy,
    private activityToDocument: ActivityToDocument
  ) {}
}
