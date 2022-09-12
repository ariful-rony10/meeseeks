
/**
 * Name: products.router.js
 * Description:
 */
 const router = require('express').Router();
const baseController = require('../controllers/base.controller')

 router.get('/products', (req, res) => {
    res.render('customer/products/all-products')
 })
 module.exports = router;