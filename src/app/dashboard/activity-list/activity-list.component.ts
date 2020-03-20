import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Activity } from 'src/model/entities/activity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent implements OnChanges {
  @Input()
  public activities: Activity[];

  constructor() { }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      debugger;
  }
}
