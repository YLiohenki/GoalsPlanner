import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { Entry } from "src/model/entities/entry";
import { Activity } from "src/model/entities/activity";
import { getWeekdayName, toUTCDateTimeStamp } from "src/model/helpers/date";

@Component({
  selector: "app-entries",
  templateUrl: "./entries.component.html",
  styleUrls: ["./entries.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent implements OnInit {
  @Input()
  public entries: Entry[];

  @Input()
  public activities: Activity[];

  @Output()
  public addActivityClick = new EventEmitter<void>();

  @Output()
  public  changeDatesInterval= new EventEmitter<Date[]>();

  public dates: Date[];
  public getWeekdayName: (date: Date) => string = getWeekdayName;
  public date: Date;
  private timeout: number;

  constructor() {}

  public ngOnInit(): void {
    this.date =  new Date(toUTCDateTimeStamp(new Date()));
    this.dates = [];
    var date = new Date(this.date);
    this.dates.push(date);
    date = new Date(this.date);
    date.setDate(date.getUTCDate() - 1);
    this.dates.push(date);
    date = new Date(this.date);
    date.setDate(date.getUTCDate() - 2);
    this.dates.push(date);
    date = new Date(this.date);
    date.setDate(date.getUTCDate() - 3);
    this.dates.push(date);
    date = new Date(this.date);
    date.setDate(date.getUTCDate() - 4);
    this.dates.push(date);
    this.changeDatesInterval.emit(this.dates);
  }

  public OnDateChange(newDate: string): void {
    this.date = new Date(newDate);
    this.timeout = null;
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.timeout = null;
      this.changeDatesInterval.emit(this.dates);
    }, 1000);
  }

  public OnInputFinish(): void {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.changeDatesInterval.emit(this.dates);
    }
  }

  public getEntry(activity: Activity, date: Date) {
    if (this.entries == null) return null;
    var timestamp = toUTCDateTimeStamp(date);
    return this.entries.find(
      e => e.activity.id == activity.id && e.timestamp == timestamp
    );
  }

  public OnAddEntry(): void {
    this.addActivityClick.emit();
  }
}
