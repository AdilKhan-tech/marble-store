const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

router.post('/create', upload.single('image_url'), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.put('/update/:id', upload.single('image_url'), CategoryController.updateCategoryById);
router.delete('/delete/:id', CategoryController.deleteCategoryById);
router.get("/tree", CategoryController.getCategoryTree);



module.exports = router;
