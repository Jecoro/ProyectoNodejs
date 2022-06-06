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

<<<<<<< HEAD
router.get('/create-image', (req, res) => {
  res.render('create-image');
});
>>>>>>> 1cb1d8381cc3f31c626eb99a3af28963fd0439ec
router.post('/', async (req, res) => {
  const body = req.body;
    const galeriaDB = new Galeria(body);
    res.redirect('/gallery');
=======
    res.redirect('/gallery_nolog');
>>>>>>> 1cb1d8381cc3f31c626eb99a3af28963fd0439ec
  } catch (error) {
    console.log('error', error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const galeriaDB = await Galeria.findOne({ _id: id });
    console.log(galeriaDB);
    res.render('gallery-detail', {
      galeria: galeriaDB,
      error: false,
    });
  } catch (error) {
    console.log('Se ha producido un error', error);
    res.render('shop', {
      error: true,
      mensaje: 'No encontrado!',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('id desde backend', id);
  try {
    const galeriaDB = await Galeria.findByIdAndDelete({ _id: id });
    console.log(galeriaDB);
    if (!galeriaDB) {
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
    const galeriaDB = await Galeria.findByIdAndUpdate(id, body, { useFindAndModify: false });
    console.log(galeriaDB);
    console.log("imINNN");
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
