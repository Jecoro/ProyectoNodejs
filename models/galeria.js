const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galeriaSchema = new Schema({
    nombre: String,
    material: String,
    tiempo: String,
    impresora: String,
    autor: String,
    img:String
})

//Creamos el modelo
const Galeria = mongoose.model('Galeria', galeriaSchema, "galeria");

module.exports = Galeria;