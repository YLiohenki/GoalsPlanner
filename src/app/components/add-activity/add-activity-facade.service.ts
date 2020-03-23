import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IStoreState } from "../../../model/store/state";
import { HideAddActivityAction } from "src/model/store/ui/ui.actions";
import { CreateNewActivitiyAction } from "src/model/store/activities/activities.actions";
import { Activity } from "src/model/entities/activity";

@Injectable({
  providedIn: "root"
})
export class AddActivityFacadeService {
  public readonly show$;
  constructor(private store: Store<IStoreState>) {
    this.show$ = this.store.select(s => s.ui.showAddActivity);
  }

  public OnHideAddActivityClick(): void {
    this.store.dispatch(new HideAddActivityAction());
  }

  public OnCreateNewActivityClick(activity: Activity): void {
    this.store.dispatch(new HideAddActivityAction());
    this.store.dispatch(new CreateNewActivitiyAction({ activity: activity }));
  }
}
