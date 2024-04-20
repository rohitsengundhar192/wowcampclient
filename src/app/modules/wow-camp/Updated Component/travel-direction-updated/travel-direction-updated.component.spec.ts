import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDirectionUpdatedComponent } from './travel-direction-updated.component';

describe('TravelDirectionUpdatedComponent', () => {
  let component: TravelDirectionUpdatedComponent;
  let fixture: ComponentFixture<TravelDirectionUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelDirectionUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelDirectionUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
