import {Component, OnInit} from '@angular/core';
import { Venue, VenueService } from '../shared/venue.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'fa-home',
  template: `
    <div class="home">
      <form [formGroup]="form">
        <md-input-container class="form-group" >
          <input mdInput class="form-control" formControlName="location" placeholder="Choose a Location">
        </md-input-container>
      </form>

      <h2>Recommended venues close to this location:</h2>

      <div *ngFor="let venue of venues | async" class="venues-container">
        <fa-venue [venue]="venue"></fa-venue>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  venues: Observable<Venue[]>;
  form: any;

  constructor(
    private venueService: VenueService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      location: '',
    });

    this.venues = this.form.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.venueService.search(term.location))
      .catch(this.handleError);
  }

  private handleError (error) {
    return Observable.throw(error);
  }

}
