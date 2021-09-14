const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'nameMissing'],
    validate(v) {
      if (v.length < 2 || v.length > 30) {
        throw new Error('nameError');
      }
    },
  },
  email: {
    type: String,
    required: [true, 'emailMissing'],
    unique: [true, 'emailError'],
    validate(v) {
      if (!isEmail(v)) {
        throw new Error('emailError');
      }
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('invailidEmailOrPassword'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('invailidEmailOrPassword'));
          }
          return user;
        });
    });
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
