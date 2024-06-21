const User = require("../models/userModel");
const Account = require("../models/accountModel");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/config");

const signUpSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

const signUp = async (req, res) => {
  const { success, error } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: "Incorrect Inputs" });
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({ message: "User created successfully!", token: token });
};

const signIn = async (req, res) => {
  const { success, error } = signInSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: "Incorrect Inputs" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token: token });
  } else {
    res.status(400).json({ error: "Error while logging in" });
  }
};

const updateUser = async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error: "Error while updating information" });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({ message: "Updated successfully" });
};

const findBulk = async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
    })),
  });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ authenticated: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signUp, signIn, updateUser, findBulk, getProfile, me };
