const validation = (schema) => {
 return (req, res, next) => {
  const { error } = Object.keys(req.query).length !== 0 ? schema.validate(req.query) : schema.validate(req.body);

  if (error) {
   return res.status(400).json({
    status: "error",
    code: 400,
    message: error.details[0].message,
   });
  }

  next();
 };
};

module.exports = validation;
