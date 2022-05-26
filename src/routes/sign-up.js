const express = require('express');
const router = express.Router();
const usuario = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const arrayusuarioDB = await usuario.find();
        // console.log(arrayusuarioDB);
        res.render("sign-up", { 
            arrayusuario: arrayusuarioDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get("/crearUser", (req, res) => {
    res.render("crearUser") // Nueva vista que debemos crear
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id 

    try {
        const usuarioDB = await usuario.findOne({ _id: id }) 
        res.render('detalleUsuarios', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            usuario: usuarioDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleUsuarios', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'usuario no encontrado.'
        })
    }
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const usuarioDB = new usuario(body) //Creamos un nuevo Libro, gracias al modelo
        await usuarioDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/registro') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})



router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const usuarioDB = await usuario.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(usuarioDB)
        res.json({
            estado: true,
            mensaje: 'usuario editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el usuario'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        //siguiente función para eliminar
        const usuarioDB = await usuario.findByIdAndDelete({ _id: id });
        console.log(usuarioDB)

        if (!usuarioDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el usuario.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'usuario eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
