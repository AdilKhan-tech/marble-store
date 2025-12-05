const express = require("express");
const router = express.Router();
const CakeSizeController = require('../controllers/CakeSizeController');
const CakeFlavorController = require('../controllers/CakeFlavorController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);


router.post('/sizes', upload.single('image_url'), CakeSizeController.createCakeSizes);
router.get('/sizes', CakeSizeController.getAllCakeSizes);
router.put('/sizes/:id', upload.single('image_url'), CakeSizeController.updateCakeSizesById);
router.delete('/sizes/:id', CakeSizeController.deleteCakeSizesById);

router.post('/flavors', upload.single('image_url'), CakeFlavorController.createCakeFlavor);
router.get('/flavors', CakeFlavorController.getAllCakeFlavors);
router.put('/flavors/:id', CakeFlavorController.updateCakeFlavorById);
router.delete('/flavors/:id', CakeFlavorController.deleteCakeFlavorById);

module.exports = router;