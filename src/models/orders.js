const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  Total: {
    type: String,
    required: true
  },
  Items: [
    {
      _id: {
        type: String
      },
      Qty: {
        type: String
      },
      image: {
        type: String
      },
      name: {
        type: String
      },
      price: {
        type: String
      }
    }
  ],

  name: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  }
});

module.exports = mongoose.model("Orders", OrdersSchema);
