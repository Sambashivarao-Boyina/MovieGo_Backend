const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().trim().max(20).required(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({ "string.pattern.base": "Phone Number must be 10 digits" }),
  address: Joi.string().trim().required().max(100),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().max(50).required(),
  pincode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({ "string.pattern.base": "Pincode must be 6 digits" }),
  longitude: Joi.number().required("Coordinates Required"),
  latitude: Joi.number().required("Coordinates required")
});
