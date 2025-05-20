"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const GanttChart = dynamic(() => import("@/components/gantt/GanttChart"), {
  ssr: false,
});

export default function GanttPage() {
  const params = useParams();
  const organizationId = params?.organizationId as string;

  return (
    <div className="w-full">
      <div
        style={{
          border: "1px solid #e5e5e5",
          boxShadow: "none",
          width: "100%",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          backgroundColor: "#fff",
        }}
      >
        <h1 className="text-2xl font-bold mb-4">Gantt</h1>
        <GanttChart organizationId={organizationId} />
      </div>
    </div>
  );
}
