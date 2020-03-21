import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { AddActivityFacadeService } from './components/add-activity/add-activity-facade.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "GoalsPlanner";
  constructor(public auth: AngularFireAuth, public addActivityFacadeService: AddActivityFacadeService) {
  }
}
