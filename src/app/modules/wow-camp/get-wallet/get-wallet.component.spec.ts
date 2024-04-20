import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWalletComponent } from './get-wallet.component';

describe('GetWalletComponent', () => {
  let component: GetWalletComponent;
  let fixture: ComponentFixture<GetWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
