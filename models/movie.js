const mongoose = require('mongoose');
const { isURL } = require('validator');
const BadRequestError = require('../errors/BadRequestError');
const {
  badUrlErr,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validat(v) {
      if (!isURL(v)) {
        throw new BadRequestError(badUrlErr);
      }
    },
  },
  trailer: {
    type: String,
    required: true,
    validat(v) {
      if (!isURL(v)) {
        throw new BadRequestError(badUrlErr);
      }
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validat(v) {
      if (!isURL(v)) {
        throw new BadRequestError(badUrlErr);
      }
    },
  },
  movieId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
