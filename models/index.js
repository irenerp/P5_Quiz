const  Sequelize= require('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite", // Para que no me salgan trazas
    {logging: false});


sequelize.define('quiz', {      //Defino el quiz, que es un modelo de datos
    question: {
        type: Sequelize.STRING,
        unique: {msg: "No existe esta pregunta"}, //Cada pregunta es unica, si se repite me sale ese mensaje
        validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}} //Validación adicional
    },
    answer: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vacía"}}
    }
});

sequelize.sync()
    .then(() => sequelize.models.quiz.count())  //Cuenta cuantos quizzes hay y lo pasaremos luego como parámetro en el then
.then(count => {
    if (!count) { //Si hay cero quizzes necesito crear mas por tanto
    return sequelize.models.quiz.bulkCreate([ //inicializo BBDD
        { question: "Capital de Italia", answer: "Roma" },
        { question: "Capital de Francia", answer: "París" },
        { question: "Capital de España", answer: "Madrid" },
        { question: "Capital de Portugal", answer: "Lisboa" }
    ]);
}
})
.catch(error => {
    console.log(error);
});
//exporto el sequelize
module.exports = sequelize;