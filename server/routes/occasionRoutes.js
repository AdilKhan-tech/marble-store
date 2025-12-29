const express = require("express");
const router = express.Router();
const OccasionController = require('../controllers/OccasionController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

router.post('/create', upload.single('image_url'), OccasionController.createOccasion);
router.get('/', OccasionController.getAllOccasions);
router.put('/update/:id', upload.single('image_url'), OccasionController.updateOccasionById);
router.delete('/delete/:id', OccasionController.deleteOccasionById);


module.exports = router;
