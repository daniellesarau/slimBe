const express = require("express");
const { joiRegisterSchema, joiLoginSchema } = require("../models/user");
const { current, logout, login, signup } = require("../controllers/auth");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

const authRouter = express.Router();

authRouter.post("/signup", validation(joiRegisterSchema), ctrlWrapper(signup));

authRouter.post("/login", validation(joiLoginSchema), ctrlWrapper(login));

authRouter.get("/logout", ctrlWrapper(auth), ctrlWrapper(logout));

authRouter.get("/current", ctrlWrapper(auth), ctrlWrapper(current));

module.exports = authRouter;
