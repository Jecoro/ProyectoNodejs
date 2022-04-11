require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000; //Hacemos uso de las variables de entorno

// Allow parsing of body field in requests
app.use(bodyParser.urlencoded({ extended: false }));

// Allow parsing of json in the body field of requests
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connection established to the DB.'))
  .catch((e) => console.log(e));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/public', express.static(path.join(__dirname, '../public')));

// Set up application routing
app.use('/', require('./routes/routes'));
app.use('/guide', require('./routes/guide'));
app.use('/gallery', require('./routes/gallery'));
app.use('/shop', require('./routes/shop'));
app.use('/login', require('./routes/login'));
app.use('/sign-up', require('./routes/sign-up'));

app.use((req, res) => {
  res.status(404).render('404', {
    titulo: 'Error 404',
    descripcion: 'Page Not Found',
  });
});

app.listen(PORT, () => {
  // Show the port here because the app by default doesn't output
  // that kind of information and we need it to connect to it.
  console.log(`App listening at http://localhost:${PORT}`);
});
