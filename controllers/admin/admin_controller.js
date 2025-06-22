const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const rootDir = require("./../../util/path.js");
const ObjectId = mongoose.Types.ObjectId;

const Labor = require("./../../data/labor.js");
const Prospect = require("./../../models/prospects.js");
const Owner = require("./../../models/owner.js");
const prospect_controller = require("./prospect_controller.js");
const sales = require("./../../util/sales.js");
const enums = require("./../../util/enums.js");
const utility = require("./admin_utility.js");
const email_sensitive = require("./../../util/sensitive.js").email;
const server = require("./../../server.js");

require("dotenv").config();

const nodemailer = require("nodemailer");

// ✨ Basic SMTP Transport (Gmail, Zoho, Outlook, or custom domain)
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",       // e.g., smtp.gmail.com or your domain host
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,    // e.g., marco@thewindowknight.com
    pass: process.env.SMTP_PASSWORD     // app password or regular password
  },
  tls: {
    rejectUnauthorized: false
  }
});

let data = null;

// GET: Blog Page
const GetBlogPage = async (req, res) => {
  res.render(path.join(rootDir, "views", "/admin/layout/blog/blog.ejs"), { blogs: null });
};

// GET: Admin Dashboard
const GetIndexPage = async (req, res, next) => {
  if (!data) {
    data = await utility.renderAllData(req, res);
  }

  let page_counter = req.params?.prospects_page || 0;

  const weekly_prospects = await prospect_controller.ReturnWeeklyProspects();
  const all_prospects = await prospect_controller.ReturnAllProspects();
  const page_data = utility.GetPageData(page_counter, 7, data.prospects);

  const toggle_quotes = !req.params?.isCompleted || req.params.isCompleted == "0" ? 0 : 1;
  data.toggle = toggle_quotes;

  if (page_data) {
    Object.assign(data, {
      page_counter: page_data.page_counter,
      post_per_page: page_data.posts_per_page,
      page_length: page_data.page_length,
      next_page: page_data.next_page,
      prev_page: page_data.prev_page,
      start_counter: page_data.start_counter,
      first_page: page_data.first_page
    });
  }

  data.weekly_sales = sales.GetSales(weekly_prospects);
  data.total_sales = sales.GetSales(all_prospects);

  res.render(path.join(rootDir, "views", "/admin/index.ejs"), data);
};

// POST: Subscribe User
const SubscribeUser = async (req, res) => {
  const data = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ feedback: true });
  }

  const prospectData = {
    name: data.name,
    message: data.message,
    schedule: null,
    address: null,
    status: 0,
    phone_number: data.phone,
    quote: null,
    time_created: new Date(),
    email: data.email,
    subscribe_counter: 0
  };

  let feedback = false;
  let prospectRecord = await Prospect.findOne({
    name: data.name,
    email: data.email,
    phone_number: data.phone
  });

  if (!prospectRecord) {
    prospectRecord = new Prospect(prospectData);
    await prospectRecord.save();
    feedback = true;
    console.log(email_sensitive, prospectRecord.email);
  } else {
    await Prospect.updateOne(
      { _id: prospectRecord._id },
      { $inc: { subscribe_counter: 1 }, $set: { time_created: new Date() } }
    );
  }

  EmailToSubscriber(prospectRecord.name, prospectRecord.email, email_sensitive);
  console.log(prospectRecord);
  res.json({ feedback: true, prospect: prospectRecord });
};

// POST: Blog
const Blog = require('../../models/blog');

const PostBlog = async (req, res) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files);

  try {
    const { title, subtitle, author, html } = req.body;
    const coverImage = req.files?.cover?.[0] || req.file;
    const galleryImages = req.files?.gallery || [];

    if (!title || !subtitle || !author || !html || !coverImage) {
      return res.json({ success: false, message: "Missing required fields." });
    }

    const blog = new Blog({
      title,
      subtitle,
      author,
      html,
      body: html.replace(/(<([^>]+)>)/gi, "").slice(0, 150),
      coverImage: coverImage.filename,
      gallery: galleryImages.map(file => file.filename),
      date_submitted: new Date()
    });

    await blog.save();

    res.json({ success: true, message: "Blog posted successfully!" });
  } catch (err) {
    console.error("PostBlog error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Send Thank-You Email
function EmailToSubscriber(contact_name, to_email, from_email) {
  console.log(contact_name, to_email, from_email);
  try {
    transport.sendMail({
      to: to_email,
      from: from_email,
      subject: "Thank you for subscribing!",
      html: ReturnEmailHTML(contact_name)
    });
  } catch (err) {
    console.error("Email send error:", err);
  }
}

// Email Template HTML
function ReturnEmailHTML(contact_name) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Roboto, Arial, sans-serif;
          background-color: #f0f4f8;
          margin: 0;
          padding: 0;
        }

        .email-container {
          border:5px solid #007BFF;
          max-width: 1300px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
          overflow: hidden;
        }

        .header {
          background-color: #007BFF;
          color: #ffffff;
          text-align: center;
          padding: 30px 20px;
        }

        .header h1 {
          margin: 0;
          font-size: 26px;
        }

        .content {
          padding: 30px 40px;
          font-size: 16px;
          line-height: 1.7;
          color: #333333;
        }

        .content h2 {
          color: #007BFF;
          margin-bottom: 15px;
          font-size: 20px;
        }

        .content p {
          margin: 12px 0;
        }

        .footer {
          background-color: #f8f9fa;
          color: #888888;
          text-align: center;
          font-size: 13px;
          padding: 15px 20px;
        }

        a {
          color: #007BFF;
          text-decoration: none;
        }

        @media screen and (max-width: 600px) {
          .content {
            padding: 25px 20px;
          }

          .header h1 {
            font-size: 22px;
          }

          .content h2 {
            font-size: 18px;
          }
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
          <p>Are your windows in need of a little TLC? Look no further! At <strong>The Window Knight</strong>, we specialize in making every pane sparkle — whether it’s your cozy home or your bustling office.</p>
          <p><strong>Residential Window Cleaning:</strong> Enjoy spotless windows that brighten up your home.</p>
          <p><strong>Commercial Window Cleaning:</strong> Impress your clients with gleaming office windows.</p>
          <p><strong>Specialized Services:</strong> From skylights to stained glass, we handle delicate jobs with precision.</p>
          <p>Let us help you enjoy the view through crystal-clear windows!</p>
          <p>📞 <a href="tel:4808220511">480-822-0511</a> &nbsp; | &nbsp; 📧 <a href="mailto:marco@thewindowknight.com">marco@thewindowknight.com</a></p>
          <p>Best regards,<br>Marco Khodr<br><em>Founder, The Window Knight</em></p>
        </div>
        <div class="footer">
          &copy; 2025 The Window Knight | The Window Cleaning Experts
        </div>
      </div>
    </body>
  </html>

  `;
}

module.exports = {
  PostBlog,
  SubscribeUser,
  GetIndexPage,
  GetBlogPage
};
