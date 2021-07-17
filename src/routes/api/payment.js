const stripe = require("stripe")(
  "sk_test_51HjQ7JAoMEVTNNOCbmAdjFSVADFrKSoHnTOeLSe023Do3U1lqD0RTZIlKynShPxTKL13ZKTiPHlRhF7nsZ3PYKb500WArfVkqX"
);
const express = require("express");
const router = express.Router();
const Orders = require("../../models/orders");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  console.log("payment request..");
  const token = req.body.data; // Using Express
  //Charge the user's card:
  console.log(token);
  const charge = stripe.charges.create(
    {
      amount: req.body.Total,
      currency: "inr",
      description: "test charge",
      source: token
    },
    (err, charge) => {
      if (err) {
        res.send("Payment failed");
      } else {
        console.log("success payment");
        res.send("success");

        const { id, Total, name, phone, address } = req.body;

        const orders = new Orders({
          id: req.user.id,
          Total: Total,
          Items: req.body.Items,
          name: name,
          phone: phone,
          address: address
        });

        orders.save();

        res.json(Orders);
      }
    }
  );
});

module.exports = router;
