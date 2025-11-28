const express = require ("express");
const router = express.Router();
const BranchController = require("../controllers/BranchController");
const authenticateToken = require("../middlewares/authenticateToken");


router.use(authenticateToken);

router.post('/create', BranchController.createBranch);
router.get('/getAll', BranchController.getAllBranches);
router.put('/update/:id', BranchController.updateBranchById);
router.delete('/delete/:id', BranchController.deleteBranchById);

module.exports = router;