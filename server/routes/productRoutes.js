const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const ProductTagController = require('../controllers/ProductTagController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

router.post('/create', upload.single('image_url'), ProductController.createProduct);
router.get('/', ProductController.getAllProducts)
router.delete('/delete/:id', ProductController.deleteProductById);
router.get('/:id', ProductController.getProductById);

// ProductTags
router.post('/product', ProductTagController.createProductTag);
router.get('/product', ProductTagController.getAllProductTag)
router.delete('/product/:id', ProductTagController.deleteProductTagById);
router.put('/product/:id', ProductTagController.updateProductTagById);


module.exports = router;