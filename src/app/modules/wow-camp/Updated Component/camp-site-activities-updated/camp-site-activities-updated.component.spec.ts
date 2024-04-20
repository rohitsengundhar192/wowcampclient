import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampSiteActivitiesUpdatedComponent } from './camp-site-activities-updated.component';

describe('CampSiteActivitiesUpdatedComponent', () => {
  let component: CampSiteActivitiesUpdatedComponent;
  let fixture: ComponentFixture<CampSiteActivitiesUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampSiteActivitiesUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampSiteActivitiesUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
