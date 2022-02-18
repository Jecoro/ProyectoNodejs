const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guiasSchema = new Schema({
    nombre: String,
    impresora: String,
    autor: String,
    texto: String,
    video: String,
    resumen: String,
    img:String
})

//Creamos el modelo
const Guias = mongoose.model('Guias', guiasSchema, "guias");

module.exports = Guias;