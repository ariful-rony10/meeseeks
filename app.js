/**
 * Name: app.js
 * Description: Application entry point.
 */

const express = require('express'); // import express
const path = require('path'); // import builtin path 
const csrf = require('csurf') // import csrf package
const expressSession = require('express-session')

const createSessionConfig = require('./config/session') // import session 
const db = require('./database/database'); // import database

const errorHandlerMiddleware = require('./middlewares/errorHandler') // import error handler middleware
const addCsrfTokenMiddleware = require('./middlewares/csrf-token') // import custom csrf token middleware
const authRoute = require('./routers/auth.router'); // import auth route

const app = express();

const PORT = process.env.PORT || 8000;

// Templeting engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static('public')); // static folder
app.use(express.urlencoded({ extended: false }));

// session 
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig))
// csrf protection
app.use(csrf())
app.use(addCsrfTokenMiddleware);
// Routes
app.use(authRoute);
app.use(errorHandlerMiddleware)
db.connectToDatabase()
  .then(app.listen(PORT, () => console.log(`Listening on port: ${PORT}`)))
  .catch((error) => console.log('Failed to connect with database!', error));
