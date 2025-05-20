import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const getFilePath = (orgId: string) =>
  path.join(process.cwd(), "data", "bienvenida", `org-${orgId}.json`);

export async function GET(
  _req: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;
  try {
    const file = await fs.readFile(getFilePath(organizationId), "utf-8");
    return NextResponse.json(JSON.parse(file));
  } catch (error) {
    return NextResponse.json({ content: "" });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;
  const { content } = await req.json();
  const dir = path.join(process.cwd(), "data", "bienvenida");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(getFilePath(organizationId), JSON.stringify({ content }, null, 2));
  return NextResponse.json({ ok: true });
}
