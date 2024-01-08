const express = require("express");
const { getAllProducts, getProductsForQuery } = require("../controllers/products");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const productsRouter = express.Router();

productsRouter.get("/", ctrlWrapper(getAllProducts));

productsRouter.get("/search", ctrlWrapper(getProductsForQuery));

module.exports = productsRouter;
