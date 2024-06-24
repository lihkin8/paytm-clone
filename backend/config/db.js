const mongoose = require("mongoose");

const dbURL = process.env.MONGO_URL;

mongoose
  .connect(dbURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));
