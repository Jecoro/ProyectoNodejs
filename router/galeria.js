const express = require('express');
const router = express.Router();
const Galeria = require('../models/galeria');

router.get('/', async (req, res) => {

    try {
        const arrayGaleriaDB = await Galeria.find();
        console.log(arrayGaleriaDB);
        res.render("galeria", {
            arrayGaleriaDB: arrayGaleriaDB
        })
    } catch (error) {
        console.error(error)
    }
})


router.get('/crearImagen', (req, res) => {
    res.render('crearImagen')
})



router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const galeriaDB = new Galeria(body)
        await galeriaDB.save()
        res.redirect('/galeria')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => { 
    const id = req.params.id 
    try {
        const galeriaDB = await Galeria.findOne({ _id: id })
        console.log(galeriaDB)
        res.render('detalle', {
            galeria: galeriaDB,
            error: false
        })
    } catch (error) {
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error: true,
            mensaje: 'No encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const galeriaDB = await Galeria.findByIdAndDelete({ _id: id });
        console.log(galeriaDB)
        if (!galeriaDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Eliminado.'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    console.log(id)
    console.log('body', body)

    try {
        const galeriaDB = await Galeria.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(galeriaDB)
        res.json({
            estado: true,
            mensaje: 'Editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar'
        })
    }
})

module.exports = router;