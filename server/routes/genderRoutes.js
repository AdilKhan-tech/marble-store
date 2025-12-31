const express = require("express");
const router = express.Router();
const GenderController = require('../controllers/GenderController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload")

router.use(authenticateToken);


router.post('/create', upload.single("image_url"), GenderController.createGender);
router.get('/', GenderController.getAllGenders);
router.put('/update/:id', GenderController.updateGenderById);
router.delete('/delete/:id', GenderController.deleteGenderById);


module.exports = router;
