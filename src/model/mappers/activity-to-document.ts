import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Activity } from "../entities/activity";

@Injectable({
  providedIn: "root"
})
export class ActivityToDocument {
  constructor() {}

  public Map(activity: Activity): Observable<any> {
    var result: Activity = {
      ...activity
    };
    delete result.id;
    return of(result);
  }
}
