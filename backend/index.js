const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/db");

app.use(cors());
app.use(express.json());

const mainRouter = require("./routers/index");

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
