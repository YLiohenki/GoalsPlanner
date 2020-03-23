import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import "firebase/firestore";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HeaderComponent } from "./components/header/header.component";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { ActivitiesEffect } from "src/model/store/activities/activities.effect";
import { appReducers } from "src/model/store/reducers";
import { AddActivityComponent } from "./components/add-activity/add-activity.component";
import { AddActivityFacadeService } from "./components/add-activity/add-activity-facade.service";
import { FormsModule } from "@angular/forms";
import { AddEntryComponent } from "./components/add-entry/add-entry.component";
import { EntriesEffect } from "src/model/store/entries/entries.effect";
import { QuerySnapshotToActivites } from "src/model/mappers/querysnapshot-to-activities";
import { QuerySnapshotToEntries } from "src/model/mappers/querysnapshot-to-entries";
import { DocumentSnapshotToEntry } from "src/model/mappers/documentsnapshot-to-entry";
import { DocumentSnapshotToActivy } from "src/model/mappers/documentsnapshot-to-activity";
import { EntryToDocument } from "src/model/mappers/entry-to-document";
import { AddEntryFacadeService } from './components/add-entry/add-entry-facade.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddActivityComponent,
    AddEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ActivitiesEffect, EntriesEffect]),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    AddActivityFacadeService,
    AddEntryFacadeService,
    QuerySnapshotToActivites,
    QuerySnapshotToEntries,
    DocumentSnapshotToEntry,
    DocumentSnapshotToActivy,
    EntryToDocument
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
