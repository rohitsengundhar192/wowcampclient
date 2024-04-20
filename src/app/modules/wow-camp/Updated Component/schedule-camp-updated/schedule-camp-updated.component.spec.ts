import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCampUpdatedComponent } from './schedule-camp-updated.component';

describe('ScheduleCampUpdatedComponent', () => {
  let component: ScheduleCampUpdatedComponent;
  let fixture: ComponentFixture<ScheduleCampUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCampUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCampUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
