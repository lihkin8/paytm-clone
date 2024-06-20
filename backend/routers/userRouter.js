const express = require("express");
const authMiddleware = require("../middlewares/middleware");
const {
  signUp,
  signIn,
  updateUser,
  findBulk,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/", authMiddleware, updateUser);
router.get("/bulk", findBulk);

module.exports = router;
