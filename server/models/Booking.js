
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true
  },
  tickets: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);

