const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Estructura de un usuario nuevo:
const userSchema = new Schema({
    usuario: String,
    password: String,
    nombre: String,
    email: String,
    apellidos: String
})

//Creamos el modelo
const Usuario = mongoose.model('usuarios', userSchema, "usuarios"); //MAYUSCULA IMPORTANTE
console.log(Usuario)
module.exports = Usuario;
                                                     