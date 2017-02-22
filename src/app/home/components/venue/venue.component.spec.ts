/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenueComponent } from './venue.component';
import { DebugElement } from '@angular/core';
import { Venue } from '../../../shared/venue.service';
import { MaterialModule } from '@angular/material';
import { By }              from '@angular/platform-browser';


describe('AppComponent', () => {
  let fixture: ComponentFixture<VenueComponent>;
  let venueEl: DebugElement;
  let expectedVenue: Venue;
  let heroComp: VenueComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VenueComponent,
      ],
      imports: [
        MaterialModule
      ]
    });

    fixture = TestBed.createComponent(VenueComponent);
    heroComp = fixture.componentInstance;
    venueEl = fixture.debugElement.query(By.css('.venue'));

    // Supply a venue
    expectedVenue = new Venue('1', 'Strasbourg');
    heroComp.venue = expectedVenue;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should render header', () => {
    expect(venueEl.nativeElement.textContent).toContain('Strasbourg');
  });
});
