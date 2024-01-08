const { Schema, model } = require("mongoose");

const schemaProduct = Schema(
 {
  categories: {
   type: Array,
   required: true,
  },
  weight: {
   type: Number,
   default: 100,
  },
  title: {
   en: String,
  },
  calories: {
   type: Number,
   default: 100,
  },
  groupBloodNotAllowed: {
   type: Array,
   required: true,
  },
 },
 { versionKey: false, timestamps: true }
);

const Product = model("product", schemaProduct);

module.exports = { Product };
