import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowCampScreenComponent } from './wow-camp-screen.component';

describe('WowCampScreenComponent', () => {
  let component: WowCampScreenComponent;
  let fixture: ComponentFixture<WowCampScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowCampScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowCampScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
