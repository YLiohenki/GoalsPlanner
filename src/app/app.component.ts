import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "GoalsPlanner";
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore, public auth: AngularFireAuth) {
    this.items = firestore.collection("items").valueChanges();
  }
}
