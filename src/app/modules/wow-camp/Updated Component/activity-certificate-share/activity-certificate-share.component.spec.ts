import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCertificateShareComponent } from './activity-certificate-share.component';

describe('ActivityCertificateShareComponent', () => {
  let component: ActivityCertificateShareComponent;
  let fixture: ComponentFixture<ActivityCertificateShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCertificateShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCertificateShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
