const express = require("express");
const router = express.Router();
const CakeSizeController = require('../controllers/CakeSizeController');
const CakeFlavorController = require('../controllers/CakeFlavorController');
const CustomCakeTypesController = require('../controllers/CustomCakeTypesController');
const CustomCakeFlavorController = require('../controllers/CustomCakeFlavorController')
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");
const CustomCakeSizeController = require("../controllers/CustomCakeSizeController");

router.use(authenticateToken);


router.post('/sizes', upload.single('image_url'), CakeSizeController.createCakeSize);
router.get('/sizes', CakeSizeController.getAllCakeSizes);
router.put('/sizes/:id', upload.single('image_url'), CakeSizeController.updateCakeSizeById);
router.delete('/sizes/:id', CakeSizeController.deleteCakeSizeById);

router.post('/flavors', upload.single('image_url'), CakeFlavorController.createCakeFlavor);
router.get('/flavors', CakeFlavorController.getAllCakeFlavors);
router.put('/flavors/:id', upload.single('image_url'), CakeFlavorController.updateCakeFlavorById);
router.delete('/flavors/:id', CakeFlavorController.deleteCakeFlavorById);


router.post('/customTypes', upload.single('image_url'), CustomCakeTypesController.createCustomCakeType);
router.get('/customTypes', CustomCakeTypesController.getAllCustomCakeTypes);
router.put('/customTypes/:id', upload.single('image_url'), CustomCakeTypesController.updateCustomCakeTypeById);
router.delete('/customTypes/:id', CustomCakeTypesController.deleteCustomCakeTypeById);

router.post('/customFlavor', upload.single('image_url'), CustomCakeFlavorController.createCustomCakeFlavor)
router.get('/customFlavors', CustomCakeFlavorController.getAllCustomCakeFlavor)
router.delete('/customflavor/:id', CustomCakeFlavorController.deleteCustomCakeFlavorById)
router.put('/customFlavor/:id', CustomCakeFlavorController.updateCustomCakeFlavorById)

router.post('/customSize', upload.single('image_url'), CustomCakeSizeController.createCustomCakeSize)
router.get('/', CustomCakeSizeController.getAllCustomCakeSize)

module.exports = router;