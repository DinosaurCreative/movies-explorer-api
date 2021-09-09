const bcrypt = require('bcryptjs');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const DefaultError = require('../errors/DefaultError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('UnknownId'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'UnknownId') {
        return next(new NotFoundError(/* usersIdMissing */));
      } if (err.name === 'CastError') {
        return next(new BadRequestError(/* badValue */));
      }
      return next(new DefaultError(err.message));
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .orFail(new Error('UnknownId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'UnknownId') {
        return next(new NotFoundError(/* usersIdMissing */));
      } if (err.message.includes('nameError')) {
        return next(new BadRequestError(/* nameLengthErr */));
      } if (err.message.includes('emailError')) {
        return next(new BadRequestError(/* emailError */));
      }
      return next(new DefaultError(err.message));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.message.includes('emailError')) {
            return next(new BadRequestError(/* wrongEmail */));
          } if (err.message.includes('linkError')) {
            return next(new BadRequestError(/* badValue */));
          } if (err.code === 11000 && err.name === 'MongoError') {
            return next(new ConflictError(/* emailTaken */));
          } if (err.message.includes('nameError')) {
            return next(new BadRequestError(/* nameLengthErr */));
          } if (err.message.includes('aboutError')) {
            return next(new BadRequestError(/* aboutLengthErr */));
          }
          return next(new DefaultError(err.message));
        });
    }).catch((err) => next(new DefaultError(err.message)));
};
