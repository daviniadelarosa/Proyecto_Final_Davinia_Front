import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Book {
  id: number;
  title: string;
  isbn: string;
}

@Component({
  selector: 'app-book-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud-books.html'
})
export class CRUDBooksComponent implements OnInit {
  form: FormGroup;
  books: Book[] = [];
  editMode = false;
  editBookId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.email]],
      isbn: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<Book[]>('http://localhost:8080/api/books/all')
    .subscribe(data => {
      this.books = data;
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.editMode && this.editBookId !== null) {
        this.http.patch(`http://localhost:8080/api/books/${this.editBookId}`, this.form.value)
          .subscribe(() => {
            this.loadBooks();
            this.resetForm();
          });
      } else {
        this.http.post('http://localhost:8080/api/books/insert', this.form.value)
          .subscribe(() => {
            this.loadBooks();
            this.resetForm();
          });
      }
    }
  }

  editBook(book: Book) {
    this.editMode = true;
    this.editBookId = book.id;
    this.form.patchValue({
      title: book.title,
      isbn: book.isbn
    });
  }

  deleteBook(id: number) {
    this.http.delete(`http://localhost:8080/api/books/${id}`)
      .subscribe(() => {
        this.loadBooks();
      });
  }

  resetForm() {
    this.editMode = false;
    this.editBookId = null;
    this.form.reset();
  }
}