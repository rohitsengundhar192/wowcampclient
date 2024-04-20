import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCampTicketsUpdatedComponent } from './book-camp-tickets-updated.component';

describe('BookCampTicketsUpdatedComponent', () => {
  let component: BookCampTicketsUpdatedComponent;
  let fixture: ComponentFixture<BookCampTicketsUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCampTicketsUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCampTicketsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
