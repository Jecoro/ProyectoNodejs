const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const app= express();
const router = express.Router();
const bcrypt= require('bcrypt');
const mongoose= require('mongoose');
const User= require('../models/usuario');


router.get('/',(req,res)=>{
    res.render('registro')
    const{username,password}=req.body;
    const user=new user({username,password});
    user.save(err=>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR AL USUARIO');
        }else{
            res.status(200).send('Usuario Registrado');
        }
    });
});

module.exports = router;