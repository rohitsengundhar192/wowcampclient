import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRescheduleComponent } from './popup-reschedule.component';

describe('PopupRescheduleComponent', () => {
  let component: PopupRescheduleComponent;
  let fixture: ComponentFixture<PopupRescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupRescheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupRescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
