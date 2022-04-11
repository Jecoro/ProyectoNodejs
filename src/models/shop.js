const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tiendaSchema = new Schema({
    nombre: String,
    precio: String,
    img:String
})

//Creamos el modelo
const Tienda = mongoose.model('Tienda',tiendaSchema, "tienda");

module.exports = Tienda;