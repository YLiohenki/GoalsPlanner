import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadActivitiesAction } from 'src/model/store/activities/activities.actions';
import { IStoreState } from '../../model/store/state';
import { ActivityListFacadeService } from './activity-list/activity-list-facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<IStoreState>, public activityListFacadeService: ActivityListFacadeService) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadActivitiesAction());
  }
}
