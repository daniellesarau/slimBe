const { createDietary, deleteDietary, getDietary, updateDietary } = require("../services/dietaServices");

const createDailyDiet = async (req, res, next) => {
 const { _id } = req.user;

 const result = await createDietary(_id, req.body);

 res.status(201).json({
  status: "Create",
  code: 201,
  data: {
   result,
  },
 });
};

const deleteDailyDiet = async (req, res, next) => {
 const { productId, date } = req.query;
 const { _id: userId } = req.user;

 const result = await deleteDietary(userId, productId, date);

 res.status(200).json({
  status: "Deleted",
  code: 200,
  message: `Product with id ${productId} deleted`,
  data: {
   result,
  },
 });
};

const getDailyDiet = async (req, res) => {
 const { _id } = req.user;
 const result = await getDietary(_id, req.query);

 if (!result) {
  throw new Error("Dieta not found");
 }

 res.status(200).json({
  status: "OK",
  code: 200,
  data: {
   result: result,
  },
 });
};

const updateDailyDiet = async (req, res, next) => {
 const { id: userId } = req.user;

 const result = await updateDietary(userId, req.body);

 res.status(200).json({
  status: "OK",
  code: 200,
  data: {
   result,
  },
 });
};

module.exports = { createDailyDiet, deleteDailyDiet, getDailyDiet, updateDailyDiet };
