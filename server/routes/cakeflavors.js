const express = require("express");
const router = express.Router();
const CakeFlavorsController = require('../controllers/CakeFlavorsController');
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);


router.post('/create', CakeFlavorsController.createCakeFlavor);
router.get('/getall', CakeFlavorsController.getAllCakeFlavors);
router.put('/update/:id', CakeFlavorsController.updateCakeFlavorById);
router.delete('/delete/:id', CakeFlavorsController.deleteCakeFlavorById);

module.exports = router;