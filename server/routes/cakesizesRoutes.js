const express = require("express");
const router = express.Router();
const CakeSizesController = require('../controllers/CakeSizesController');
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);


router.post('/create', CakeSizesController.createCakeSizes);
router.get('/getall', CakeSizesController.getAllCakeSizes);
router.put('/update/:id', CakeSizesController.updateCakeSizesById);
module.exports = router;