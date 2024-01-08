const { listProducts, getByQuery } = require("../services/productServices");

const getAllProducts = async (req, res, next) => {
 try {
  const products = await listProducts();

  res.status(200).json({
   status: "OK",
   code: 200,
   data: {
    resultItems: products.length,
    result: products,
   },
  });
 } catch (error) {
  next(error);
 }
};
const getProductsForQuery = async (req, res, next) => {
 try {
  const { productName } = req.query;

  if (!productName) {
   return res.json({
    status: "success",
    code: 200,
    data: {
     result: [],
    },
   });
  }

  const result = await getByQuery({
   $or: [{ title: { $regex: productName } }],
  });
  res.json({
   status: "success",
   code: 200,
   data: {
    result,
   },
  });
 } catch (error) {
  next(error);
 }
};

module.exports = { getAllProducts, getProductsForQuery };
