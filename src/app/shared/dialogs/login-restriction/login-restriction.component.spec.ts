import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRestrictionComponent } from './login-restriction.component';

describe('LoginRestrictionComponent', () => {
  let component: LoginRestrictionComponent;
  let fixture: ComponentFixture<LoginRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRestrictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
