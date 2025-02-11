const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string().trim().required().max(20),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).max(20).required(),
    phone:Joi.string().pattern(/^[0-9]{10}$/).required().messages({"string.pattern.base":"Phone number must me 10 digits"})
})