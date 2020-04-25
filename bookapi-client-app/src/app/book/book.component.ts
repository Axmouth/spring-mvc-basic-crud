import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  books: Book[];
  book = new Book();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe(
      (books) => {
        this.books = books;
        console.log(this.books);
      },
      (error) => console.log(error),
    );
  }

  addBook() {
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        console.log(response);
        this.reset();
        this.getBooks();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe(
      (response) => {
        console.log(response);
        this.getBooks();
      },
      (error) => console.log(error),
    );
  }

  getBookByid(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(
      (response) => {
        console.log(response);
        this.book = response;
        this.getBooks();
      },
      (error) => console.log(error),
    );
  }

  private reset() {
    this.book.id = null;
    this.book.title = null;
    this.book.author = null;
  }
}
