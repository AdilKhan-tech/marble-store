const express = require("express");
const router = express.Router();
const CookiesController = require('../controllers/CookiesController');
const CookiesTypesController = require('../controllers/CookiesTypesController');
const CookiesBoxSizesController = require('../controllers/CookiesBoxSizesController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

// Cookies
router.post('/create', upload.single('image_url'), CookiesController.createCookies);
router.get('/getAll', CookiesController.getAllCookies);
router.put('/update/:id', upload.single('image_url'), CookiesController.updateCookiesById);
router.delete('/delete/:id', CookiesController.deleteCookiesById);

// Cookise Types
router.post('/types', upload.single('image_url'), CookiesTypesController.createCookiesTypes);
router.get('/types', CookiesTypesController.getAllCookiesTypes);
router.put('/types/:id', upload.single('image_url'), CookiesTypesController.updateCookiesTypesById);
router.delete('/types/:id', CookiesTypesController.deleteCookiesTypesById);

// Cookise Size
router.post('/size', upload.single('image_url'), CookiesBoxSizesController.createCookiesBoxSizes);
router.get('/size', CookiesBoxSizesController.getAllCookiesBoxSizes)
router.put('/size/:id', upload.single('image_url'), CookiesBoxSizesController.updateCookiesBoxSizesById);
router.delete('/size/:id', CookiesBoxSizesController.deleteCookiesBoxSizesById)

module.exports = router;
