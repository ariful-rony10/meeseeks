/**
 * Name: app.js
 * Description: Application entry point.
 */

const express = require('express');
const path = require('path');
const csrf = require('csurf')
const db = require('./database/database');
const authRoute = require('./routers/auth.router');

const app = express();

const PORT = process.env.PORT || 8000;

// Templeting engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static('public')); // static folder
app.use(express.urlencoded({ extended: false }));

// csrf protection
app.use(csrf())

// Routes
app.use(authRoute);

db.connectToDatabase()
  .then(app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
  .catch((error) => console.log('Failed to connect with database!', error));
