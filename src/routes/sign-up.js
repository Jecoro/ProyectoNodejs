const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', (req, res) => {
  return res.render('sign-up');
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
    } else {
      res.status(200).send('Usuario Registrado');
    }
  });
});

module.exports = router;
