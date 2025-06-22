var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
const ReviewDiscount = require('../../models/review_discount.js');
const { sendReviewRequestEmail } = require('./../../util/emailer.js');
const Blog = require("./../../models/blog.js");
const GetReviewPage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/api/review.ejs"));
}

const GetRedeemPage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/api/redeem.ejs"));
}

const Redeem = async (req, res) => {
  const { code } = req.body;
  const record = await ReviewDiscount.findOne({ access_code: code });

  if (!record) {
    return res.json({ success: false });
  }

  // Only allow redemption if not already redeemed
  if (!record.date_redeemed) {
    record.date_redeemed = new Date();
    await record.save();
    return res.json({ success: true });
  }

  // Already redeemed
  res.json({ success: false });
};


const SendReview = async (req, res) => {
  const { email } = req.body;
  const code = [...Array(8)].map(() => Math.random().toString(36)[2].toUpperCase()).join('');
  console.log(code)
  try {
    let existing = await ReviewDiscount.findOne({ email });
    if (existing) {
      existing.access_code = code;
      existing.date_redeemed = null;
      await existing.save();
    } else {
      await ReviewDiscount.create({ email, access_code: code });
    }
    console.log(email,code);
    await sendReviewRequestEmail(email, code);

    res.json({ success: true });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to send email" });
  }

}

async function GetBlogs(req,res){
  var all_blogs = await Blog.find({});
  console.log(all_blogs);
  res.json({blogs:all_blogs});
}


module.exports.GetBlogs = GetBlogs;
module.exports.SendReview = SendReview;
module.exports.Redeem = Redeem;
module.exports.GetReviewPage = GetReviewPage;
module.exports.GetRedeemPage = GetRedeemPage;
