const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

async function sendReviewRequestEmail(email, code) {
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Thanks for using The Window Knight!</h2>
        <p>We’d love your feedback. Leave us a review and enjoy a $10 discount next time!</p>
        <a href="https://g.page/r/CQcwn1ScdZLSEBM/review" target="_blank">Leave a Google Review</a>
        <h3>Your Redemption Code: <strong>${code}</strong></h3>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Thanks for Using The Window Knight – Here's $10 Off",
    html
  }).catch((err)=>{console.log(err)});
}

module.exports = { sendReviewRequestEmail };
