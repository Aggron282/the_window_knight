const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  coverImage: { type: String }, // store filename or URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema);
