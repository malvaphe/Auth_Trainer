// For a secure and functional server
import http from 'http';
import express from 'express';
import { default as session } from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import MongoStore from 'connect-mongo';

// Database configuration
import * as config from './config/db.js';

// Url for cors, port of the server, const for switching production/development and admin configuration
import { url, port, username, password, sessionSecret, production, mongoDbUrl } from './config/const.js';

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
  session({
    secret: sessionSecret,
    cookie: { path: '/', httpOnly: true, secure: production === true, maxAge: 86400000, sameSite: 'strict' },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: mongoDbUrl })
  }),
  helmet()
);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  let user = await User.findOne({ username: username });

  // If not, create it
  if (!user) {
    let user = new User({
      username,
      admin: true
    });
    user.password = await user.hashPassword(password);
    await user.save();
    console.log('New admin user created.');
  }
  console.log(`Server is running on port ${port}.`);
});
