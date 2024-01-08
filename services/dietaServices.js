const { Dietary } = require("../models/dieta");

const createDietary = async (_id, payload) => {
 const { date, products = [] } = payload;

 const dietaryExist = await Dietary.findOne({ owner: _id }).where("date").equals(date).populate("owner", "name email").populate({
  path: "products.product",
  select: "title calories",
 });

 if (dietaryExist) {
  throw new Error("Dietary already exists");
 }

 return await Dietary.create({ owner: _id, date, products });
};

const deleteDietary = async (_id, productId, date) => {
 const res = await Dietary.findOneAndUpdate({ date: date, owner: _id }, { $pull: { products: { _id: productId } } }, { new: true })
  .populate("owner", "name email")
  .populate({
   path: "products.product",
   select: "title calories",
  });

 if (res === null) {
  throw new Error("Wrong date");
 }
 return res;
};

const getDietary = async (_id, payload) => {
 const { date } = payload;

 const dietary = await Dietary.findOne({
  owner: _id,
  date: date,
 })
  .populate("owner", "_id name email")
  .populate({
   path: "products.product",
   select: "title calories",
  });

 return dietary;
};

const updateDietary = async (userId, payload) => {
 const { date, data } = payload;
 const { product: _id, weightGrm } = data;

 let products = null;

 const dayInfo = await Dietary.findOne({
  owner: userId,
  date: date,
 });

 if (dayInfo) {
  const checkedProduct = dayInfo.products.find((obj) => obj.product.valueOf() === _id);

  if (!checkedProduct) {
   products = await Dietary.findOneAndUpdate(
    {
     owner: userId,
     date: date,
    },
    {
     $push: {
      products: data,
     },
    },
    { new: true }
   )
    .populate("owner", "name email")
    .populate({
     path: "products.product",
     select: "title calories",
    });
   return products;
  } else {
   checkedProduct.weightGrm += weightGrm;
  }

  await dayInfo.save();
  products = await Dietary.findOne(dayInfo).populate("owner", "name email").populate({
   path: "products.product",
   select: "title calories",
  });
 } else {
  throw new Error("Wrong date");
 }

 return products;
};

module.exports = { createDietary, deleteDietary, getDietary, updateDietary };
