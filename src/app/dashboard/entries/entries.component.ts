import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges
} from "@angular/core";
import { Entry } from "src/model/entities/entry";

@Component({
  selector: "app-entries",
  templateUrl: "./entries.component.html",
  styleUrls: ["./entries.component.scss"]
})
export class EntriesComponent implements OnInit {
  @Input()
  public entries: Entry[];

  @Output()
  public addActivityClick = new EventEmitter<void>();

  @Output()
  public changeDate = new EventEmitter<Date>();

  public date: Date;
  private timeout: number;

  constructor() {}

  public ngOnInit(): void {
    this.date = new Date();
    this.changeDate.emit(this.date);
  }

  public OnDateChange(newDate: string): void {
    this.date = new Date(newDate);
    this.timeout = null;
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.changeDate.emit(this.date);
    }, 1000);
  }

  public OnInputFinish(): void {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.changeDate.emit(this.date);
    }
  }

  public OnAddEntry(): void {
    this.addActivityClick.emit();
  }
}
