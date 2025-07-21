const EmailTemplate = require("../../models/email_template.js");
var Prospect = require("./../../models/prospects.js");

const path = require("path");
const rootDir = require("./../../util/path.js");

require("dotenv").config();

exports.GetEmailerPage = async (req, res) => {
  var templates = await EmailTemplate.find({});
  const prospects = await Prospect.find();
  res.render(path.join(rootDir, "views", "/admin/emailer.ejs"), { templates: templates, prospects:prospects });
};


exports.GetTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: templates });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching templates" });
  }
};

exports.AddTemplate = async (req, res) => {
  console.log(req.body)
  try {
    const { title, subject, body } = req.body;
    const coverImage = req.file?.filename;
    console.log(coverImage,title,subject,body)
    const template = new EmailTemplate({ title, subject, body, coverImage });
    await template.save();
    res.json({ success: true, data: template });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding template" });
  }
};

exports.EditTemplate = async (req, res) => {
  try {
    const { title, subject, body } = req.body;
    const update = { title, subject, body };
    if (req.file?.filename) update.coverImage = req.file.filename;

    const updated = await EmailTemplate.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating template" });
  }
};

exports.DeleteTemplate = async (req, res) => {
  try {
    await EmailTemplate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting template" });
  }
};
