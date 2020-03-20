import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityListFacadeService } from './activity-list/activity-list-facade.service';


@NgModule({
  declarations: [DashboardComponent, ActivityListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [ActivityListFacadeService]
})
export class DashboardModule { }
