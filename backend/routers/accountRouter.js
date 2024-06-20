const express = require("express");
const authMiddleware = require("../middlewares/middleware");
const { getBalance, transfer } = require("../controllers/accountController");

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/transfer", authMiddleware, transfer);

module.exports = router;
