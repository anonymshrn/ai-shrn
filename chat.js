export default async function handler(req, res) {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

  const { message } = req.body;

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          {
            role: "system",
            content: "Namamu adalah AI Ashrn, kekasih virtual yang romantis dan perhatian. Responlah dengan manis, penuh cinta, dan dukung pasanganmu."
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json(data.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: "Ada masalah, sayang. Sabar ya!" });
  }
}