const { User } = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
 const { name, email, password } = req.body;
 await User.findOne({ email });
 const newUser = new User({ name, email });
 newUser.setPassword(password);
 await newUser.save();

 res.status(201).json({
  status: "success",
  code: 201,
  data: {
   user: {
    name,
    email,
   },
  },
 });
};

const login = async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (!user || !user.comparePassword(password)) {
  throw new TypeError();
 }

 let { _id: id, token } = user;

 const payload = {
  id,
 };

 token = jwt.sign(payload, SECRET_KEY);

 await User.findByIdAndUpdate(id, { token }, { expiresIn: "1h" });

 res.status(200).json({
  status: "success",
  code: 200,
  data: {
   token,
   user: {
    email,
    name: user.name,
    userInfo: user.userInfo,
    userDailyCalorieIntake: user.userDailyCalorieIntake,
    userNotRecommendedProducts: user.userNotRecommendedProducts,
   },
  },
 });
};

const current = async (req, res, next) => {
 const user = req.user;

 res.status(200).json({
  status: "Success",
  code: 200,
  data: {
   user: {
    email: user.email,
    name: user.name,
    userInfo: user.userInfo,
    userDailyCalorieIntake: user.userDailyCalorieIntake,
    userNotRecommendedProducts: user.userNotRecommendedProducts,
   },
  },
 });
};

const logout = async (req, res) => {
 const { _id } = req.user;
 await User.findByIdAndUpdate(_id, { token: null });

 res.status(200).json({
  status: "Success!",
 });
};

module.exports = { current, logout, login, signup };
