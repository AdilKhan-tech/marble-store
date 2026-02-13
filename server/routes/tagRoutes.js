const express = require("express");
const router = express.Router();
const TagController = require('../controllers/TagController');
const authenticateToken = require("../middlewares/authenticateToken");

router.use(authenticateToken);

router.post('/create', TagController.createTag);
router.get('/', TagController.getAllTags)
router.put('/update/:id', TagController.updateTagById);
router.delete('/delete/:id', TagController.deleteTagById);

module.exports = router;