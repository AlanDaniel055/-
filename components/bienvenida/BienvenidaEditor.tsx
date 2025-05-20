"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function BienvenidaEditor() {
  const { organizationId } = useParams() as { organizationId: string };
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBienvenida = async () => {
      try {
        const res = await fetch(`/api/organization/${organizationId}/bienvenida`);
        const data = await res.json();
        setContent(data.content || "");
      } catch (error) {
        console.error("Error al cargar bienvenida", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBienvenida();
  }, [organizationId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/organization/${organizationId}/bienvenida`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
    } catch (error) {
      console.error("Error al guardar bienvenida", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando contenido...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-neutral-800">📝 Presentación del Espacio</h1>
      <Textarea
        rows={15}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-white border border-gray-300 text-sm rounded-md"
        placeholder="Escribe aquí la presentación y reglas del espacio..."
      />
      <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
        {saving ? "Guardando..." : "Guardar cambios"}
      </Button>
    </div>
  );
}