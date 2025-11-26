const express = require("express");
const router = express.Router();
const GenderController = require('../controllers/GenderController');
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);


router.post('/create', GenderController.createGender);
router.get('/getall', GenderController.getAllGenders);
router.put('/update/:id', GenderController.updateGender);
router.delete('/delete/:id', GenderController.deleteGenderById);


module.exports = router;
