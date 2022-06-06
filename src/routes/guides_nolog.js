const express = require('express');
const router = express.Router();
const multer = require('multer');
const Guias = require('../models/guide');

router.get('/', async (req, res) => {
  try {
    const arrayGuiasDB = await Guias.find();
    console.log(arrayGuiasDB);
    res.render('guides_nolog', {
      arrayGuiasDB: arrayGuiasDB,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/', async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const guiasDB = new Guias(body);
    await guiasDB.save();
    res.redirect('/guide');
  } catch (error) {
    console.log('error', error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const guiasDB = new Guias(body);
    await guiasDB.save();
    res.redirect('/guide');
  } catch (error) {
    console.log('error', error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const guiasDB = await Guias.findOne({ _id: id });
    console.log(guiasDB);
    res.render('guide-detail', {
      guias: guiasDB,
      error: false,
    });
  } catch (error) {
    console.log('Se ha producido un error', error);
    res.render('guide-detail', {
      error: true,
      mensaje: 'No encontrado!',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('id desde backend', id);
  try {
    const guiasDB = await Guias.findByIdAndDelete({ _id: id });
    console.log(guiasDB);
    if (!guiasDB) {
      res.json({
        estado: false,
        mensaje: 'No se puede eliminar',
      });
    } else {
      res.json({
        estado: true,
        mensaje: 'Eliminado.',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  console.log(id);
  console.log('body', body);

  try {
    const guiasDB = await Guias.findByIdAndUpdate(id, body, { useFindAndModify: false });
    console.log(guiasDB);
<<<<<<< HEAD
 
=======
>>>>>>> 1cb1d8381cc3f31c626eb99a3af28963fd0439ec
    res.json({
      estado: true,
      mensaje: 'Editado',
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: 'Problema al editar',
    });
  }
});

module.exports = router;
