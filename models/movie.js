const mongoose = require('mongoose');
const { isURL } = require('validator');

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
        throw new Error('linkError'); // Внести необходимый тип ошибки
      }
    },
  },
  trailer: {
    type: String,
    required: true,
    validat(v) {
      if (!isURL(v)) {
        throw new Error('linkError'); // Внести необходимый тип ошибки
      }
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validat(v) {
      if (!isURL(v)) {
        throw new Error('linkError'); // Внести необходимый тип ошибки
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
