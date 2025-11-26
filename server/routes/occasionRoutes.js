const express = require("express");
const router = express.Router();
const OccasionController = require('../controllers/OccasionController');
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);

router.post('/create', upload.any(), OccasionController.createOccasion);
router.get('/getall', OccasionController.getAllOccasions);


module.exports = router;
