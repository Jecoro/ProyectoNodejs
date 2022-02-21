const express = require('express');
const router = express.Router();
const Tienda = require('../models/tienda');

router.get('/', async (req, res) => {

    try {
        const arrayTiendaDB = await Tienda.find();
        console.log(arrayTiendaDB);
        res.render("tienda", {
            arrayTiendaDB: arrayTiendaDB
        })
    } catch (error) {
        console.error(error)
    }
})


router.get('/crearItem', (req, res) => {
    res.render('crearItem')
})



router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const tiendaDB = new Tienda(body)
        await tiendaDB.save()
        res.redirect('/tienda')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => { 
    const id = req.params.id 
    try {
        const tiendaDB = await Tienda.findOne({ _id: id })
        console.log(tiendaDB)
        res.render('detalle', {
            tienda: tiendaDB,
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
        const tiendaDB = await Tienda.findByIdAndDelete({ _id: id });
        console.log(tiendaDB)
        if (!tiendaDB) {
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
        const tiendaDB = await Tienda.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(tiendaDB)
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