import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import {} from 'jasmine';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: DebugElement;
  let header: HTMLElement;
  let footer: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render header', async(() => {
    header = fixture.debugElement.nativeElement.querySelector('header');
    expect(header.textContent).toContain('Technical Test');
  }));

  it('should render footer', () => {
    footer = fixture.debugElement.nativeElement.querySelector('footer');
    expect(footer.textContent).toContain('Made by Gabriel Muller');
  });
});
