import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import { generateKey, uploadFile } from "@/lib/storage";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function deny() {
  return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user || !can(user.role, "catalog:write")) return deny();

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ ok: false, message: "Archivo no recibido" }, { status: 400 });
  }

  if (!String(file.type || "").startsWith("image/")) {
    return NextResponse.json({ ok: false, message: "Solo se permiten imagenes" }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ ok: false, message: "La imagen supera 4MB" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = generateKey("productos", file.name || "producto.jpg");
    const url = await uploadFile(key, buffer, file.type || "application/octet-stream");
    return NextResponse.json({ ok: true, url, key });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error.message || "No se pudo subir la imagen"
    }, { status: 500 });
  }
}
