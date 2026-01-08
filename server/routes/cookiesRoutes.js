const express = require("express");
const router = express.Router();
const CookieController = require('../controllers/CookieController');
const CookieBoxTypeController = require('../controllers/CookieBoxTypeController');
const CookieBoxSizeController = require('../controllers/CookieBoxSizeController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

// Cookies
router.post('/create', upload.single('image_url'), CookieController.createCookie);
router.get('/', CookieController.getAllCookies);
router.put('/update/:id', upload.single('image_url'), CookieController.updateCookieById);
router.delete('/delete/:id', CookieController.deleteCookieById);

// Cookise Types
router.post('/types', upload.single('image_url'), CookieBoxTypeController.createCookieBoxType);
router.get('/types', CookieBoxTypeController.getAllCookieBoxTypes);
router.put('/types/:id', upload.single('image_url'), CookieBoxTypeController.updateCookieBoxTypeById);
router.delete('/types/:id', CookieBoxTypeController.deleteCookieBoxTypeById);

// Cookise Size
router.post('/size', upload.single('image_url'), CookieBoxSizeController.createCookieBoxSize);
router.get('/sizes', CookieBoxSizeController.getAllCookieBoxSizes)
router.put('/size/:id', upload.single('image_url'), CookieBoxSizeController.updateCookieBoxSizeById);
router.delete('/size/:id', CookieBoxSizeController.deleteCookieBoxSizeById)

module.exports = router;
