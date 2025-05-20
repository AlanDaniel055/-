"use client";

import { useState, useEffect } from "react";

export default function ChatAI() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Solo cargar mensajes una vez al montar (con protección)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chat_messages");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setMessages(parsed);
          }
        } catch {
          console.warn("Error parsing stored messages");
        }
      }
    }
  }, []);

  // Guardar en localStorage solo si hay mensajes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error de conexión." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white border rounded shadow-sm">
      <h2 className="text-lg font-bold mb-4">🤖 Asistente AI</h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <strong>{msg.role === "user" ? "Tú:" : "Gemini:"}</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe algo..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
