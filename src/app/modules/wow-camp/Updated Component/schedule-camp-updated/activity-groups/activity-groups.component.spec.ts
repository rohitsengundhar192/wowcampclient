import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGroupsComponent } from './activity-groups.component';

describe('ActivityGroupsComponent', () => {
  let component: ActivityGroupsComponent;
  let fixture: ComponentFixture<ActivityGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
