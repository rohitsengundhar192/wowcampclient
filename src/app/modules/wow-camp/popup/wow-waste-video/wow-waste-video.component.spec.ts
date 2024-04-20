import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowWasteVideoComponent } from './wow-waste-video.component';

describe('WowWasteVideoComponent', () => {
  let component: WowWasteVideoComponent;
  let fixture: ComponentFixture<WowWasteVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowWasteVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowWasteVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
