// dotenv config and .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// mongoose config
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((x) => {
  console.log(`Connected to Mongo! Database name "{x.connections[0].name}"`
  );
}).catch((err) => {
  console.error('Error connecting to mongo', err)
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// para usar motor de vistas en el backend se usa hbs (por ejemplo mandar un msj cuando entras a una ruta)
app.set("views", path.join(__dirname, "views")); //= path-to-project/views
app.set("view engine", "hbs");

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
