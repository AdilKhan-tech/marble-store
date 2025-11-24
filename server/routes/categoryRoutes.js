const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');


router.post('/create', CategoryController.createCategory);
router.get('/getAll', CategoryController.getAllCategories);
router.put('/update/:id', CategoryController.updateCategoryById);
router.delete('/delete/:id', CategoryController.deleteCategoryById);



module.exports = router;
