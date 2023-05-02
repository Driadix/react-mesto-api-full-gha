const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressRateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DATABASE_URL } = require('./config');
const routes = require('./routes/index');

const app = express();

const expressLimiter = expressRateLimit({
  windowMs: 20 * 60 * 1000,
  max: 120,
});

mongoose
  .connect(DATABASE_URL)
  // eslint-disable-next-line no-console
  .then(() => console.log('Успешное подключение к БД'))
  // eslint-disable-next-line no-console
  .catch(() => console.log('Ошибка подключения к базе данных'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLimiter);
app.use(cors());
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
