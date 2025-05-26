const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD // Use App Password if Gmail
  }
});

module.exports.SendEmailToOwner = function SendEmailToOwner(new_key) {
  const mailOptions = {
    from: `"Custom Facility Services" <${process.env.SMTP_EMAIL}>`,
    to: process.env.SMTP_EMAIL,
    subject: "Your Secret Key has been Changed",
    html: `
      <div style="position:relative;box-shadow:0px 0px 10px rgba(0,0,0,.5);text-align:center;padding:30px;border-radius:10px;border:1px solid black">
        <img style="position:absolute;width:100px;margin-left:-40px;top:0%;opacity:1"
          src="https://cdn.shopify.com/s/files/1/0300/2577/7251/files/new_logo.png?v=1748302353"
        />
        <p style="text-align:center;font-size:20px">Your New Key</p>
        <p style="text-decoration:underline;font-size:22px;text-align:center">${new_key}</p>
        <h2>The Window Knight | Window Cleaning Experts</h2>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("❌ Email failed:", error.message);
    }
    console.log("✅ Email sent:", info.response);
  });
}
