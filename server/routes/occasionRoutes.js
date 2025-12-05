const express = require("express");
const router = express.Router();
const OccasionController = require('../controllers/OccasionController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

router.post('/create', upload.single(), OccasionController.createOccasion);
router.get('/getall', OccasionController.getAllOccasions);
router.put('/update/:id', OccasionController.updateOccasionById);
router.delete('/delete/:id', OccasionController.deleteOccasionById);


module.exports = router;
