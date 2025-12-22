const express = require("express");
const router = express.Router();
const CakeSizeController = require('../controllers/CakeSizeController');
const CakeFlavorController = require('../controllers/CakeFlavorController');
const CustomCakeTypesController = require('../controllers/CustomCakeTypesController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);


router.post('/sizes', upload.single('image_url'), CakeSizeController.createCakeSizes);
router.get('/sizes', CakeSizeController.getAllCakeSizes);
router.put('/sizes/:id', upload.single('image_url'), CakeSizeController.updateCakeSizesById);
router.delete('/sizes/:id', CakeSizeController.deleteCakeSizesById);

router.post('/flavors', upload.single('image_url'), CakeFlavorController.createCakeFlavor);
router.get('/flavors', CakeFlavorController.getAllCakeFlavors);
router.put('/flavors/:id', upload.single('image_url'), CakeFlavorController.updateCakeFlavorById);
router.delete('/flavors/:id', CakeFlavorController.deleteCakeFlavorById);


router.post('/customTypes', upload.single('image_url'), CustomCakeTypesController.createCustomCakeTypes);
router.get('/customTypes', CustomCakeTypesController.getAllCustomCakeTypes);
router.put('/customTypes/:id', upload.single('image_url'), CustomCakeTypesController.updateCustomCakeTypesById);
router.delete('/customTypes/:id', CustomCakeTypesController.deleteCustomCakeTypesById);

module.exports = router;