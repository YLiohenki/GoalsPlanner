import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { Activity } from 'src/model/entities/activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent {
  @Input()
  public activities: Activity[];

  @Output()
  public addActivityClick = new EventEmitter<void>();

  constructor() { }

  public OnAddActivity(): void {
    this.addActivityClick.emit();
  }
}
