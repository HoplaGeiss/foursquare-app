import {ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs/Observable';
import {Venue, VenueService} from './venue.service';
import {} from 'jasmine';

const VENUE_ONE = new Venue('venue1', 'Cathedrale');
const VENUE_TWO = new Venue('venue2', 'Petite France');
const res = {
  response: {
    groups: [
      {
        items: [
          {
            venue: {
              id: 'venue1',
              name: 'Cathedrale'
            }
          },
          {
            venue: {
              id: 'venue2',
              name: 'Petite France'
            }
          }
        ]
      }
    ]
  }
};

describe('VenueService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      VenueService
    ]);
    this.venueService = this.injector.get(VenueService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('search() should query current service url', () => {
    this.venueService.search('Strasbourg');
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toContain('Strasbourg');
    expect(this.lastConnection.request.url).toContain('https://api.foursquare.com/v2/venues/explore?section=topPicks');
  });

  it('search() if the server returns an error', fakeAsync(() => {
     let result: String[];
     this.venueService.search('Strasbourg')
         .subscribe(
           venues => result = venues,
         );
     this.lastConnection.mockError(new Error('some error'));
     tick();
     expect(result).toEqual([]);
   }));

  it('search() should return some venues', fakeAsync(() => {
    let result: any;
    this.venueService.search('Strasbourg').subscribe(venues => result = venues);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(res),
    })));
    tick();
    expect(result.length).toEqual(2, 'should contain given amount of venues');
    expect(result[0]).toEqual(VENUE_ONE, ' VENUE_ONE should be the first venue');
    expect(result[1]).toEqual(VENUE_TWO, ' VENUE_TWO should be the second venue');
  }));

});
