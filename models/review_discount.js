const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  access_code: { type: String, required: true, unique: true },
  date_redeemed: { type: Date, default: null },
  didEarned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("ReviewDiscount", codeSchema);
