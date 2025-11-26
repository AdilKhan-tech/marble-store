const express = require("express");
const router = express.Router();
const OccasionController = require('../controllers/OccasionController');


router.post('/create', OccasionController.createOccasion);
router.get('/getall', OccasionController.getAllOccasions);
router.put('/update/:id', OccasionController.updateOccasionById);
router.delete('/delete/:id', OccasionController.deleteOccasionById);


module.exports = router;
