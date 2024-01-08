const { Product } = require("../models/product");

const listProducts = async () => {
 try {
  return await Product.find().lean();
 } catch (error) {
  throw new Error(`Error in listProducts: ${error.message}`);
 }
};

const getByQuery = async (filter) => {
 try {
  return await Product.find(filter).lean();
 } catch (error) {
  throw new Error(`Error in getByQuery: ${error.message}`);
 }
};

module.exports = {
 listProducts,
 getByQuery,
};
