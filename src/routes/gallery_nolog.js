const express = require('express');
const router = express.Router();
const Galeria = require('../models/gallery');

router.get('/', async (req, res,next) => {
  try {
    const arrayGaleriaDB = await Galeria.find();
    console.log(arrayGaleriaDB);
    res.render('gallery_nolog', {
      arrayGaleriaDB: arrayGaleriaDB,
    });
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
