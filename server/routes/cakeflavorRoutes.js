const express = require("express");
const router = express.Router();
const CakeFlavorController = require('../controllers/CakeFlavorController');
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);


router.post('/create', CakeFlavorController.createCakeFlavor);
router.get('/getall', CakeFlavorController.getAllCakeFlavors);
router.put('/update/:id', CakeFlavorController.updateCakeFlavorById);
router.delete('/delete/:id', CakeFlavorController.deleteCakeFlavorById);

module.exports = router;