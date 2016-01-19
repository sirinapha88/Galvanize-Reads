var express = require("express");
var router = express.Router();
var knex = require('../db/knex');
var bookRoutes = require("./books");

router.use("/books", bookRoutes);

// Index
router.get('/',function(req,res){
	knex('authors').then(function(authors){
		console.log(authors);
		res.render('authors/index',{authors:authors});
	});
});

router.get('/displayAuthor/:author_id', function(req,res){
	var id = req.params.author_id;
	console.log(id);
	knex('authors').where({id:id}).first().then(function(author){
		console.log(author);
		res.render("authors/displayAuthor", {author:author});
	});
});

// New
router.get('/new',function(req,res){
	res.render("authors/new");
});
//Create
router.post('/new',function(req,res){
	knex('authors')
	.insert({"first_name":req.body.first_name, 
			"last_name":req.body.last_name, 
			"portrait_url":req.body.portrait_url, 
			"biography": req.body.biography})
	.then(function(){
		res.redirect('/authors');
	});
});

// Edit
router.get('/:id/edit',function(req,res){
	var id = req.params.id;
	console.log(id);
	knex('authors').where({id:id}).first().then(function(author){
		res.render("authors/edit", {author:author});
	});
});

// Update
router.put('/:id',function(req,res){
	var id = req.params.id;
	knex('authors').where({id:id}).first()
	.update({"first_name": req.body.first_name,
			"last_name": req.body.last_name,
			"portrait_url": req.body.portrait_url,
			"biography": req.body.biography })
	.then(function(){
		res.redirect('/authors/displayAuthor/' +id);
	});
});

// Delete

router.get('/:id/delete',function(req,res){
	var id = req.params.id;
	
	knex('authors').where({id:id}).first().then(function(author){
		console.log(author);
		res.render("authors/delete", {author:author});
	});
});

router.delete('/:id',function(req,res){
	var id = req.params.id;
	knex('authors').where({id:id}).del().then(function(){
		res.redirect('/authors');
	});
});

module.exports = router;

