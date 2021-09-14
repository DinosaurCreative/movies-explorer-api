const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const DefaultError = require('../errors/DefaultError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;
const {
  usersIdMissing,
  badValue,
  wrongEmail,
  emailTaken,
  nameLengthErr,
  badEmailOrPass,
  nameMissing,
} = require('../utils/constants');
const { devSecretKey } = require('../utils/config');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('UnknownId'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'UnknownId') {
        return next(new NotFoundError(usersIdMissing));
      } if (err.name === 'CastError') {
        return next(new BadRequestError(badValue));
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
        return next(new NotFoundError(usersIdMissing));
      } if (err.message.includes('nameError')) {
        return next(new BadRequestError(nameLengthErr));
      } if (err.message.includes('emailError')) {
        return next(new BadRequestError(wrongEmail));
      } if (err.code === 11000) {
        return next(new ConflictError(emailTaken));
      }
      return next(new DefaultError(err.message, 321));
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
            return next(new BadRequestError(wrongEmail));
          } if (err.message.includes('linkError')) {
            return next(new BadRequestError(badValue));
          } if (err.code === 11000 || err.name === 'MongoError') {
            return next(new ConflictError(emailTaken));
          } if (err.message.includes('nameError')) {
            return next(new BadRequestError(nameLengthErr));
          } if (err.message.includes('nameMissing')) {
            return next(new BadRequestError(nameMissing));
          }
          return next(new DefaultError(err.message));
        });
    }).catch((err) => {
      next(new DefaultError(err.message));
    });
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;
  console.log(NODE_ENV);
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devSecretKey, { expiresIn: '7d' });
      res.cookie('_id', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Авторизация успешна' });
    })
    .catch((err) => {
      if (err.message === 'invailidEmailOrPassword') {
        return next(new UnauthorizedError(badEmailOrPass));
      } if (err.message.includes('emailError')) {
        return next(new BadRequestError(badEmailOrPass));
      }
      return next(new DefaultError(err.message));
    });
};

module.exports.signOut = (req, res, next) => {
  res.clearCookie('_id').send({ message: 'Куки удалены' });
  next();
};
