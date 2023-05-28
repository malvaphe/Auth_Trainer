// Jwt secret and production const
import { secret, production } from '../../config/const.js';

// Models for database actions
import { User } from '../../models/user.js';

// Signup
export async function signUp(req, res) {
  try {
    if (req.body.username == null || req.body.password == null)
      return res.status(400).json({
        msg: 'Required data are missing.'
      });
    let checkUsername = await User.findOne({ username: req.body.username });
    if (checkUsername)
      return res.status(403).json({
        msg: 'Username already used.'
      });
    let user = new User({
      username: req.body.username,
      admin: false
    });
    user.password = await user.hashPassword(req.body.password);
    await user.save();
    res.status(200).json({
      msg: 'New user created.'
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Problem creating the account.'
    });
  }
}

// Signin
export async function signIn(req, res) {
  try {
    if (req.body.username == null || req.body.password == null)
      return res.status(400).json({
        msg: 'Required data are missing.'
      });
    let user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({
        msg: 'Wrong Login Details.'
      });
    let match = await user.compareUserPassword(req.body.password, user.password);
    if (!match)
      return res.status(401).json({
        msg: 'Wrong Login Details.'
      });
    let token = await user.generateJwtToken(
      {
        user: {
          _id: user._id,
          username: user.username,
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
      username: user.username,
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
    username: req.userData.username,
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
