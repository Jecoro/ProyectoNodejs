const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galeriaSchema = new Schema({
    nombre: String,
    impresora: String,
    autor: String,
    texto: String,
    video: String,
    resumen: String,
    img:String
})

//Creamos el modelo
const Galerias = mongoose.model('Guias', galeriaSchema, "guias");

module.exports = Galerias;