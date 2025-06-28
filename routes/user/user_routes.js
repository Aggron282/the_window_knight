var express = require("express");
var router = express.Router();
var path = require("path");
const {check,body} = require("express-validator");

var userController = require("./../../controllers/user/userController.js")
var adminController = require("./../../controllers/admin/admin_controller.js")

var userToOwnerController = require("./../../controllers/admin/user_to_owner_controller.js")
var rootDir = require("./../../util/path.js")

// Get Home Page
router.get("/",userController.GetHomePage);
// Get About Page
router.get("/about",userController.GetAboutUsPage);

// Get Schedule Page
router.get("/schedule",userController.GetSchedulePage);

// Get Contact Page
router.get("/contact_us",userController.GetContactUsPage);

// User Posts to Admin
router.post("/admin/subscribe",check("email").isEmail().normalizeEmail(),userToOwnerController.Subscribe)
router.get("/blogs",userController.GetBlogPage);
router.get("/blog/:_id",userController.GetBlogDetailPage);

router.post("/api/subscribe",
check("name").isLength({min:1}),
check("phone").isLength({min:4}),
check("email").isEmail().normalizeEmail()
,adminController.SubscribeUser)

// Exit Modals
router.post("/exit",userController.ExitOutOfModal);

module.exports = router;
