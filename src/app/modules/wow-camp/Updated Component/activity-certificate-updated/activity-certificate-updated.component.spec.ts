import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCertificateUpdatedComponent } from './activity-certificate-updated.component';

describe('ActivityCertificateUpdatedComponent', () => {
  let component: ActivityCertificateUpdatedComponent;
  let fixture: ComponentFixture<ActivityCertificateUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCertificateUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCertificateUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
