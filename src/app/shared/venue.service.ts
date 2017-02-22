import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import * as moment from 'moment/moment';
import 'rxjs/add/operator/onErrorResumeNext';

export class Venue {
  constructor(public id: string, public name: string) { }
}

@Injectable()
export class VenueService {

  constructor(private http: Http) {}

  search(term: string): Observable<Venue[]> {
    const baseUrl = 'https://api.foursquare.com/v2/venues/explore?section=topPicks';
    const accessToken = 'POM2E2BGPADLQ5DKBVZUMCS1FPSMLZ4HTH4IBADH1ANGGK2Q';
    const date = moment().format('YYYYMMDD');
    const url = baseUrl + '&oauth_token=' + accessToken + '&v=' + date;
    return this.http
      .get(`${url}&near=${term}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.json().response !== null && res.json().response !== undefined) {
      const body = res.json().response.groups[0].items;
      return body.map(data => new Venue(data.venue.id, data.venue.name));
    }
  }

  private handleError (error: Response | any) {
    return Observable.of([]);
  }
}
