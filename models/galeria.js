const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const galeriaSchema = new Schema({
    nombre: String,
    material: String,
    tiempo: String,
    impresora: String,
    autor: String
})

//Creamos el modelo
const Galerias = mongoose.model('Guias', galeriaSchema, "guias");

module.exports = Galerias;