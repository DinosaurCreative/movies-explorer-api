const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const { PORT = 3001, MONGO_DB, NODE_ENV } = dotenv.config().parsed;
console.log(MONGO_DB)
const app = express();
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const rootRouter = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataBaseAdress } = require('./utils/config');
const { connected, notConnected, wrongPath } = require('./utils/constants');
const auth = require('./middlewares/auth');

app.use(cors);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : dataBaseAdress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(connected))
  .catch(() => console.log(notConnected));

app.use(requestLogger);
app.use(limiter);
app.use('/', rootRouter);

app.use('*', auth, () => {
  throw new NotFoundError(wrongPath);
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
