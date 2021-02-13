const express = require('express') //Requerimos Express
const app = express() //Variable para utilizar lo que estamos requiriendo
const port = process.env.PORT || 3000 //Hacemos uso de las variables de entorno

//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
const user = 'danielmuniz';
const password = '4qtpA2OIwvaI9SXy';
const dbname = 'bdpokemon';
const uri = `mongodb+srv://${user}:${password}@cluster0.vzezs.mongodb.net/${dbname}?retryWrites=true&w=majority`; //URL de conexión

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
app.use('/pokemon', require('./router/pokemon'));

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

