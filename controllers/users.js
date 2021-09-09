const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const DefaultError = require('../errors/DefaultError');
const NotFoundError = require('../errors/NotFoundError');

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
