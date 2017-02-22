import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

// Containers
import { HomeComponent } from './home.component';

// Component
import { VenueComponent } from './components/venue/venue.component';

// Routing
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  declarations: [
    // Containers
    HomeComponent,
    // Components
    VenueComponent
  ],
  providers: [
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {}