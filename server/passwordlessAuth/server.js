// For a secure and functional server
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Socket
import { socketConnection } from './utils/socket.js';

// For random strings
import cryptoRandomString from 'crypto-random-string';

// Database configuration
import * as config from './config/db.js';

// Url for cors, port of the server, const for switching production/development and admin configuration
import { url, port, email } from './config/const.js';

// APIs list
import apis from './apis/apis.js';

// Models for database actions
import { User } from './models/user.js';

// Middlewares and database config
const app = express();
config.default();
app.use(
  cors({
    origin: url,
    credentials: true,
    methods: ['GET', 'POST']
  }),
  helmet()
);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// APIs route
app.use('/', apis);
app.use('*', function (req, res) {
  res.status(404).json({ msg: 'Invalid API!' });
});

// Error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // Handle CSRF token errors
  res.status(403).json({ msg: 'CSRF protected!' });
});

// Server creation and listening
const httpserver = http.createServer(app);
httpserver.listen(port, async () => {
  // Check if the admin user has already been created
  let user = await User.findOne({ email: email });

  // If not, create it
  if (!user) {
    let user = new User({
      email,
      key: cryptoRandomString({ length: 6 }),
      lastReq: 0,
      admin: true
    });
    await user.save();
    console.log('New admin user created.');
  }
  console.log(`Server is running on port ${port}.`);
});
socketConnection(httpserver);
