require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressRateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

const expressLimiter = expressRateLimit({
  windowMs: 20 * 60 * 1000,
  max: 120,
});

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  // eslint-disable-next-line no-console
  .then(() => console.log('Успешное подключение к БД'))
  // eslint-disable-next-line no-console
  .catch(() => console.log('Ошибка подключения к базе данных'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLimiter);
app.use(helmet());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Успешно запущен на порте ${PORT}`);
});
