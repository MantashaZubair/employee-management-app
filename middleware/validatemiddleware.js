const validateSchema = (schema) => (req, res, next) => {
 console.log(req.body)
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error)
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = { validateSchema };