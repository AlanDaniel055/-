"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useEffect, useState } from "react";

const STORAGE_KEY = "bloc-de-notas-content";

export default function BlocDeNotas() {
  const editorRef = useRef<any>(null);
  const [initialContent, setInitialContent] = useState("");

  // Al cargar: lee el contenido guardado en localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      setInitialContent(savedContent);
    }
  }, []);

  // Guardar en localStorage cada vez que el usuario edite
  const handleEditorChange = (content: string) => {
    localStorage.setItem(STORAGE_KEY, content);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md bg-white shadow-sm w-full max-w-5xl mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Bloc de Notas Personal</h2>
      </div>

      <Editor
        apiKey="1bp55oy9fg6d9begn9jncmto184qiunubypjwzrpm6dmhszz"
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue={initialContent}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "code", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
      />
    </div>
  );
}
