var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
const Code = require('../models/Code');
const { sendReviewRequestEmail } = require('../utils/emailer');

const GetReviewPage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/api/review_home.ejs"));
}

const Redeem = async (req,res)=> {
    const { code } = req.body;
    const record = await Code.findOne({ access_code: code });

    if (record && !record.date_redeemed) {
      record.date_redeemed = new Date();
      await record.save();
      return res.json({ success: true });
    }

    res.json({ success: false });
}

const SendReview = async (req, res) => {
  const { email } = req.body;
  const code = [...Array(8)].map(() => Math.random().toString(36)[2].toUpperCase()).join('');

  try {
    let existing = await Code.findOne({ email });
    if (existing) {
      existing.access_code = code;
      existing.date_redeemed = null;
      await existing.save();
    } else {
      await Code.create({ email, access_code: code });
    }

    await sendReviewRequestEmail(email, code);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
  
}

module.exports.SendReview = SendReview;
module.exports.Redeem = Redeem;
module.exports.GetReviewPage = GetReviewPage;
