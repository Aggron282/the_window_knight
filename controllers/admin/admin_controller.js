var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var mongoose= require("mongoose");
const {validationResult} = require("express-validator");
const { compileFunction } = require("vm");

var ObjectId = mongoose.Types.ObjectId;

var Labor = require("./../../data/labor.js");
var Prospect = require("./../../models/prospects.js");
var Owner = require("./../../models/owner.js");

var prospect_controller = require("./prospect_controller.js");
var sales = require("./../../util/sales.js");

var enums = require("./../../util/enums.js");
var utility = require("./admin_utility.js");

var server = require("./../../server.js");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const auth_config = require('./../../util/nodemailer.js');
require("dotenv").config();
const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);
var utility = require("./admin_utility.js");
var email_sensitive = require("./../../util/sensitive.js").email;

var data = null;

const GetBlogPage = async (req,res)=>{
  res.render(path.join(rootDir,"views","/admin/layout/blog/blog.ejs"),{blogs:null});
}

const GetIndexPage = async (req,res,next) => {

    if(!data){
       data = await utility.renderAllData(req,res);
     }

    var page_counter = 0;

    if(req.params){
      page_counter = req.params.prospects_page ? req.params.prospects_page  : 0;
    }

    var weekly_prospects = await prospect_controller.ReturnWeeklyProspects();
    var page_data = utility.GetPageData(page_counter,7,data.prospects);
    var all_prospects = await  prospect_controller.ReturnAllProspects();
    var params = req.params;

    var toggle_quotes = !params.isCompleted || params.isCompleted == "0" ? 0 : 1;

    data.toggle = toggle_quotes;

    if(page_data){
      data.page_counter = page_data.page_counter;
      data.post_per_page = page_data.posts_per_page;
      data.page_length = page_data.page_length;
      data.next_page = page_data.next_page;
      data.prev_page = page_data.prev_page;
      data.start_counter = page_data.start_counter;
      data.first_page = page_data.first_page;
    }
    data.weekly_sales = sales.GetSales(weekly_prospects);
    data.total_sales = sales.GetSales(all_prospects);

    res.render(path.join(rootDir,"views","/admin/index.ejs"),data);

}

const SubscribeUser = async (req,res) => {
  var data  = req.body;
  var errors = validationResult(req);
  if(!errors.isEmpty()){
    res.json({feedback:true})
    return;
  }
  var prospect = {
    name:data.name,
    message:data.message,
    schedule:null,
    address:null,
    status:0,
    phone_number:data.phone,
    quote:null,
    time_created:new Date(),
    email:data.email
  }

  var findOne = await Prospect.findOne({name:data.name,email:data.email,phone_number:data.phone});
  var feedback = false
  findOne = findOne != null ? true : false

//  if(!findOne){
    var new_prospect = new Prospect(prospect);
    new_prospect.save();
    feedback = true;
    console.log(email_sensitive,new_prospect.email)
    //EmailToSubscriber(new_prospect.name,new_prospect.email, email_sensitive);
  //}

  res.json({feedback:true});

}

function EmailToSubscriber(contact_name,to_email,from_email){
  transport.sendMail({
    to:to_email,
    from:from_email,
    subject:"Thank you for subscribing!",
    html:ReturnEmailHTML(contact_name)
  });
}

function ReturnEmailHTML(contact_name){
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          background-color: #ffffff;
          margin: 20px auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
        }
        .header {
          background-color: #007BFF;
          color: #ffffff;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
        }
        .content {
          padding: 20px;
          color: #333333;
        }
        .content h2 {
          color: #007BFF;
        }
        .footer {
          background-color: #f1f1f1;
          color: #666666;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 8px 8px;
        }
      </style>
    </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Thanks for Subscribing!</h1>
      </div>

      <div class="content">
        <h2>Hello, ${contact_name}!</h2>
        <p>
        Are your windows in need of a little TLC? Look no further! At The Window Knight, we specialize in making every pane sparkle, whether it's in your cozy home or your bustling office.
        </p>
        <p>
        Residential Window Cleaning: Enjoy spotless windows that brighten up your home.
        Commercial Window Cleaning: Impress your clients with gleaming windows in your office space.
        </p>
        <p>
        Specialized Services: From skylights to stained glass, we handle delicate jobs with expertise.
        Let us help you enjoy the view through crystal-clear windows!
        </p>
        <p>
        We look forward to helping you see the world more clearly!
        contact us at 480-822-0511 or email us at marco@thewindowknight.com
        </p>
        <p>

        Best regards,
        Marco Khodr
        Founder
        </p>

    </div>
    <div class="footer">
      <p>© 2025 The Window Knight | The Window Cleaning Experts</p>
    </div>
  </div>
</body>
</html>
`
}

module.exports.SubscribeUser = SubscribeUser;
module.exports.GetIndexPage = GetIndexPage;
module.exports.GetBlogPage = GetBlogPage;
