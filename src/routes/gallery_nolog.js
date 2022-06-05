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

router.post('/', async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const galeriaDB = new Galeria(body);
    await galeriaDB.save();
    res.redirect('/gallery_nolog');
  } catch (error) {
    console.log('error', error);
  }
});

module.exports = router;
