// Jwt secret and production const
import { secret, production } from '../../config/const.js';

// Socket
import { verifySignIn, isSocketIdConnected } from '../../utils/socket.js';

// For random strings
import cryptoRandomString from 'crypto-random-string';

// Models for database actions
import { User } from '../../models/user.js';

// Email
import { sendSignInKey } from '../emails.js';
import * as MailChecker from 'mailchecker';

// Signin
export async function signIn(req, res) {
  try {
    if (req.body.email == null || req.body.password == null || req.body.socketId === null || req.body.lastReq === null)
      return res.status(400).json({
        msg: 'Required data are missing.'
      });
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      if (!MailChecker.isValid(req.body.email))
        return res.status(403).json({
          msg: 'Invalid email.'
        });
      user = new User({
        email: req.body.email,
        key: cryptoRandomString({ length: 6 }),
        lastReq: 0,
        admin: false
      });
      user.password = await user.hashPassword(req.body.password);
    } else {
      let match = await user.compareUserPassword(req.body.password, user.password);
      if (!match)
        return res.status(401).json({
          msg: 'Wrong Login Details.'
        });
    }
    if (req.body.key) {
      if (req.body.key !== user.key)
        return res.status(403).json({
          msg: 'Invalid key.'
        });
      if (user.lastReq === 0 || user.lastReq !== req.body.lastReq) {
        user.key = cryptoRandomString({ length: 6 });
        user.lastReq = 0;
        await user.save();
        return res.status(403).json({
          msg: 'Invalid time.'
        });
      }
      user.key = cryptoRandomString({ length: 6 });
      user.lastReq = 0;
      await user.save();
      let token = await user.generateJwtToken(
        {
          user: {
            _id: user._id,
            email: user.email,
            admin: user.admin
          }
        },
        secret,
        {
          expiresIn: '1d'
        }
      );
      let time = 86400000;
      let end = new Date(Date.now() + time);
      const userCredentials = {
        _id: user._id,
        email: user.email,
        admin: user.admin
      };
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: production === true,
          expires: end,
          maxAge: time,
          sameSite: 'strict'
        })
        .status(200)
        .json({
          userCredentials: userCredentials
        });
    } else {
      user.key = cryptoRandomString({ length: 6 });
      user.lastReq = req.body.lastReq;
      let sent = sendSignInKey(user.email, req.body.socketId, user.key);
      if (!sent)
        return res.status(403).json({
          msg: 'Sending email failed.'
        });
      await user.save();
      res.status(200).json({
        msg: 'Key sent.'
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: 'Problem with the request.'
    });
  }
}

// Check if the email and the key are correct, and emit the socket event to sign in the user
export async function signMeIn(req, res) {
  try {
    if (req.body.email == null || req.body.socketId === null || req.body.key === null)
      return res.status(400).json({
        msg: 'Required data are missing.'
      });
    if (!(await isSocketIdConnected(req.body.socketId)))
      return res.status(401).json({
        msg: 'Client is not connected to the socket, try entering the code manually.'
      });
    let user = await User.findOne({ email: req.body.email, key: req.body.key });
    if (!user)
      return res.status(401).json({
        msg: 'Invalid data.'
      });
    verifySignIn(req.body.socketId, req.body.email, req.body.key);
    res.status(200).json({
      msg: 'Action done.'
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Problem with the request.'
    });
  }
}

// Signout
export async function signOut(req, res) {
  res.clearCookie('access_token').status(200).json({ msg: 'Successfully logged out.' });
}

// Check the user status in the front-end when the app loads
export async function amILogged(req, res) {
  const userCredentials = {
    _id: req.userData._id,
    email: req.userData.email,
    admin: req.userData.admin
  };
  res.status(200).json({
    userCredentials: userCredentials
  });
}

// User get action
export async function userGetAction(req, res) {
  try {
    res.json({
      msg: 'You can see this message because you are authenticated.'
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Problem in the request.'
    });
  }
}

// User post action
export async function userPostAction(req, res) {
  try {
    if (req.body.message == null)
      return res.status(400).json({
        msg: 'Missing data.'
      });
    res.status(200).json({
      msg: req.body.message
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Problem in the request.'
    });
  }
}

// User post action only if the time ends with even minutes
export async function userPostActionABAC(req, res) {
  try {
    if (req.body.message == null)
      return res.status(400).json({
        msg: 'Missing data.'
      });
    const now = new Date();
    const minutes = now.getMinutes();
    if (minutes % 2 !== 0)
      return res.status(403).json({
        msg: 'This endpoint can only be reached in even minutes.'
      });
    res.status(200).json({
      msg: req.body.message
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Problem in the request.'
    });
  }
}
