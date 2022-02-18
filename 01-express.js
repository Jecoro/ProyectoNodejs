const express = require('express') //Requerimos Express
const bodyParser = require('body-parser') 
const app = express() //Variable para utilizar lo que estamos requiriendo

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000 //Hacemos uso de las variables de entorno

//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.feme1.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


//Motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'));

// Llamadas a las rutas:
app.use('/', require('./router/rutas'));
app.use('/guias', require('./router/guias'));

app.use((req, res) => {
  res.status(404).render("404", {
    titulo: "Error 404",
    descripcion: "Page Not Found"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  //Es importante postrar el puerto, ya que cuando esté en producción
  //ese puerto será dinámico y habrá cambiado. Así podremos saber cual es
})

