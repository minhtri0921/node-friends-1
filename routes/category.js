const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.getListCats);
router.get('/cat-by-id', categoryController.getCatById);

module.exports = router;
