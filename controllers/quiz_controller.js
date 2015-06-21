var models =require('../models/models.js');

exports.load=function (req,res,next,quizId) {
	models.Quiz.findById(quizId).then(
	function (quiz) {
		if (quiz) {
			req.quiz=quiz;
			next();
		}else{next( new Error('No existe quizId='+quizId));}
	}	
	).catch(function (error) {next(error);	});
};

//GET /quizes
exports.index=function (req, res) {
	
	if (req.query.search) {
		var xer = (req.query.search)
	xer=xer.replace(" ","%");
	xer='%'+xer+'%';		
		models.Quiz.findAll({where: ["pregunta like ?", xer], order: 'pregunta ASC'}).then(function (quizes) {
		res.render('quizes/index.ejs',{quizes:quizes , cabeza:"estas buscando", errors:[]});
	}).catch(function (error) {next(error);});
		
	}else{
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index.ejs',{quizes:quizes , cabeza:"NO estas buscando", errors:[]});
	}).catch(function (error) {next(error);});
	}
};

exports.show=function  (req, res) {
res.render('quizes/show',{quiz: req.quiz, errors:[]});
};

exports.answer=function  (req, res) {
	
var resultado='incorrecto';
if(req.query.respuesta===req.quiz.respuesta){
resultado='Correcto';
} 
res.render('quizes/answer',{quiz:req.quiz.id,respuesta: resultado, errors:[]});

};

exports.new= function (req, res) {
	var quiz =models.Quiz.build( //crea objeto quiz
		{pregunta :"Pregunta", respuesta: "Respuesta"		}
		);
	res.render('quizes/new',{quiz: quiz, errors:[]});
};

exports.create= function (req, res) {
	var quiz =models.Quiz.build( req.body.quiz);
	quiz
	.validate()
	.then(
		function (err) {
			if(err){
				res.render('quizes/new',{quiz: quiz, errors:err.errors});
				
			}else{
			
				
				//guarda en DB los campos pregunta y respuesta de quiz
				quiz
				.save({fields: ["pregunta","respuesta"]})
				.then(function () {res.redirect('/quizes');});
				
			}
		}
	);
	
	
};

exports.edit= function (req, res) {
	var quiz= req.quiz;
	res.render('quizes/edit',{quiz: quiz, errors:[]});
	
};


exports.update= function (req, res) {
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz
	.validate()
	.then(
		function (err) {
			if(err){
				res.render('quizes/edit',{quiz: req.quiz, errors:err.errors});
				
			}else{
			
				
				//guarda en DB los campos pregunta y respuesta de quiz
				req.quiz
				.save({fields: ["pregunta","respuesta"]})
				.then(function () {res.redirect('/quizes');});
				
			}
		}
		
		
	);
};
