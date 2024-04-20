import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadUnsignedFormUpdatedComponent } from './download-unsigned-form-updated.component';

describe('DownloadUnsignedFormUpdatedComponent', () => {
  let component: DownloadUnsignedFormUpdatedComponent;
  let fixture: ComponentFixture<DownloadUnsignedFormUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadUnsignedFormUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadUnsignedFormUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
