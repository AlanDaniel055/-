import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const userMessage = messages.filter((m: any) => m.role === "user").at(-1)?.content;
  if (!userMessage) return NextResponse.json({ reply: "Mensaje vacío." });

  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    });

    const data = await res.json();
    console.log("[Gemini Response]", data); // 👈 Agrega este log para depuración

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No se recibió respuesta.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[Gemini Error]", error); // 👈 Error detallado
    return NextResponse.json({ reply: "Error al contactar con Gemini." });
  }
}
