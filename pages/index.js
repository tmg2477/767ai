import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAssistant = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    setResponse(data.answer || "No response.");
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>767 Maintenance AI Assistant</h1>
      <input
        type="text"
        placeholder="Type your maintenance issue..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && askAssistant()}
        style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
      />
      <button onClick={askAssistant} disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Thinking..." : "Ask"}
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>{response}</div>
    </div>
  );
}
