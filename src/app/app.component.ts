import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AddActivityFacadeService } from "./components/add-activity/add-activity-facade.service";
import { AddEntryFacadeService } from "./components/add-entry/add-entry-facade.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "GoalsPlanner";
  constructor(
    public auth: AngularFireAuth,
    public addActivityFacadeService: AddActivityFacadeService,
    public addEntryFacadeService: AddEntryFacadeService
  ) {}
}
