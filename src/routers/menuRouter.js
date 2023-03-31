const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", menuController.getMenu);
router.post("/createMenu", verifyToken, menuController.createMenu);
router.patch("/editMenu/:id", verifyToken, menuController.editMenu);
router.delete("/deleteMenu/:id", verifyToken, menuController.deleteMenu);

module.exports = router;
