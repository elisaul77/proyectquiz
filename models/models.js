var path = require('path');
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize= require('sequelize');
//usar bbdd sqlite o postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));
var Comment=sequelize.import(path.join(__dirname,'comment'));

//indica que un comentario pertenece a un quiz
Comment.belongsTo(Quiz);
//indica que un quiz puede tener muchos comentarios
Quiz.hasMany(Comment);



exports.Quiz=Quiz;//exportar definicion de tabla Quiz
exports.Comment=Comment;//exporta tabla comentario


//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function  () {
//success() ejecuta el manejador una vez creada la tabla
Quiz.count().then(
	function  (count) {
		if(count===0){
			Quiz.create({
				pregunta: 'capital de italia',
				respuesta: 'roma',
				indice:'humanidades'
						});
			Quiz.create({
				pregunta: 'capital de Portugal',
				respuesta: 'lisboa',
				indice:'humanidades'
						})
		.then(function(){console.log('Base de datos inicializada')});
		};
		// body...
	});
	// body...
}
);

