const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login, signOut } = require('./controllers/users');
const userRoutes = require('./routes/users');
const { createUserValidation, loginValidation } = require('./middlewares/validators');
const NotFoundError = require('./errors/NotFoundError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('successfully connected');
  })
  .catch(() => {
    console.log('not connected');
  });

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);
app.delete('/signout', signOut);

app.use('/', userRoutes);

app.use('*', () => {
  throw new NotFoundError('Не смотри, я не накрашена!');
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
