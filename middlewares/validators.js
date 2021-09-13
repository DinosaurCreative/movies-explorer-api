const { celebrate, Joi } = require('celebrate');

const { linkRegex, emailRegex } = require('../utils/constants');

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

const getMoviesValidation = celebrate({
  body: Joi.object,
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegex),
    trailer: Joi.string().required().pattern(linkRegex),
    thumbnail: Joi.string().required().pattern(linkRegex),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateProfileValidation,
  getMoviesValidation,
  deleteMovieValidation,
  createMovieValidation,
};
