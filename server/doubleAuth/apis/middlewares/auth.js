// Jwt
import jwt from 'jsonwebtoken';
import { secret } from '../../config/const.js';

// Check if a user is authenticated with jwt
export function auth(req, res, next) {
  try {
    // Verify the token of the user
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, secret);
    req.userData = decoded.user;
    next();
  } catch (err) {
    res.clearCookie('access_token').status(401).json({
      msg: `Sign in to continue.`
    });
  }
}
