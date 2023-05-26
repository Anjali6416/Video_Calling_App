const express = require("express");
const {
  registerNewUser,
  loginUser,
  getUser,
} = require("../controllers/authController");

const {
  authMiddleware
  
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.get("/user/:id", authMiddleware, getUser);

module.exports = router;
