import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupvolunteerComponent } from './popupvolunteer.component';

describe('PopupvolunteerComponent', () => {
  let component: PopupvolunteerComponent;
  let fixture: ComponentFixture<PopupvolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupvolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupvolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
