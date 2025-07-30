var Prospect = require("./../../models/prospects.js");
var rootDir = require("./../../util/path.js");
var ObjectId = require("mongoose").Types.ObjectId;
var Owner = require("./../../models/owner.js");
var enums = require("./../../util/enums.js");
const { validationResult } = require("express-validator");
var utility = require("./admin_utility.js");
var admin_controller = require("./admin_controller.js");
var sales = require("./../../util/sales.js");
var server = require("./../../server.js");
const fs = require("fs");
const path = require("path");
const tmpDir = path.join(__dirname, "..","..", "tmp");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");


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



const HandleQuote = async (req, res) => {
  var {
    name,
    email,
    phone,
    address,
    largePanes,
    smallPanes,
    mediumPanes,
    secondStoryPanes,
    screenCount,
    includeInterior,
    deepTrackClean,
    distanceFromHQ
  } = req.body;
  if(!secondStoryPanes){
    secondStoryPanes = "No";
  }
  if(!includeInterior){
    includeInterior = "Exterior Only";
  }
  if(!deepTrackClean){
    deepTrackClean = "No";
  }
  try {
    // 1. Check for existing prospect
    const existing = await Prospect.findOne({ email, name });
    if (!existing) {
      await Prospect.create({
        name,
        email,
        phone,

        address,
        source: "Instant Quote",
        tags: ["quote"],
        status: "warm"
      });
    }

    // 2. Calculate pricing
    const basePrice =
      largePanes * 10 +
      smallPanes * 4 +
      mediumPanes * 6 +
      secondStoryPanes * 8 +
      screenCount * 3 +
      (includeInterior ? 50 : 0) +
      (deepTrackClean ? 30 : 0);

    const extraMiles = Math.max(0, distanceFromHQ - 30);
    const total = basePrice + extraMiles * 5;

    // 3. Generate PDF
    const pdfPath = path.join(tmpDir, `quote_${Date.now()}.pdf`);
    const stream = fs.createWriteStream(pdfPath);

    const doc = new PDFDocument();

    doc.pipe(stream);

    const coverPath = path.join(__dirname, "../../public/assets/images/knight_review_2.png");
    doc.image(coverPath, 0, 0, { width: doc.page.width, height: doc.page.height });
    doc.addPage(); // Add new page for actual content
    doc.fontSize(20).text("Your Window Cleaning Quote", { align: "center" });
    doc.moveDown();


    doc.fontSize(14).text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Address: ${address}`);
    doc.moveDown();

    doc.text("Quote Breakdown:");
    doc.text(`• Large Panes: ${largePanes}`);
    doc.text(`• Small Panes: ${smallPanes}`);
    doc.text(`• Regular Panes: ${mediumPanes}`);
    doc.text(`• Second Story: ${secondStoryPanes}`);
    doc.text(`• Screens: ${screenCount}`);
    if (includeInterior) doc.text(`• Interior Cleaning Included: ${includeInterior}`);
    if (includeInterior) doc.text(`• Deep Cleaning Included: ${deepTrackClean}`);
    // if (extraMiles > 0) doc.text(`• Travel Fee: $${extraMiles * 5}`);
    doc.moveDown();
    // doc.fontSize(18).text(`Total: $${total.toFixed(2)}`, { underline: true });

    doc.end();

    // 4. Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"The Window Knight" <${process.env.SMTP_EMAIL}>`,
      to: [email, process.env.SMTP_EMAIL],
      subject: "Your Window Cleaning Quote ️",
      text: `Hi ${name},\n\nHere is your personalized window cleaning quote.\n\nWe'll follow up shortly, or feel free to reply with questions.\n\n— The Window Knight`,
      attachments: [{ filename: "Your_Quote.pdf", path: pdfPath }],
    };

    await transporter.sendMail(mailOptions);

    // 5. Cleanup & Respond
    setTimeout(() => fs.unlinkSync(pdfPath), 30000); // auto-delete PDF
    res.status(200).json({ success: true, total });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to generate quote" });
  }
};



// ✅ Exports
module.exports = {
  DeleteProspect,
  EditProspect,
  GetProspectPage,
  AddProspect,
  HandleQuote
};
