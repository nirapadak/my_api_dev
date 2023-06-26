const express = require('express');
const router = express.Router();

const { isAdmin, loginRequired } = require('../middleware/auth');
const { categoryCreate, categoryUpdate, remove, findAll, slugReade } = require('../controllers/category');

router.post('/category', loginRequired, isAdmin, categoryCreate);
router.put('/category/:categoryId', loginRequired, isAdmin, categoryUpdate);
router.delete('/category/:categoryId', loginRequired, isAdmin, remove);
router.get('/category/list', loginRequired, isAdmin, findAll);
router.get('/category/:slug', loginRequired, isAdmin, slugReade)


module.exports = router