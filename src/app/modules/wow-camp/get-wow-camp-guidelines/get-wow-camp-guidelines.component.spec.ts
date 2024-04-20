import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWowCampGuidelinesComponent } from './get-wow-camp-guidelines.component';

describe('GetWowCampGuidelinesComponent', () => {
  let component: GetWowCampGuidelinesComponent;
  let fixture: ComponentFixture<GetWowCampGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWowCampGuidelinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetWowCampGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
