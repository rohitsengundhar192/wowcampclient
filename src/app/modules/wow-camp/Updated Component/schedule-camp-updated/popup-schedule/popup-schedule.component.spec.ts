import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupScheduleComponent } from './popup-schedule.component';

describe('PopupScheduleComponent', () => {
  let component: PopupScheduleComponent;
  let fixture: ComponentFixture<PopupScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
