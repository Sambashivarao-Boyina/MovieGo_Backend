const Joi = require("joi");

module.exports = Joi.object({
    movie: Joi.string().alphanum().trim().required(),
    theater: Joi.string().alphanum().trim().required(),
    screen: Joi.string().alphanum().trim().required(),
    date: Joi.string().trim().required(),
    showTime: Joi.string().trim().required()
})