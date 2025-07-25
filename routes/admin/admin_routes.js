var express = require("express");
var router = express.Router();
var path = require("path");
var {check} = require("express-validator")

var rootDir = require("./../../util/path.js")
var adminController = require("./../../controllers/admin/admin_controller.js");
var authController = require("./../../controllers/admin/auth_controller.js");
var laborController = require("./../../controllers/admin/labor_controller.js");
var metaController = require("./../../controllers/admin/meta_controller.js");
var aiController = require("./../../controllers/admin/ai_controller.js");
var prospectController = require("./../../controllers/admin/prospect_controller.js");
var emailerController = require("./../../controllers/admin/email_controller.js");

var userToOwnerController = require("./../../controllers/admin/user_to_owner_controller.js");
var CheckAuth = require("./../../util/isAuth.js").CheckAuth;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // your folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

// Get Home Page
router.get("/admin",CheckAuth,adminController.GetIndexPage);
// router.get("/admin/toggle=:isCompleted",CheckAuth,adminController.GetIndexPage);
// router.get("/admin/toggle=:isCompleted&prospects_page=:prospect_page",CheckAuth,adminController.GetIndexPage);

// Get Prospect Pages
// router.get("/admin/quotes",CheckAuth,prospectController.GetProspectPage);
// router.get("/admin/quotes/toggle=:isCompleted",CheckAuth,prospectController.GetProspectPage);

// // Get Prospect Data
// router.get('/admin/prospects/all',prospectController.GetAllProspects);
// router.get('/admin/prospects/weekly',prospectController.GetWeeklyProspects);
//
// // Change Prospect Data
// router.post("/admin/prospect/details",CheckAuth,prospectController.AddProspectDetails);
// router.post("/admin/prospect/add",CheckAuth,prospectController.AddProspect);
// router.post("/admin/sales",CheckAuth,prospectController.GetSales);
// router.post("/admin/prospect/status",prospectController.ChangeProspectStatus);
// router.post("/admin/prospect/delete",CheckAuth,prospectController.DeleteProspect);
// router.post("/admin/prospect/completed/",
//     check("miles").isLength({min:1}),
//     check("hours").isLength({min:1}),
//     check("date_completed").isLength({min:1})
// ,CheckAuth,prospectController.CompleteProspectJob);
//
// // Change Page View
// router.post("/admin/prospect/toggle",CheckAuth,prospectController.ToggleProspects);

// // Add Labor Data
// router.post("/admin/laborer/add",CheckAuth,laborController.AddLaborer);
// Auth Routes

router.post("/auth/login",authController.Login);
router.post("/admin/auth/forgot",authController.ForgotKey);
router.get("/admin/blogger",CheckAuth,adminController.GetBlogPage);
router.post("/admin/blogger/ai-generate", CheckAuth, aiController.AIGenerateBlog);
router.post("/admin/prospect/add", CheckAuth, prospectController.AddProspect);
router.get("/admin/prospect/", CheckAuth, prospectController.GetProspectPage);
router.post("/admin/blogger/ai-generate", CheckAuth, aiController.AIGenerateBlog);
router.put("/admin/prospect/:id",prospectController.EditProspect);
router.get("/admin/emailer/", CheckAuth, emailerController.GetEmailerPage);
router.post("/admin/emailer", upload.single("cover"), CheckAuth, emailerController.AddTemplate);
router.put("/admin/emailer/:id",  upload.single("cover"),CheckAuth, emailerController.EditTemplate);

router.post("/admin/emailer/send",CheckAuth, aiController.AIGenerateAndSendEmails);

router.delete("/admin/prospect/:id", prospectController.DeleteProspect);
router.post("/admin/blogger/add", CheckAuth, upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), adminController.PostBlog);

router.post("/admin/blogger/delete/:id",CheckAuth,adminController.PostBlog)

// Get Login Page

router.get("/auth/login",authController.GetLoginPage);

// Meta Routes (Change)
module.exports = router;
