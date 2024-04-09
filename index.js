const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dateFilter = require('nunjucks-date-filter');
const dotenv = require('dotenv');
const auth = require(__dirname + '/routes/auth');
const videojuegos = require(__dirname + '/routes/videojuegos');
const usuarios = require(__dirname + '/routes/usuarios');
const transacciones = require(__dirname + '/routes/transacciones');
const cors = require('cors');
const bodyParser = require('body-parser');

//const usuarios = require(__dirname + '/routes/usuarios');

dotenv.config();

mongoose.connect(process.env.CONEXION);

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const env = nunjucks.configure('views', {
  autoescape: true,
  express: app,
});


env.addFilter('date', dateFilter);

app.set('view engine', 'njk');

app.use(express.json());


app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: false,
  expires: new Date(Date.now() + (30 * 60 * 1000))
}));


app.use(express.static('/public'));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(cors());


app.use('/auth', auth);

app.use('/videojuegos', videojuegos);

app.use('/usuarios', usuarios);

app.use('/transacciones', transacciones);



app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


app.listen(process.env.PUERTO);
