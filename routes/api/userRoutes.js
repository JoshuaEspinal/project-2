const router = require("express").Router();
const User = require("../../models/User");

// POST /api/users - makes a new user
router.post("/", async (req, res) => {
  // get user data from the req.body
  const { username, password } = req.body;
  // create a new user
  const user = await User.create({
    username,
    password,
  });
  // add user info to the session
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    res.json(user);
  });
});

module.exports = router;
