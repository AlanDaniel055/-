import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Ruta segura fuera de /public
const getFilePath = (orgId: string) =>
  path.join(process.cwd(), "data", "gantt", `gantt-${orgId}.json`);

export async function GET(
  _req: Request,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;

  if (!organizationId) {
    return new NextResponse("organizationId requerido", { status: 400 });
  }

  try {
    const file = await fs.readFile(getFilePath(organizationId), "utf-8");
    return NextResponse.json(JSON.parse(file));
  } catch (error) {
    if ((error as any).code === "ENOENT") {
      // Archivo no encontrado: devolver estructura vacía
      return NextResponse.json({ data: [], links: [] });
    }

    console.error("Error leyendo archivo Gantt:", error);
    return new NextResponse("Error interno al leer el archivo", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;

  if (!organizationId) {
    return new NextResponse("organizationId requerido", { status: 400 });
  }

  try {
    const payload = await req.json();

    // Asegurarse de que el directorio exista
    const dirPath = path.join(process.cwd(), "data", "gantt");
    await fs.mkdir(dirPath, { recursive: true });

    // Guardar archivo
    await fs.writeFile(getFilePath(organizationId), JSON.stringify(payload, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error guardando archivo Gantt:", error);
    return new NextResponse("Error interno al guardar el archivo", { status: 500 });
  }
}
