// Check if a user is an admin
export async function admin(req, res, next) {
  try {
    if (!req.userData.admin)
      return res.status(401).json({
        msg: 'Not authorized.'
      });
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Not authorized.'
    });
  }
}
