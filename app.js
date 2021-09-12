const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const rateLimit = require('express-rate-limit');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login, signOut } = require('./controllers/users');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const { createUserValidation, loginValidation } = require('./middlewares/validators');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Successfully Connected to DB'))
  .catch(() => console.log('Connection to DB Failed'));

app.use(limiter);
app.use(requestLogger);
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);
app.delete('/signout', signOut);

app.use('/', userRoutes);
app.use('/', movieRoutes);

app.use('*', () => {
  throw new NotFoundError('Не смотри, я не накрашена!');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
