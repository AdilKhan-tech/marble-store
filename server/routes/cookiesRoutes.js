const express = require("express");
const router = express.Router();
const CookiesController = require('../controllers/CookiesController');
const CookiesTypesController = require('../controllers/CookiesBoxTypesController');
const CookiesBoxSizesController = require('../controllers/CookiesBoxSizesController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

// Cookies
router.post('/create', upload.single('image_url'), CookiesController.createCookie);
router.get('/', CookiesController.getAllCookies);
router.put('/update/:id', upload.single('image_url'), CookiesController.updateCookieById);
router.delete('/delete/:id', CookiesController.deleteCookieById);

// Cookise Types
router.post('/types', upload.single('image_url'), CookiesTypesController.createCookieType);
router.get('/types', CookiesTypesController.getAllCookiesTypes);
router.put('/types/:id', upload.single('image_url'), CookiesTypesController.updateCookieTypeById);
router.delete('/types/:id', CookiesTypesController.deleteCookieTypeById);

// Cookise Size
router.post('/size', upload.single('image_url'), CookiesBoxSizesController.createCookieBoxSize);
router.get('/size', CookiesBoxSizesController.getAllCookiesBoxSizes)
router.put('/size/:id', upload.single('image_url'), CookiesBoxSizesController.updateCookieBoxSizeById);
router.delete('/size/:id', CookiesBoxSizesController.deleteCookieBoxSizeById)

module.exports = router;
