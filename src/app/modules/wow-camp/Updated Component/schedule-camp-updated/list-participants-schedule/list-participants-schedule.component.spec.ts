import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticipantsScheduleComponent } from './list-participants-schedule.component';

describe('ListParticipantsScheduleComponent', () => {
  let component: ListParticipantsScheduleComponent;
  let fixture: ComponentFixture<ListParticipantsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParticipantsScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListParticipantsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
