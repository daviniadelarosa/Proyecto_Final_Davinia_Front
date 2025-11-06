import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBooks } from './crud-books';

describe('CrudBooks', () => {
  let component: CrudBooks;
  let fixture: ComponentFixture<CrudBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
