// models/Prospect.js
const mongoose = require("mongoose");

const ProspectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  date_contacted: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["cold", "warm", "hot"],
    default: "cold",
  },
  source: String,
  notes: String,
  tags: [String],
  last_updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prospect", ProspectSchema);
