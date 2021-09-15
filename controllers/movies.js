const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  ownerRigthsErr,
  movieIdMissing,
  pathMissing,
  badValue,

} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
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
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.message.includes('is required')) {
        const pathName = err.message.split('`')[1];
        return next(new BadRequestError([`${pathMissing} ${pathName}.`]));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(movieIdMissing))
    .then((mov) => {
      if (String(mov.owner) !== req.user._id) {
        throw next(new ForbiddenError(ownerRigthsErr));
      }
      Movie.findByIdAndRemove(req.params.id)
        .then((movie) => res.send({ message: `Фильм "${movie.nameRU}" удален!` }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(badValue));
      }
      return next(err);
    });
};
