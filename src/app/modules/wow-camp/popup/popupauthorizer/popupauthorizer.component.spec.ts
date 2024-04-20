import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupauthorizerComponent } from './popupauthorizer.component';

describe('PopupauthorizerComponent', () => {
  let component: PopupauthorizerComponent;
  let fixture: ComponentFixture<PopupauthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupauthorizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupauthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
