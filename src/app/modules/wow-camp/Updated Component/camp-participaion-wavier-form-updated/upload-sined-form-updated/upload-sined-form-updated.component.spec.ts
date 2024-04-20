import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSinedFormUpdatedComponent } from './upload-sined-form-updated.component';

describe('UploadSinedFormUpdatedComponent', () => {
  let component: UploadSinedFormUpdatedComponent;
  let fixture: ComponentFixture<UploadSinedFormUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSinedFormUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSinedFormUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
