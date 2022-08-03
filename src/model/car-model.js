const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
