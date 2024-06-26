const express = require("express");
const authMiddleware = require("../middlewares/middleware");
const {
  signUp,
  signIn,
  updateUser,
  findBulk,
  getProfile,
  me, // Import the new controller function
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/", authMiddleware, updateUser);
router.get("/bulk", findBulk);
router.get("/profile", authMiddleware, getProfile);
router.get("/me", authMiddleware, me); // Add the new route

module.exports = router;
