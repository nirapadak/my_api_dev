const express = require('express');
const router = express.Router();
const expressFormidable = require('express-formidable');

const { loginRequired, isAdmin } = require('../middleware/auth');
const { createProduct } = require('../controllers/product.js');

router.post('/product', loginRequired, isAdmin, expressFormidable(), createProduct);



module.exports =router