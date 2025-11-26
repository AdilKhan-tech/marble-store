const express = require("express");
const router = express.Router();
const OccasionController = require('../controllers/OccasionController');


router.post('/create', OccasionController.createOccasion);
router.get('/getall', OccasionController.getAllOccasions);


module.exports = router;
