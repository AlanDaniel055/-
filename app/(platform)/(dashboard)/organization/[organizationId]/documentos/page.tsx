"use client";

import DocumentManager from "../../../../../../components/documentos/DocumentManager";

const DocumentosPage = () => {
  return (
    <div className="w-full">
      <div className="border border-gray-200 bg-white shadow-none w-full rounded-md p-6">
        <DocumentManager />
      </div>
    </div>
  );
};

export default DocumentosPage;