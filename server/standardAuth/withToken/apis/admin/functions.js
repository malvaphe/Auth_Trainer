// Admin get action
export async function adminGetAction(req, res) {
  try {
    res.json({
      msg: 'You can see this message because you are an admin.'
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Problem in the request.'
    });
  }
}

// Admin post action
export async function adminPostAction(req, res) {
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
