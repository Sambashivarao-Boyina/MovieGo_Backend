const Joi = require("joi");

module.exports = Joi.object({
  showId: Joi.string().trim().required(),
  selectedSeats: Joi.array().min(1).max(6).required(),
});
