const { listProducts } = require("../services/productServices");
const { User } = require("../models/user");

const notRecommendedProducts = (products, bloodType) => {
 const notRecommendedProductsList = products
  .filter((product) => product.groupBloodNotAllowed[bloodType] === true)
  .map((product) => product.categories)
  .flat();

 const uniqueProducts = [...new Set(notRecommendedProductsList)];

 return uniqueProducts;
};
const dailyCalorieIntake = (height, age, currentWeight, desiredWeight, bloodType) => {
 const calories = Math.round(10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight));
 return calories;
};

const getLoggedUserDietAdvice = async (req, res) => {
 const { _id } = req.user;
 const { height, age, currentWeight, desiredWeight, bloodType } = req.body.userData;
 const userDailyCalorieIntake = dailyCalorieIntake(height, age, currentWeight, desiredWeight, bloodType);
 const products = await listProducts();
 const userNotRecommendedProducts = notRecommendedProducts(products, bloodType);
 const result = await User.findByIdAndUpdate(
  _id,
  {
   userInfo: { height, age, currentWeight, desiredWeight, bloodType },
   userDailyCalorieIntake,
   userNotRecommendedProducts,
  },
  { new: true }
 );

 res.json({
  status: "success",
  code: 200,
  data: {
   user: {
    userInfo: result.userInfo,
    userDailyCalorieIntake: result.userDailyCalorieIntake,
    userNotRecommendedProducts: result.userNotRecommendedProducts,
   },
  },
 });
};

const getNotLoggedUserDietAdvice = async (req, res) => {
 const { height, age, currentWeight, desiredWeight, bloodType } = req.body.userData;

 const userDailyCalorieIntake = dailyCalorieIntake(height, age, currentWeight, desiredWeight, bloodType);
 const products = await listProducts();

 const userNotRecommendedProducts = notRecommendedProducts(products, bloodType);

 res.json({
  status: "success",
  code: 200,
  data: {
   nutritionAdvice: {
    userDailyCalorieIntake,
    userNotRecommendedProducts,
   },
  },
 });
};
module.exports = { getLoggedUserDietAdvice, getNotLoggedUserDietAdvice };
