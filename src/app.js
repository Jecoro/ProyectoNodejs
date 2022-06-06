require("dotenv").config();

const port = process.env.PORT || 3000;
const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const usuario = require('./models/user');
const path = require('path');


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


app.use(express.static(__dirname + "/public"));


// Set up application routing
//app.use('/', require('./routes/routes'));
app.use('/guide', require('./routes/guide'));
app.use('/gallery', require('./routes/gallery'));
app.use('/gallery_nolog', require('./routes/gallery_nolog'));
app.use('/guides_nolog', require('./routes/guides_nolog'));
app.use('/shop', require('./routes/shop'));
app.use('/shop_nolog', require('./routes/shop_nolog'));
// app.use('/login', require('./routes/login'));
app.use('/sign-up', require('./routes/sign-up'));
app.get('/contacto', (req, res) => {
    res.render("contacto", { tituloContacto: "Estamos en contacto de manera dinámica!!" })
})
app.get('/create', (req, res) => {
    res.render("create")
})
app.get('/gallery/create-image', (req, res) => {
    res.render("create-image")
})

app.get('/create-item', (req, res) => {
    res.render('create-item');
  });
  
app.get('/index', (req, res) => {
    res.render("index");
})
app.get('/index_nolog', (req, res) => {
    res.render("index_nolog");
})

const passport = require("passport");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require("passport-local").Strategy;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('mi secreto lets goo'));

app.use(session({
    secret: "mi ultra secreto",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(async function (username, password, done) {

    const usuario = require('./models/user');
    // Aqui tengo que comprobar lo qeu venga de al base de datos
    const arrayusuarioDB = await usuario.find();
    console.log("Usuarios: " + arrayusuarioDB)

    // buscar(arrayusuarioDB);

    if (buscar(arrayusuarioDB, username, password)) {
        console.log("jasjasjas");
        return done(null, { id: 1, name: "admin" });

    } else {    
        console.log("jesjesjes");
                return done(null, false);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    done(null, { id: 1, name: "admin" });
})

app.get("/", (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/index_nolog");
}, (req, res) => {
    res.render("index")
})

app.get('/index_nolog', async (req, res) => {
    res.render("index_nolog");
})


// Esto es lo nuevo:


// Cuando vamos a login (Cerrar sesión)
app.get('/login', async (req, res) => {
    req.logOut();
    res.render("login");
})
app.get('/gallery_nolog', async (req, res) => {
    res.render("gallery_nolog");
})
app.get('/login/registrate', async (req, res) => {
    res.render("registrate");
})


// Si venimos desde registro creamos y guardamos un nuevo usuario.
app.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const usuarioDB = new usuario(body) 
        await usuarioDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})


// Redirecciones desde login
app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}), async (req, res) => {

})

// Poner en escucha el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


// Página de error
app.use((req, res) => {
    res.status(404).render("404", {
        titulo: "Error 404",
        descripcion: "Page not found"
    });

})

// Compruebo el usuario y contraseña para ver si el login es correcto
function buscar(array, user, pass) {
    
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
        if (array[i].usuario === user && array[i].password === pass) {
            return true;
        }
    }
}


