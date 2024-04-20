import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampParticipaionWavierFormUpdatedComponent } from './camp-participaion-wavier-form-updated.component';

describe('CampParticipaionWavierFormUpdatedComponent', () => {
  let component: CampParticipaionWavierFormUpdatedComponent;
  let fixture: ComponentFixture<CampParticipaionWavierFormUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampParticipaionWavierFormUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampParticipaionWavierFormUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
