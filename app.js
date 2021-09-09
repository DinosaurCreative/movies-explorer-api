const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const { errors } = require('celebrate');
// const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

// app.use(cors({
//   origin: '*', // temporary solution
//   credentials: true,
// }));

// app.use(cookieParser());
// app.use(helmet());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(requestLogger);

// app.use('*', () => {
//   throw new NotFoundError('Не смотри, я не накрашена!');
// });

// app.use(errors());
// // app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Подключено к порту ${PORT}.`);
});
