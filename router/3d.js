const express = require('express');
const router = express.Router();

//const Pokemon = require('../models/pokemon');
router.get('/inicio', async (req, res) => {

    res.render('inicio')


})
module.exports = router;