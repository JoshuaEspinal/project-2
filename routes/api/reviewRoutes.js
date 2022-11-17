const { Review } = require("../../models");

const router = require("express").Router();

// get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ err, msg: "Reviews not found" });
  }
});

// get review by id
router.get("/:reviewId", async (req, res) => {
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.reviewId,
        user_id: req.session.userId,
      },
    });

    if (!review) {
      return res.status(404).json({
        msg: "User doesn't own review with this id",
      });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({
      err,
      msg: "server error",
    });
  }
});

// post new review
router.post("/", async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(500).json({
      err,
      msg: "server error",
    });
  }
});

// put review by id
router.put("./:reviewId", async (req, res) => {
  try {
    const updatedReview = await Review.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.reviewId,
          user_id: req.session.userId,
        },
      }
    );
    if (!updatedReview[0]) {
      return res.status(404).json({
        msg: "the review with this id was not found (for this user)",
      });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete review by id
router.delete("./:reviewId", async (req, res) => {
  try {
    const destroyedReview = await Review.destroy({
      where: {
        id: req.params.reviewId,
        user_id: req.session.userId,
      },
    });
    if (!destroyedReview[0]) {
      return res.status(404).json({
        msg: "the review with this id was not found (for this user)",
      });
    }
    res.status(200).json(destroyedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
