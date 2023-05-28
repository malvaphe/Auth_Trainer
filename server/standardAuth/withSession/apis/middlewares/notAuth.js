// Check if a user is not authenticated
export function notAuth(req, res, next) {
  try {
    if (req.session.user)
      return res.status(401).json({
        msg: `You cannot perform this action if you are authenticated.`
      });
    next();
  } catch (err) {
    res.status(500).json({
      msg: `Server error.`
    });
  }
}
