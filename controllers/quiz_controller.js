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
		models.Quiz.findAll({where: ["pregunta like ?", req.query.search], order: 'pregunta ASC'}).then(function (quizes) {
		res.render('quizes/index.ejs',{quizes:quizes , cabeza:"estas buscando"});
	}).catch(function (error) {next(error);});
		
	}else{
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index.ejs',{quizes:quizes , cabeza:"NO estas buscando"});
	}).catch(function (error) {next(error);});
	}
};

exports.show=function  (req, res) {
res.render('quizes/show',{quiz: req.quiz});
};

exports.answer=function  (req, res) {
	
var resultado='incorrecto';
if(req.query.respuesta===req.quiz.respuesta){
resultado='Correcto';
} 
res.render('quizes/answer',{quiz:req.quiz.id,respuesta: resultado});

};
