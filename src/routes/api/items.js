const express = require("express");
const router = express.Router();
const Items = require("../../models/items");

router.get("/", async (req, res) => {
  const details = await Items.find({ rating: 5 });
  res.send(details);
});

router.post("/", async (req, res) => {
  const details = await Items.find({ category: req.body.content });
  res.send(details);
  console.log(details);
});

module.exports = router;
