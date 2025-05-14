const express = require('express');
const router = express.Router();
const apiController = require("./../../controllers/api/apiController.js");


router.get("/review", apiController.GetReviewPage);
router.post("/send-review", apiController.SendReview);e
router.post("/redeem", apiController.Redeem);

module.exports = router;
