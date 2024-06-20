const User = require("../models/userModel");

const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).send("User Created Successfully!!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signIn = async (req, res) => {
  try {
  } catch (error) {}
};
module.exports = { signUp };
