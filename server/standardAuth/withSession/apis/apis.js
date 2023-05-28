// Express router
import express from 'express';
const router = express.Router();

// Csrf protection
import { csrfSync } from 'csrf-sync';
const { generateToken, csrfSynchronisedProtection } = csrfSync();

// Middlewares
import { auth } from './middlewares/auth.js';
import { notAuth } from './middlewares/notAuth.js';
import { admin } from './middlewares/admin.js';

// User functions
import {
  signUp,
  signIn,
  signOut,
  amILogged,
  userGetAction,
  userPostAction,
  userPostActionABAC
} from './user/functions.js';

// Admin functions
import { adminGetAction, adminPostAction } from './admin/functions.js';

// User utilities
router.post('/signup', notAuth, signUp); // needs username, password
router.post('/signin', notAuth, signIn); // needs username, password
router.get('/signout', auth, signOut);
router.get('/amilogged', auth, amILogged);
router.get('/usergetaction', auth, userGetAction);
router.post('/userpostaction', auth, csrfSynchronisedProtection, userPostAction); // needs messagge
router.post('/userpostactionabac', auth, csrfSynchronisedProtection, userPostActionABAC); // needs messagge
router.get('/getcsrftoken', auth, (req, res) => {
  const CSRFToken = generateToken(req, true);
  res.status(200).json({ CSRFToken });
});

// Admin utilities
router.get('/admingetaction', auth, admin, adminGetAction);
router.post('/adminpostaction', auth, admin, csrfSynchronisedProtection, adminPostAction); // needs messagge

export default router;
