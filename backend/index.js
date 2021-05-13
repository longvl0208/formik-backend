const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const authRoute = require('./routes/auth');
const morganMiddleware = require('./middelware/logger');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = 3002;

const app = express();

const allowedOrigins = ['http://localhost:3000',
  'http://yourapp.com'];

app.use(cors({
  origin(origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not '
          + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(morganMiddleware);
app.get('/health', (req, res) => res.send({ message: 'ok' }));

app.use(authRoute);

const server = app.listen(port, () => {
  console.log(`THM App running on port ${port}.`);
});
module.exports = server;
