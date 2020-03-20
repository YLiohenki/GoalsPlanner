import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import 'firebase/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ActivitiesEffect } from 'src/model/store/activities/activities.effect';
import { appReducers } from 'src/model/store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ActivitiesEffect]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
