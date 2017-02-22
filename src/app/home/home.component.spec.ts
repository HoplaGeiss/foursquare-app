import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {} from 'jasmine';
import { By } from '@angular/platform-browser';
import { Venue, VenueService } from '../shared/venue.service';
import { Router } from '@angular/router';
import 'hammerjs';
import { HomeModule } from './home.module';

fdescribe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let comp;
  let page;
  let venueService;
  let hdsSpy: jasmine.Spy;

  class RouterStub {
    navigateByUrl(url: string) { return url; }
  }

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeModule
      ],
      providers: [
        VenueService,
        // { provide: Router, useClass: RouterStub},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    createComponent();
    hdsSpy = fixture.debugElement.injector.get(VenueService);
  }));


  function createComponent() {
    fixture = TestBed.createComponent(HomeComponent);
    venueService = fixture.debugElement.injector.get(VenueService);
    comp    = fixture.componentInstance;
    page    = new Page();

    // 1st change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched hero
      fixture.detectChanges();
      page.addPageElements();
    });
  }

  ////

  it('should show venues after search', fakeAsync(() => {
    fixture.detectChanges();
    page.locationInput.value = 'Strasbourg';
    tick();
    fixture.detectChanges();
    expect(page.spy.calls.count()).toBe(1, 'search not called');
    // expect(hdsSpy.search.calls.count()).toBe(0, 'search not called');
    // expect(venuesContainer.nativeElement).toBe(testQuote);
  }));


  class Page {
    spy:      jasmine.Spy;

    venueContainer:  HTMLElement;
    locationInput:    HTMLInputElement;

    venues = [
      new Venue('1', 'Cathedrale'),
      new Venue('2', 'Petite France')
    ];

    constructor() {
      // const router = TestBed.get(Router); // get router from root injector
      this.spy = spyOn(venueService, 'search').and.returnValue(Promise.resolve(this.venues));
    }

    /** Add page elements after hero arrives */
    addPageElements() {
      this.locationInput   = fixture.debugElement.query(By.css('input')).nativeElement;
      // if (comp.venues) {
      //   this.venueContainer = fixture.debugElement.query(By.css('.venues-container')).nativeElement;
      // }
    }
  }

  // xit('When the user inputs a location it displays a list of venues', () => {
  //   inputEl = fixture.debugElement.query(By.css('.home input'));
  //   venuesContainer = fixture.debugElement.query(By.css('.venues-container'));
  //
  //   expect(venuesContainer).toContain('Technical Test');
  // });
});
