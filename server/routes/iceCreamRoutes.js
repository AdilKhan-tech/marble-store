const express = require("express");
const router = express.Router();
const IceCreamBucketController = require('../controllers/IceCreamBucketController');
const IceCreamPortionSizeController = require("../controllers/IceCreamPortionSizeController");
const IceCreamAddOnsController = require("../controllers/IceCreamAddOnsController");

const authenticateToken = require("../middlewares/authenticateToken");

const upload = require("../middlewares/upload");

router.use(authenticateToken);


router.post('/buckets', upload.single('image_url'), IceCreamBucketController.createIceCreamBucket);
router.get('/buckets', IceCreamBucketController.getAllIceCreamBucket);
router.put('/buckets/:id', upload.single('image_url'), IceCreamBucketController.updateIceCreamBucketById);
router.delete('/buckets/:id', IceCreamBucketController.deleteIceCreamBucketById);


router.post("/portions", upload.single('image_url'), IceCreamPortionSizeController.createIceCreamPortionSize);
router.get("/portions", IceCreamPortionSizeController.getAllIceCreamPortionSize);
router.put("/portions/:id", upload.single('image_url'), IceCreamPortionSizeController.updateIceCreamPortionSize);
router.delete("/portions/:id", IceCreamPortionSizeController.deleteIceCreamPortionSizeById);


router.post("/addons", IceCreamAddOnsController.createIceCreamAddOns);
router.get("/addons", IceCreamAddOnsController.getAllIceCreamAddOns);
router.put("/addons/:id", IceCreamAddOnsController.updateIceCreamAddOnsById);
router.delete("/addons/:id", IceCreamAddOnsController.deleteIceCreamAddOnsById);



module.exports = router;
