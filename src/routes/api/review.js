const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Items = require("../../models/items");
const User = require("../../models/users");

//user reviews
router.put(
  "/",
  [
    auth,
    [
      check("productId", "productId is required").not().isEmpty(),
      check("rating", "rating is required").not().isEmpty(),
      check("review1", "review is required").not().isEmpty()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(500).json({ error: error.array() });
    }
    const { productId, rating, review1 } = req.body;

    try {
      const items = await Items.findOne({ _id: productId });
      console.log(items);

      const user = await User.findOne({ _id: req.user.id });

      console.log(user.name);

      const newRev = {
        id: user.id,
        rating: rating,
        review1: review1,
        name: user.name,
        gravatar: user.avatar
      };

      let Total = 0;

      items.review.map((x) => (Total = Total + x.rating));

      console.log(Total);

      items.rating = (Total / items.count).toFixed(0);
      items.count = items.count + 1;

      items.review.push(newRev);

      items.save();

      res.json(items);
    } catch (err) {
      console.error(err.message);
      return res.send("server error");
    }
  }
);

router.post("/", async (req, res) => {
  try {
    const items = await Items.findOne({ _id: req.body.productId });
    console.log(items.review);

    res.json(items.review);
  } catch (err) {
    console.error(err.message);
    return res.send("server error");
  }
});

module.exports = router;
