var Prospect = require("./../../models/prospects.js");
var path = require("path");
var rootDir = require("./../../util/path.js");
var ObjectId = require("mongoose").Types.ObjectId;
var Owner = require("./../../models/owner.js");
var enums = require("./../../util/enums.js");
const { validationResult } = require("express-validator");
var utility = require("./admin_utility.js");
var admin_controller = require("./admin_controller.js");
var sales = require("./../../util/sales.js");
var server = require("./../../server.js");

// 📝 Edit an existing prospect
async function EditProspect(req, res) {
  try {
    const updated = await Prospect.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.json({ success: false, message: "Prospect not found." });
    res.json({ success: true });
  } catch (err) {
    console.error("Edit Prospect Error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// ➕ Add a new prospect
const AddProspect = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      source,
      notes,
      tags,
      status = "cold",
    } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Name is required." });

    const newProspect = new Prospect({
      name,
      email,
      phone,
      address,
      source,
      notes,
      tags,
      status,
    });

    await newProspect.save();
    res.json({ success: true, message: "Prospect added!", data: newProspect });
  } catch (err) {
    console.error("Add Prospect Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📄 Load the prospect dashboard page
async function GetProspectPage(req, res) {
  try {
    const prospects = await Prospect.find();
    res.render(path.join(rootDir, "views", "/admin/prospect_page.ejs"), { prospects });
  } catch (err) {
    console.error("Get Prospect Page Error:", err);
    res.status(500).send("Error loading page");
  }
}

// ❌ Delete a prospect by ID
async function DeleteProspect(req, res) {
  try {
    await Prospect.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete Prospect Error:", err);
    res.status(500).json({ success: false, message: "Delete failed." });
  }
}




// ✅ Exports
module.exports = {
  DeleteProspect,
  EditProspect,
  GetProspectPage,
  AddProspect
};
