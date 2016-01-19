var express = require("express");
var router = express.Router();
var knex = require('../db/knex');
var locus = require("locus");

// Show All Books
router.get('/',function(req,res){

	knex.select('*').from('books')
	// .innerJoin("book_authors", "books.id", "book_authors.book_id")
	// .innerJoin("authors","book_authors.author_id", "authors.id")
	.then(function(books){
		console.log(books);
		res.render("books/index", { books : books});
	});
});

router.get('/displayBook/:book_id', function(req,res){
	var id = req.params.book_id;
	console.log(id);
	knex('books').where({id:id}).first().then(function(book){
		res.render("books/displayBook", {book:book});
	});

});

// New
router.get('/new',function(req,res){	
		res.render('books/new');
});
// Post
router.post('/new',function(req,res){
	knex('books')
	.insert({"book_title":req.body.title, 
			"book_genre":req.body.genre, 
			"book_cover":req.body.cover, 
			"book_desc": req.body.desc})
	.then(function(){
		res.redirect('/books');
	});
});
// Edit
router.get('/:id/edit',function(req,res){
	var id = req.params.id;
	var book_id = req.params.id;
	var myBooks = req.body;
	knex('books').where({id:id}).first().then(function(book){
		res.render("books/edit", {book_id:book_id,book:book});
	});
});
// Update
router.put('/:id',function(req,res){
	var id = req.params.id;
	
	knex('books').where({id:id}).first()
	.update({"book_title": req.body.title,
			"book_genre": req.body.genre,
			"book_desc": req.body.desc })
	.then(function(){		
			// console.log(book);
			res.redirect('/books/displayBook/' + id);
		
	});
});

// Delete

router.get('/:id/delete',function(req,res){
	var id = req.params.id;
	
	knex('books').where({id:id}).first().then(function(book){
		console.log(book);
		res.render("books/delete", {book:book});
	});
});

router.delete('/:id',function(req,res){
	var id = req.params.id;
	knex('books').where({id:id}).del().then(function(){
		res.redirect('/books');
	});
});


module.exports = router;
