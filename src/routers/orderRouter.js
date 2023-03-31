const express = require("express");
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/createOrder", verifyToken, orderController.createOrder);
router.get("/getOrder", verifyToken, orderController.getOrder);
router.get("/getAllOrder", verifyToken, orderController.getAllOrder);
router.patch("/acceptOrder/:id", verifyToken, orderController.acceptOrder);
router.patch("/rejectOrder/:id", verifyToken, orderController.rejectOrder);

module.exports = router;
