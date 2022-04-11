const { response } = require('express');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.user);
  res.render('home', { titulo: 'mi titulo dinámico' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { tituloContacto: 'Estamos en contacto de manera dinámica!!' });
});

module.exports = router;
