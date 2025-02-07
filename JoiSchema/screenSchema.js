const Joi = require("joi");

module.exports = Joi.object({
    screenName: Joi.string().trim().max(20).required(),
    screenType: Joi.string().trim().max(20).required(),
    soundType: Joi.string().trim().max(20).required()
})