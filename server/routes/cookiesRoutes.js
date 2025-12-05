const express = require("express");
const router = express.Router();
const CookiesController = require('../controllers/CookiesController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);


router.post('/create', upload.single('image_url'), CookiesController.createCookies);
router.get('/getAll', CookiesController.getAllCookies);
router.put('/update/:id', upload.single('image_url'), CookiesController.updateCookiesById);
router.delete('/delete/:id', CookiesController.deleteCookiesById);


module.exports = router;
