const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const userRoutes = require('./routes/users');
const { createUserValidation, loginValidation } = require('./middlewares/validators');

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

app.use('/', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
