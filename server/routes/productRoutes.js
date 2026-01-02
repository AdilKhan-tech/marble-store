const express = require("express");
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

router.post('/create', upload.single('image_url'), ProductController.createProduct);
router.get('/', ProductController.getAllProducts)


module.exports = router;