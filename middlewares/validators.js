const { celebrate, Joi } = require('celebrate');

const { /* linkRegex, */ emailRegex } = require('../utils/constants');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().pattern(emailRegex).required(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateProfileValidation,
};
