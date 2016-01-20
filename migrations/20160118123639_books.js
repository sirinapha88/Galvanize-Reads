exports.up = function(knex, Promise) {
 	return knex.schema.createTable('books', function(table){
 		table.increments();// id serial primary key
 		table.string('book_title');
 		table.string('book_genre');
 		table.text('book_desc');
 		table.string('book_cover');
 	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('books');  
};