import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActivityUpdatedComponent } from './delete-activity-updated.component';

describe('DeleteActivityUpdatedComponent', () => {
  let component: DeleteActivityUpdatedComponent;
  let fixture: ComponentFixture<DeleteActivityUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActivityUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteActivityUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
