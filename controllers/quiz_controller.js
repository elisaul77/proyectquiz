var models =require('../models/models.js');

exports.show=function  (req, res) {
models.Quiz.findById(req.params.quizId).then(function(quiz){
res.render('quizes/show',{quiz: quiz});
});
};

exports.answer=function  (req, res) {
models.Quiz.findById(req.params.quizId).then(function(quiz){	

if(req.query.respuesta===quiz.respuesta){
res.render('quizes/answer',{quiz:quiz.id, respuesta: 'correcto'});
} else {
res.render('quizes/answer',{quiz:quiz.id,respuesta: 'incorrecto'});
}
});

};
//GET /quizes
exports.index=function (req, res) {
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index.ejs',{quizes:quizes});
	});
};
