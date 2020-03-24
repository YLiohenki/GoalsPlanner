import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Activity } from "src/model/entities/activity";

@Component({
  selector: "app-add-activity",
  templateUrl: "./add-activity.component.html",
  styleUrls: ["./add-activity.component.scss"]
})
export class AddActivityComponent {
  @Output()
  public closeClick = new EventEmitter<void>();

  @Output()
  public createClick = new EventEmitter<Activity>();

  @Input()
  public show;

  public name: string;

  constructor() {}

  public OnCloseModal(): void {
    this.closeClick.emit();
  }

  public OnCreateClick(): void {
    this.createClick.emit(new Activity(null, this.name));
  }
}
