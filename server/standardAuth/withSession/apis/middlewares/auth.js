// Check if a user is authenticated
export function auth(req, res, next) {
  try {
    if (!req.session.user)
      return res.status(401).json({
        msg: `Sign in to continue.`
      });
    req.userData = req.session.user;
    next();
  } catch (err) {
    res.status(500).json({
      msg: `Server error.`
    });
  }
}
