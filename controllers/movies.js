const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const DefaultError = require('../errors/DefaultError');
const NotFoundError = require('../errors/NotFoundError');

const {
  movieIdMissing,
  badValue,
} = require('../utils/errorMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      next(new DefaultError(err.message));
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      next(new DefaultError(err.message));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .orFail(new Error('UnknownId'))
    .then((mov) => {
      res.send({ message: `Фильм "${mov.name}" удален!` });
    })
    .catch((err) => {
      if (err.message === 'UnknownId') {
        next(new NotFoundError(movieIdMissing));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(badValue));
      } else {
        next(new DefaultError(err.message));
      }
    });
};
