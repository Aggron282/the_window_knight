var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var Owner = require("./../../models/owner.js");
var ObjectId = require("mongoose").Types.ObjectId;
var enums = require("./../../util/enums.js");
var emailer = require("./../../util/emailer.js");

const {validationResult} = require("express-validator");

var utility = require("./admin_utility.js");
var email_sensitive = process.env.SMTP_EMAIL

var AUTHPAGE = path.join(rootDir,"views","admin","login.ejs");

var server = require("./../../server.js");

const { compileFunction } = require("vm");


const Login = async (req, res) => {
  const { key, username } = req.body;
  console.log(key,username)
  try {
    const found_owners = await Owner.find({});


    const found_owner = await Owner.findOne({
      username: { $regex: `^${username.trim()}$`, $options: 'i' },
      secret_key: key.trim()
    });
    console.log(found_owners)
    if (!found_owner) {
      console.log("No owner found with provided credentials.");
      req.session.isAuth = false;
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // Don't mutate _id; just use it
    req.session.isAuth = true;
    req.session.owner = {
      _id: found_owner._id.toString(),
      username: found_owner.username,
      // include other safe fields if needed
    };

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ err: 'Session error' });
      }

      return res.json({ err: null });
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ err: 'Server error' });
  }
};


const ForgotKey = async (req,res) =>{
  var flag = await SetNewKey(false);
  res.json({accepted:flag});

}

const SetNewKey = async (manual) => {

  try{
    var new_key = Math.ceil(Math.random() * 999999999);

    const exec = await Owner.updateOne({email:email_sensitive},{$set:{secret_key:new_key}});

    if(!server.CheckIfCanEmail(manual)){
      console.log("Could not email");
      return;
    }
    if(!exec){
      console.log("Could not email");
      return;
    }

    emailer.SendEmailToOwner(new_key);
    return true;
  }catch(err){
    return false;
    console.log(err);
  }

}


const GetLoginPage = (req,res) =>{
  res.render(AUTHPAGE);
}

module.exports.GetLoginPage = GetLoginPage;
module.exports.Login = Login;
module.exports.ForgotKey = ForgotKey;
