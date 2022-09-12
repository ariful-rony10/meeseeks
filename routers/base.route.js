
/**
 * Name: base.router.js
 * Description:
 */
 const router = require('express').Router();
const baseController = require('../controllers/base.controller')

 router.get('/', (req, res) => {
    res.redirect('/products')
 })
 module.exports = router;