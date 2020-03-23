import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Activity } from 'src/model/entities/activity';
import { Entry } from 'src/model/entities/entry';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnChanges {
  @Output()
  public closeClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public createClick: EventEmitter<Entry> = new EventEmitter<Entry>();

  @Input()
  public activities: Activity[];

  @Input()
  public show: boolean;

  @Input()
  public initialDate: Date;

  public name: string;
  public amount: number;
  public date: Date;
  public activity: Activity;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.show != null && changes.show.currentValue == true)
    {
      this.amount = 1;
      this.date = this.initialDate;
    }
  }

  public OnCloseModal(): void {
    this.closeClick.emit();
  }

  public OnCreateClick(): void {
    this.createClick.emit(null);
  }
}
