import { Component } from '@angular/core';

@Component({
  selector: 'fa-root',
  styleUrls: ['./app.component.css'],
  template: `
    <header class="header">Technical Test</header>
    <div class="router-outlet-wrapper">
      <router-outlet></router-outlet>
    </div>
    <footer class="page-footer">Made by Gabriel Muller</footer>
  `
})
export class AppComponent {
}
