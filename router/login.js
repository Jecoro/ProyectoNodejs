const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const app= express();
const router = express.Router();
const bcrypt= require('bcrypt');
const mongoose= require('mongoose');
const User= require('../models/usuario');


router.post('/',(req,res)=>{
    res.render('login')
    const{username,password}=req.body;
    User.findOne({username},(req,res)=>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(200).send('El Usuario no existe');
        }else{
            user.isCorrectPassword(password,(err,res)=>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');     
                }else if(result){
                    res.status(200).send('Usuario autenticado correctamente');
                }else{
                    res.status(200).send('Usuario y/o contraseña incorrecta');
                }

            });
        }

    });
    
});

module.exports = router;