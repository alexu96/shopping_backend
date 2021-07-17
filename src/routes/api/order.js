const express = require("express");
const router = express.Router();
const Orders = require("../../models/orders");
const auth = require("../../middleware/auth");

router.get("/", auth, async (req, res) => {
  const details = await Orders.find({ id: req.user.id });

  res.send(details);
  console.log(details);
});

module.exports = router;
