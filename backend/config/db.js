const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.MONGO_URL;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
