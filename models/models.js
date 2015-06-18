var path = require('path');
//cargar modelo ORM
var Sequelize= require('sequelize');
//usar bbdd sqlite
var sequelize= new Sequelize(null,null,null,
			{
			dialect:"sqlite",storage:"quiz.sqlite"
			});
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));

export.Quiz=Quiz;//exportar definicion de tabla Quiz
//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function  () {
//success() ejecuta el manejador una vez creada la tabla
Quiz.count().success(
	function  (count) {
		if(count===0){
			Quiz.create({
				pregunta: 'capital de italia',
				respuesta: 'roma'
		})
		.success(function(){console.log('Base de datos inicializada')});
		};
		// body...
	});
	// body...
});

