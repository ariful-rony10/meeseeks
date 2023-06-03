// Name: auth.routes.js
const express = require('express');
const router = express.Router();
// import controllers
const authController = require('../controllers/auth.controller');

// define auth route
router.get('/signup', authController.getSignup);
router.get('/login', authController.getLogin);

// export router
module.exports = router;
