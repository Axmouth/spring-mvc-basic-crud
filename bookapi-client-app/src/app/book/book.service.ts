import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Book } from './book';
import { map, catchError } from 'rxjs/operators';

const apiRoute = 'http://localhost:8083/bookapi_war/api';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${apiRoute}/book`).pipe(catchError(this.handleError));
  }

  getBookById(bookId): Observable<Book> {
    return this.http.get<Book>(`${apiRoute}/book/${bookId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error);
  }

  addBook(book: Book) {
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (book.id) {
      return this.http
        .put(`${apiRoute}/book/${book.id}`, book, { responseType: 'text' })
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post(`${apiRoute}/book`, book, { headers, responseType: 'text' })
        .pipe(catchError(this.handleError));
    }
  }

  deleteBook(bookId: string) {
    return this.http.delete(`${apiRoute}/book/${bookId}`, { responseType: 'text' }).pipe(catchError(this.handleError));
  }
}
