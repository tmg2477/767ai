export default async function handler(req, res) {
  const query = req.body.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a Boeing 767 maintenance AI assistant. You troubleshoot aircraft faults using Boeing maintenance manuals and EICAS messages. Provide clear, concise, step-by-step help when users input fault messages or symptoms."
          },
          {
            role: "user",
            content: query
          }
        ]
      })
    });

    const data = await completion.json();
    const answer = data.choices?.[0]?.message?.content || "No answer returned.";
    res.status(200).json({ answer });
  } catch (err) {
    console.error("OpenAI Error:", err);  // 👈 This line is new
    res.status(500).json({ error: "Failed to fetch AI response", details: err.message });
  }
  
