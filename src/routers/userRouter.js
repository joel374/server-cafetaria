const express = require("express")
const userController = require("../controllers/userController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()

router.post("/login", userController.loginUser)
router.get("/refresh-token", verifyToken, userController.refreshToken)

module.exports = router
