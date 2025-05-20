"use client";

import { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

interface DocumentFile {
  name: string;
  url: string;
}

export default function DocumentManager() {
  const [files, setFiles] = useState<DocumentFile[]>([]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        fetchDocuments();
        message.success(`${info.file.name} subido correctamente.`);
      } else if (status === "error") {
        message.error(`${info.file.name} no se pudo subir.`);
      }
    },
  };

  const fetchDocuments = async () => {
    const res = await fetch("/api/documentos");
    const data = await res.json();
    setFiles(data.files);
  };

  const deleteFile = async (name: string) => {
    const confirmed = confirm(`¿Eliminar el archivo "${name}"?`);
    if (!confirmed) return;

    const res = await fetch(`/api/documentos?name=${encodeURIComponent(name)}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFiles((prev) => prev.filter((f) => f.name !== name));
      message.success("Archivo eliminado.");
    } else {
      message.error("No se pudo eliminar el archivo.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-neutral-800">Gestor de Documentos</h2>
      <h3>Sube tus archivos y compártelos con tu equipo de trabajo.</h3>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haz clic o arrastra archivos para subir</p>
        <p className="ant-upload-hint">Solo archivos PDF, DOCX, PNG o JPG</p>
      </Dragger>

      <div>
        <h3 className="text-md font-semibold">Archivos subidos</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          {files.map((file) => (
            <li key={file.name} className="flex items-center gap-2">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {file.name}
              </a>
              <button
                onClick={() => deleteFile(file.name)}
                className="text-red-600 text-sm hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
