const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function AIGenerateBlog(req, res) {
  try {
    const { prompt, existing } = req.body;

    const basePrompt = prompt || "Write a professional window cleaning blog post.";

    const context = existing?.title || existing?.subtitle || existing?.body
      ? `Improve the following blog content.\nTitle: ${existing.title}\nSubtitle: ${existing.subtitle}\nBody: ${existing.body}\n\n${basePrompt}`
      : basePrompt;

      const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant and professional blog writer for a window cleaning company. Format your reply like this: \n\nTitle: ...\nSubtitle: ...\nBody:\n...full article text here..."
        },
        {
          role: "user",
          content: basePrompt  // or your composed user content
        }
      ],
      temperature: 0.8
    });


    const responseText = chatResponse.choices[0].message.content;

    const titleMatch = responseText.match(/Title:\s*(.+)/i);
    const subtitleMatch = responseText.match(/Subtitle:\s*(.+)/i);
    const bodyMatch = responseText.match(/Body:\s*([\s\S]+)/i);

    const title = titleMatch?.[1]?.trim() || "Untitled";
    const subtitle = subtitleMatch?.[1]?.trim() || "";
    const body = bodyMatch?.[1]?.trim() || "";
    console.log(title,subtitle,body)
    return res.json({ success: true, title, subtitle, body });


  } catch (err) {
    console.error("AI error:", err.message);
    res.status(500).json({ success: false, message: "AI generation failed." });
  }
}


module.exports.AIGenerateBlog = AIGenerateBlog;
