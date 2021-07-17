const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    price: {
      type: Number
    },
    image: {
      type: String
    },
    rating: {
      type: Number
    },
    count: {
      type: Number
    },
    review: [
      {
        id: {
          type: String
        },
        review1: {
          type: String
        },
        rating: {
          type: Number
        },
        name: {
          type: String
        },
        gravatar: {
          type: String
        }
      }
    ]
  },

  {
    collection: "items"
  }
);

module.exports = mongoose.model("Items", itemSchema);
