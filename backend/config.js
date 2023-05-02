require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;

module.exports = {
  PORT,
  DATABASE_URL,
  NODE_ENV,
  JWT_SECRET,
};
