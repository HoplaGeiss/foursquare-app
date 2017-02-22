import { Component, Input } from '@angular/core';
import { Venue } from '../../../shared/venue.service';

@Component({
  selector: 'fa-venue',
  template: `
    <md-card class="venue">{{venue.name}}</md-card>
  `,
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent {
  @Input() venue: Venue;
}
