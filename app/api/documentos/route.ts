import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dirPath = path.join(process.cwd(), "public", "uploads");

export async function GET() {
  try {
    const files = await fs.readdir(dirPath);
    return NextResponse.json({
      files: files.map((name) => ({
        name,
        url: `/uploads/${name}`,
      })),
    });
  } catch (err) {
    return NextResponse.json({ files: [] });
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  if (!name) {
    return new NextResponse("Nombre de archivo requerido", { status: 400 });
  }

  const filePath = path.join(dirPath, name);
  try {
    await fs.unlink(filePath);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    return new NextResponse("No se pudo eliminar", { status: 500 });
  }
}
