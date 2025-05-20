"use client";

import { useEffect, useRef } from "react";
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import html2canvas from "html2canvas";

interface GanttTask {
  id: string | number;
  text: string;
  start_date: Date;
  duration: number;
  priority?: "baja" | "media" | "alta";
}

interface GanttChartProps {
  organizationId: string;
}

export default function GanttChart({ organizationId }: GanttChartProps) {
  const ganttContainer = useRef<HTMLDivElement>(null);

  const saveToServer = async () => {
    const data = gantt.serialize().data;
    try {
      await fetch(`/api/gantt/${organizationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, links: [] }),
      });
    } catch (error) {
      console.error("Error al guardar datos de Gantt:", error);
    }
  };

  const exportAsImage = async () => {
    const element = ganttContainer.current;
    if (element) {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.download = "diagrama-gantt.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  useEffect(() => {
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.scale_unit = "day";
    gantt.config.date_scale = "%d %M";
    gantt.config.duration_step = 1;
    gantt.config.bar_height = 30;
    gantt.config.min_column_width = 50;
    gantt.config.show_chart = true;
    gantt.config.show_grid = true;
    gantt.config.autosize = "y";
    gantt.config.fit_tasks = true;
    gantt.config.readonly = false;
    gantt.config.details_on_create = true;
    gantt.config.details_on_dblclick = true;
    gantt.config.drag_resize = true;
    gantt.config.drag_move = true;
    gantt.config.drag_progress = true;
    gantt.config.drag_links = false;
    gantt.config.show_links = false;

    const customDateFormat = gantt.date.date_to_str("%d-%m-%Y");

    gantt.templates.task_class = function (_start, _end, task: GanttTask) {
      return task.duration <= 1 ? "one-day-task" : "";
    };

    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      {
        name: "priority",
        height: 30,
        map_to: "priority",
        type: "select",
        options: [
          { key: "baja", label: "Baja" },
          { key: "media", label: "Media" },
          { key: "alta", label: "Alta" },
        ],
      },
      { name: "time", type: "time", map_to: "auto" },
    ];

    gantt.config.columns = [
      { name: "text", label: "Tarea", tree: true, width: 200 },
      {
        name: "start_date",
        label: "Inicio",
        align: "center",
        width: 100,
        template: function (task: GanttTask) {
          return customDateFormat(task.start_date);
        },
      },
      {
        name: "end_date",
        label: "Fin",
        align: "center",
        width: 100,
        template: function (task: GanttTask) {
          const end = gantt.calculateEndDate(task);
          return customDateFormat(end);
        },
      },
      { name: "duration", label: "Duración", align: "center", width: 80 },
      {
        name: "priority",
        label: "Prioridad",
        align: "center",
        width: 100,
        template: function (task: GanttTask) {
          return task.priority || "media";
        },
      },
    ];

    gantt.attachEvent("onTaskDblClick", function (id) {
      gantt.showLightbox(id);
      return false;
    });

    gantt.attachEvent("onAfterTaskAdd", saveToServer);
    gantt.attachEvent("onAfterTaskUpdate", saveToServer);
    gantt.attachEvent("onAfterTaskDelete", saveToServer);

    gantt.init(ganttContainer.current!);

    // 🔽 Cargar archivo del servidor por organización
    fetch(`/api/gantt/${organizationId}`)
      .then((res) => res.json())
      .then((data) => {
        gantt.parse(data);
      })
      .catch((err) => {
        console.warn("No se encontraron datos Gantt:", err);
      });

    return () => {
      gantt.clearAll();
    };
  }, [organizationId]);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-neutral-800">Diagrama de Gantt</h2>

        <button
          onClick={() => {
            const id = gantt.uid();
            gantt.addTask({
              id,
              text: "Nueva tarea",
              start_date: gantt.date.date_to_str("%Y-%m-%d %H:%i")(new Date()),
              duration: 1,
              priority: "media",
            });
            gantt.showTask(id);
            gantt.showLightbox(id);
            gantt.render();
          }}
          className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-700 transition"
        >
          Nueva tarea
        </button>

        <button
          onClick={exportAsImage}
          className="bg-green-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-green-700 transition"
        >
          Exportar como imagen
        </button>
      </div>

      <div
        ref={ganttContainer}
        style={{ height: "500px", overflow: "auto" }}
        className="w-full border border-gray-300 rounded-md bg-white"
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .one-day-task .gantt_task_content {
              background-color: #5e92f3 !important;
              border-radius: 4px;
              min-width: 30px;
            }
            .gantt_link_control {
              cursor: crosshair !important;
            }
          `,
        }}
      />
    </div>
  );
}
