const Joi = require("joi");

module.exports = Joi.object({
    title: Joi.string().trim().max(50).required(),
    duration: Joi.number().min(30).max(240).required(),
    language: Joi.string().trim().required()
})