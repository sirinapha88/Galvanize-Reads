var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	methodOverride = require("method-override"),
	path = require('path'),
	authorRouter = require("./controllers/authors.js"),
	bookRouter = require("./controllers/books.js");

app.set('views', path.join(__dirname, 'views'));	
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/asset/'));

app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.get('/',function(req,res){
  res.render('index');
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server started on port 3000");
});