/* eslint-disable linebreak-style*/
/* eslint-disable prefer-arrow-callback*/
/*eslint-disable */
// importing modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const helmet = require('helmet');

const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const authenticatedRoutes = require('./lib/routes/authenticated-routes');

require('dotenv').config();

app.use(helmet());
app.use(session({secret:'testing', saveUninitialized : true, resave : true, cookie:{maxAge:1 * 60 * 60 * 1000 }}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(compression());

// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'lib/public')));

module.exports = app;