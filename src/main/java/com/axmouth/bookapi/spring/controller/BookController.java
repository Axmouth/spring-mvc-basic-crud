package com.axmouth.bookapi.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.axmouth.bookapi.spring.model.Book;
import com.axmouth.bookapi.spring.service.BookService;

@CrossOrigin("*")
@RestController
public class BookController {
	@Autowired
	private BookService bookService;
	
	// Get all the books
	@GetMapping("/api/book")
	public ResponseEntity<List<Book>> list() {
		List<Book>  list = bookService.list();
		return ResponseEntity.ok().body(list);
	}
	
	// Save the book
	@PostMapping("/api/book")
	public ResponseEntity<?> save(@RequestBody Book book) {
		long id = bookService.save(book);
		return ResponseEntity.ok().body("Book created with id:"+id);
	}
	
	// Get one book
	@GetMapping("/api/book/{id}")
	public ResponseEntity<?> get(@PathVariable("id") long id) {
		Book book = bookService.get(id);
		
		return ResponseEntity.ok().body(book);
	}
	
	// Updater a book
	@PutMapping("/api/book/{id}")
	public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody Book book) {
		bookService.update(id, book);
		
		return ResponseEntity.ok().body("The book has been updated");
	}
	
	// Delete a book
	@DeleteMapping("/api/book/{id}")
	public ResponseEntity<?> delete(@PathVariable long id) {
		bookService.delete(id);
		
		return ResponseEntity.ok().body("The book has been deleted");
	}

}
