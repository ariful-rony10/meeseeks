const express = require('express');
const app = express();

const path = require('path');

// import routes
const authRoutes = require('./routes/auth.routes');

// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(authRoutes);

app.listen(3000);
