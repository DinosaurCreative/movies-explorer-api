const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const rootRouter = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataBaseAdress } = require('./utils/config');

app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dataBaseAdress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Successfully Connected to DB'))
  .catch(() => console.log('Connection to DB Failed'));

app.use(limiter);
app.use(requestLogger);
app.use('/', rootRouter);

app.use('*', () => {
  throw new NotFoundError('Не смотри, я не накрашена!');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
