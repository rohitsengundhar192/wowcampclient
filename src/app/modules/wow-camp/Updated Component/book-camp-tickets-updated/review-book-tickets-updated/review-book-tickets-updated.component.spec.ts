import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBookTicketsUpdatedComponent } from './review-book-tickets-updated.component';

describe('ReviewBookTicketsUpdatedComponent', () => {
  let component: ReviewBookTicketsUpdatedComponent;
  let fixture: ComponentFixture<ReviewBookTicketsUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewBookTicketsUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBookTicketsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
