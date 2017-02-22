import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

declare var moment: any;

import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './not-found.component';

import { AppComponent } from './app.component';

import { VenueService } from './shared/venue.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [MaterialModule.forRoot()],
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    VenueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
