const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate(v) {
      if (v.length < 2 || v.length > 30) {
        throw new Error();// Внести необходимый тип ошибки
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(v) {
        if (!isEmail(v)) {
          throw new Error();// Внести необходимый тип ошибки
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(v) {
        if (v < 2 || v > 30) {
          throw new Error(); // Внести необходимый тип ошибки
        }
      },
      select: false, // протестировать схему без этого поля
    },
  },
}, { versionKey: false });

module.exports = {
  userSchema,
};
