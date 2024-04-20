import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEntryTicketsUpdatedComponent } from './book-entry-tickets-updated.component';

describe('BookEntryTicketsUpdatedComponent', () => {
  let component: BookEntryTicketsUpdatedComponent;
  let fixture: ComponentFixture<BookEntryTicketsUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookEntryTicketsUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEntryTicketsUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
