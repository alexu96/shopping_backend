const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials " }] });
      }
      const ismatch = await bcrypt.compare(password, user.password);

      if (!ismatch) {
        return res.status(400).json({ error: [{ msg: "Invalid password " }] });
      }

      const payload = {
        users: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jsontoken"),
        { expiresIn: 5000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
