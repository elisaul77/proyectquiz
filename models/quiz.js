//definicion del modelo quiz

module.exports=function  (sequelize,DataTypes) {
	return sequelize.define(
	{
		pregunta: DataTypes.STRING,
		respuesta: DataTypes.STRING,
	})	;
	// body...
}