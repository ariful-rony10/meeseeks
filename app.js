/**
 * Name: app.js
 * Description: Application extry point.
 */

const express = require('express');
const path = require('path');

const authRoute = require('./routers/auth.router');

const app = express();

const PORT = process.env.PORT || 8000;

// Templeting engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares

app.use(express.static('public'));

// Routes
app.use(authRoute);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
