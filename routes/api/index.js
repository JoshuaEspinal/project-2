const router = require("express").Router();
const { checkAuth } = require("../../middlewares/authMiddleware");
const userRoutes = require("./userRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/users", userRoutes);
router.use("/reviews", checkAuth, reviewRoutes);

module.exports = router;
