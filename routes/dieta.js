const express = require("express");
const { joiDietaryDateSchema, joiDietaryUpdateDateSchema, joiGetDateSchema } = require("../models/dieta");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");
const { createDailyDiet, deleteDailyDiet, getDailyDiet, updateDailyDiet } = require("../controllers/dieta");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

const dietaRouter = express.Router();

dietaRouter.get("/", ctrlWrapper(auth), validation(joiGetDateSchema), ctrlWrapper(getDailyDiet));
dietaRouter.post(
 "/",
 (req, res, next) => {
  next();
 },
 ctrlWrapper(auth),
 validation(joiDietaryDateSchema),
 ctrlWrapper(createDailyDiet)
);

dietaRouter.patch("/", ctrlWrapper(auth), validation(joiDietaryUpdateDateSchema), ctrlWrapper(updateDailyDiet));

dietaRouter.delete("/", ctrlWrapper(auth), ctrlWrapper(deleteDailyDiet));

module.exports = dietaRouter;
