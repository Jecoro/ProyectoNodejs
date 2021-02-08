const express = require('express') //Requerimos Express
const app = express() //Variable para utilizar lo que estamos requiriendo
const port = 3000 //Habitualmente el 3000 para entornos locales
//Cuando lo subamos a un servidor real, deberemos cambiarlo

//Motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => { 
  //Primero indicamos la vista y después un objeto
  res.render("index", {titulo : "mi titulo dinámico"})
})

app.get('/contacto', (req, res) => { 
    res.render("contacto", {tituloContacto : "Estamos en contacto de manera dinámica!!"})
})

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