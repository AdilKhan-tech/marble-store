const express = require("express");
const router = express.Router();
const IceCreamBucketController = require('../controllers/IceCreamBucketController');
const IceCreamPortionSizeController = require("../controllers/IceCreamPortionSizeController");
const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);


router.post('/buckets', upload.any(), IceCreamBucketController.createIceCreamBucket);
router.get('/buckets', IceCreamBucketController.getAllIceCreamBucket);
router.put('/buckets/:id', upload.any(), IceCreamBucketController.updateIceCreamBucketById);
router.delete('/buckets/:id', IceCreamBucketController.deleteIceCreamBucketById);


router.post("/portions", IceCreamPortionSizeController.createIceCreamPortionSize);
router.get("/portions", IceCreamPortionSizeController.getAllIceCreamPortionSize);
router.put("/portion/:id", IceCreamPortionSizeController.updateIceCreamPortionSize);
router.delete("/portion/:id", IceCreamPortionSizeController.deleteIceCreamPortionSizeById);


module.exports = router;
