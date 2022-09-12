/**
 * Name: auth.router.js
 * Description:
 */
const router = require('express').Router();

const authController = require('../controllers/auth.controller');
// Routes
router.get('/signup', authController.getSignupPage);
router.post('/signup', authController.signup);
router.put('/signup/:id');
router.delete('/signup/:id');
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);

// Export modules
module.exports = router;
