export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: `請將下列日文翻譯成中文：\n${text}` }],
      temperature: 0.5
    })
  });

  const data = await response.json();
  res.status(200).json({ translation: data.choices[0].message.content });
}