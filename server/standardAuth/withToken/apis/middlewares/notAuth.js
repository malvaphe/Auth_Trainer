// Jwt
import jwt from 'jsonwebtoken';
import { secret } from '../../config/const.js';

// Check if a user is not authenticated with jwt
export function notAuth(req, res, next) {
  try {
    // Verify the token of the user
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, secret);
    if (decoded.user)
      return res.status(401).json({
        msg: `You cannot perform this action if you are authenticated.`
      });
  } catch (err) {
    next();
  }
}
