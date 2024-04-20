import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowcampVideoPopupComponent } from './wowcamp-video-popup.component';

describe('WowcampVideoPopupComponent', () => {
  let component: WowcampVideoPopupComponent;
  let fixture: ComponentFixture<WowcampVideoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowcampVideoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowcampVideoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
