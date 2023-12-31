const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const dietaRouter = require("./routes/dieta");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const path = require("path");
const app = express();

require("dotenv").config();
const URL_DB = process.env.URL_DB;
mongoose
 .connect(URL_DB)
 .then(() => {
  console.log("Database connection successful");
 })
 .catch((err) => {
  console.log(`Eroare:${err.message}`);
 });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(formatsLogger));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", authRouter, userRouter);
app.use("/api/products", productsRouter);
app.use("/api/dietarias", dietaRouter);

app.use((_, res, next) => {
 next({ status: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
 res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
