import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActivitiesActionTypes, ActivitiesAction, LoadActivitiesSuccessAction } from './activities.actions';
import { AngularFirestore, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { flatMap, filter, take } from 'rxjs/operators';
import { User } from 'firebase';
import { Activity } from 'src/model/entities/activity';
import { QuerySnapshotToActivites } from 'src/model/mappers/querysnapshot-to-activities';

@Injectable()
export class ActivitiesEffect {
  @Effect()
  activities$ = this.actions$.pipe(
    ofType<ActivitiesAction>(ActivitiesActionTypes.LoadActivities),
    flatMap(() => this.auth.user.pipe(filter(user => user != null), take(1))),
    mergeMap((user: User) => this.afs.collection<Activity>(`/users/${user.uid}/activities`).get()
      .pipe(
        map((doc: QuerySnapshot<DocumentData>) => {
          return new LoadActivitiesSuccessAction({ activities: QuerySnapshotToActivites.Map(doc) });
        }),
        catchError(() => EMPTY)
      ))
  );

  constructor(private actions$: Actions, private afs: AngularFirestore, public auth: AngularFireAuth) { }
}