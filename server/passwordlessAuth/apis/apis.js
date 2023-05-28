// Production const
import { production, csrfSecret } from '../config/const.js';

// Express router
import express from 'express';
const router = express.Router();

// Csrf protection
import { doubleCsrf } from 'csrf-csrf';
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => csrfSecret,
  cookieName: production ? '__Host-psifi.x-csrf-token' : 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: production === true
  },
  getTokenFromRequest: (req) => req.headers['x-csrf-token']
});

// Middlewares
import { auth } from './middlewares/auth.js';
import { notAuth } from './middlewares/notAuth.js';
import { admin } from './middlewares/admin.js';

// User functions
import {
  signIn,
  signMeIn,
  signOut,
  amILogged,
  userGetAction,
  userPostAction,
  userPostActionABAC
} from './user/functions.js';

// Admin functions
import { adminGetAction, adminPostAction } from './admin/functions.js';

// User utilities
router.post('/signin', notAuth, signIn); // needs email, socketId, lastReq, (key)
router.post('/signmein', signMeIn); // needs email, socketId, key
router.get('/signout', auth, signOut);
router.get('/amilogged', auth, amILogged);
router.get('/usergetaction', auth, userGetAction);
router.post('/userpostaction', auth, doubleCsrfProtection, userPostAction); // needs messagge
router.post('/userpostactionabac', auth, doubleCsrfProtection, userPostActionABAC); // needs messagge
router.get('/getcsrftoken', auth, (req, res) => {
  const CSRFToken = generateToken(res);
  res.status(200).json({ CSRFToken });
});

// Admin utilities
router.get('/admingetaction', auth, admin, adminGetAction);
router.post('/adminpostaction', auth, admin, doubleCsrfProtection, adminPostAction); // needs messagge

export default router;
