const express = require("express");
const router = express.Router();
const CakeSizeController = require('../controllers/CakeSizeController');
const CakeFlavorController = require('../controllers/CakeFlavorController');
const CustomCakeTypeController = require('../controllers/CustomCakeTypeController');
const CustomCakeFlavorController = require('../controllers/CustomCakeFlavorController')
const CakePortionSizeController = require('../controllers/CakePortionSizeController');
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


router.post('/customTypes', upload.single('image_url'), CustomCakeTypeController.createCustomCakeType);
router.get('/customTypes', CustomCakeTypeController.getAllCustomCakeTypes);
router.put('/customTypes/:id', upload.single('image_url'), CustomCakeTypeController.updateCustomCakeTypeById);
router.delete('/customTypes/:id', CustomCakeTypeController.deleteCustomCakeTypeById);

router.post('/customFlavor', upload.single('image_url'), CustomCakeFlavorController.createCustomCakeFlavor)
router.get('/customFlavors', CustomCakeFlavorController.getAllCustomCakeFlavor)
router.delete('/customflavor/:id', CustomCakeFlavorController.deleteCustomCakeFlavorById)
router.put('/customFlavor/:id', upload.single('image_url'), CustomCakeFlavorController.updateCustomCakeFlavorById)

router.post('/customSize', upload.single('image_url'), CustomCakeSizeController.createCustomCakeSize)
router.get('/', CustomCakeSizeController.getAllCustomCakeSize)
router.delete('/customSize/:id', CustomCakeSizeController.deleteCustomCakeSizeById)
router.put('/customSize/:id', upload.single('image_url'), CustomCakeSizeController.updateCustomCakeSizeById);

router.post('/portionSize', upload.single('image_url'), CakePortionSizeController.createCakePortionSize); 
router.get('/portionSize', CakePortionSizeController.getAllCakePortionSizes);
router.put('/portionSize/:id', upload.single('image_url'), CakePortionSizeController.updateCakePortionSizeById); 
router.delete('/portionSize/:id', CakePortionSizeController.deleteCakePortionSizeById);
router.get("/portionSize/tree", CakePortionSizeController.getCakePortionSizeTree);


module.exports = router;