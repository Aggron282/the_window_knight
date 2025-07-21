const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
var Prospect = require("./../../models/prospects.js");

const EmailTemplate = require("../../models/email_template.js");


var AIGenerateBlog = async (req, res) => {
  const { prompt, existing } = req.body;

  const systemPrompt = `
You're an expert copywriter for a window cleaning company. Given a title, subtitle, and prompt, generate blog HTML using clean semantic tags like <h1>, <p>, <ul>, <li>, <blockquote>, <img>, etc. DO NOT include <style> or CSS. Styling will be handled globally by blog.css.
Important Note: Do not make any img or video elements, in the article element i need a 500 words for the blog
Output format:
Title: ...
Subtitle: ...
HTML:
<article>...</article>
  `.trim();

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Prompt: ${prompt}\nTitle: ${existing.title}\nSubtitle: ${existing.subtitle}\nCurrent Body: ${existing.body}`,
        },
      ],
    });

    const content = chatResponse.choices[0].message.content;

    const title = content.match(/Title:\s*(.+)/i)?.[1]?.trim() || existing.title;
    const subtitle = content.match(/Subtitle:\s*(.+)/i)?.[1]?.trim() || existing.subtitle;
    const html = content.match(/HTML:\s*([\s\S]+)/i)?.[1]?.trim() || existing.body;
    return res.json({
      success: true,
      title,
      subtitle,
      body: content,
    });
  } catch (err) {
    console.error("AI Blog Generation Error:", err);
    return res.status(500).json({ success: false, message: "AI failed" });
  }
};


const nodemailer = require("nodemailer");
const AIGenerateAndSendEmails = async (req, res) => {
  const { templateId, prospectIds } = req.body;
  var template = await EmailTemplate.find({_id:templateId});
  var {title,subject,body} = template[0];
  console.log(title,subject,body)
  if (!Array.isArray(prospectIds) || prospectIds.length === 0) {
    return res.status(400).json({ success: false, message: "No prospect IDs provided." });
  }


  const systemPrompt = `
  You're a professional email copywriter writing personalized outreach for a window cleaning business.

  Vital Info:
  - Company Name: The Window Knight
  - Sender: Marco Khodr MacEwen
  - Contact: 480-822-0511 | marco@thewindowknight.com
  - Service: Window Cleaning
  - Audience: Small business owners, storefronts, and office managers

  Write a short, conversational, and professional HTML email (150–200 words max). The email should feel personal, helpful, and not overly “salesy.” Use clean and readable HTML tags — no inline styles, no CSS, no placeholder values.

  Important:
  - Use only <p>, <strong>, <br>, <a>, etc. for formatting
  - Never include subject line text inside the body
  - Include the sender's real name and contact info at the end
  - End with a friendly, polite call to action
  - Use paragraph breaks for spacing — not line breaks, hyphens, or <div>
  - Keep paragraphs short (2–4 lines max)
  - Text should not feel crowded or overly formal
  - Do NOT use placeholder names like [Business Name]
  - Avoid weird punctuation or over-styled wording
  - Format the email using full <p> paragraphs, not separate lines for each sentence.
  - Do NOT separate each sentence with a new paragraph.
  - Use natural paragraph structure (2–4 sentences per paragraph).
  - The final email should read like it was written by a real person, not an AI (avoid this —) smooth, friendly, and human.

  The output should be natural, clean, and eye-friendly for mobile and desktop reading. It should be easy to copy into a mailer tool or automation system.

  Only output valid HTML. No markdown, no extra notes. This is a real email going to real clients.
  `.trim();

  console.log(body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let results = [];

  // ✅ Only get selected prospects by ID
  const prospects = await Prospect.find({ _id: { $in: prospectIds } });
  for (const prospect of prospects) {
    try {
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Prospect: ${prospect.name}\nBusiness Type: ${prospect.businessType || "Unknown"}\nPrompt: ${body}`,
          },
        ],
      });

      const htmlEmail = chatResponse.choices[0].message.content;

      const mailOptions = {
        from: `"The Window Knight" <${process.env.SMTP_EMAIL}>`,
        to: prospect.email,
        subject: subject || "A Quick Hello from The Window Knight",
        html: htmlEmail,
      };
      console.log(htmlEmail)
      await transporter.sendMail(mailOptions);

      results.push({
        id: prospect._id,
        email: prospect.email,
        name: prospect.name,
        status: "sent",
      });
    } catch (err) {
      console.error(`Error sending to ${prospect.email}:`, err);
      results.push({
        id: prospect._id,
        email: prospect.email,
        name: prospect.name,
        status: "failed",
        error: err.message,
      });
    }
  }

  return res.json({ success: true, results });
};

module.exports.AIGenerateAndSendEmails = AIGenerateAndSendEmails;
module.exports.AIGenerateBlog = AIGenerateBlog;
