const express = require("express");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const { joiUserInfoSchema } = require("../models/user");

const { getLoggedUserDietAdvice, getNotLoggedUserDietAdvice } = require("../controllers/dietaLogIn");

const userRouter = express.Router();

userRouter.post("/nutrition-advice", validation(joiUserInfoSchema), ctrlWrapper(getNotLoggedUserDietAdvice));
userRouter.post("/logged-nutrition-advice", validation(joiUserInfoSchema), ctrlWrapper(auth), ctrlWrapper(getLoggedUserDietAdvice));
module.exports = userRouter;
