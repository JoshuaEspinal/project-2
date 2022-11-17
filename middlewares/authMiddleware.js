const checkAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.status(500).json({
      msg: "You must sign in to use this resource.",
    });
  }
  next();
};

module.exports = {
  checkAuth,
};
