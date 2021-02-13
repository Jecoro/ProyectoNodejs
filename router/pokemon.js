const express = require('express');
const router = express.Router();

const Pokemon = require('../models/pokemon');

router.get('/', async (req, res) => {

    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayPokemonDB = await Pokemon.find();
        console.log(arrayPokemonDB);
        res.render("pokemon", { 
            arrayPokemon: arrayPokemonDB
        })
    } catch (error) {
        console.error(error)
    }

   
})
module.exports = router;