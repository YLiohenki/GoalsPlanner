import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityListFacadeService } from './activity-list/activity-list-facade.service';
import { EntriesComponent } from './entries/entries.component';
import { FormsModule } from '@angular/forms';
import { EntriesFacadeService } from './entries/entries-facade.service';

@NgModule({
  declarations: [DashboardComponent, ActivityListComponent, EntriesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ],
  providers: [ActivityListFacadeService, EntriesFacadeService]
})
export class DashboardModule { }
