import { NextRequest, NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { mkdir, stat } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return new NextResponse("Archivo no proporcionado", { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "uploads");

  try {
    await mkdir(dir, { recursive: true });
  } catch (e) {}

  const filePath = path.join(dir, file.name);
  const writeStream = createWriteStream(filePath);
  writeStream.write(buffer);
  writeStream.end();

  return NextResponse.json({ ok: true });
}
