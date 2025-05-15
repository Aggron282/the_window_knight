const express = require('express');
const router = express.Router();
const apiController = require("./../../controllers/api/api_controller.js");


router.get("/review", apiController.GetReviewPage);
router.get("/redeem", apiController.GetRedeemPage);
router.post("/review/send", apiController.SendReview);
router.post("/review/redeem", apiController.Redeem);

module.exports = router;
