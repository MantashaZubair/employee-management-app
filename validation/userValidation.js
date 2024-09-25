const Joi = require("joi");
const userValidationSchema = Joi.object({
  // name: Joi.string().alphanum().min(3).max(30).default(""),
  email: Joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi
    .string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  // department: Joi.string().default("").max(50),
  // salary: Joi.string().default("").max(50),
});

const userUpdateValidationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).default(""),
  phone: Joi
    .string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
    dob:Joi.string().default(""),
    location:Joi.string().default(""),
  // department: Joi.string().default("").max(50),
  // salary: Joi.string().default("").max(50),
}).unknown(true);

module.exports = {userValidationSchema,userUpdateValidationSchema};
