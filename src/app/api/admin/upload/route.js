import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import { generateKey, uploadFile } from "@/lib/storage";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const UPLOAD_PURPOSES = {
  certificate: {
    permission: "certificates:write",
    prefix: "certificaciones"
  },
  product: {
    permission: "catalog:write",
    prefix: "productos"
  }
};

function deny() {
  return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) return deny();

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const purpose = UPLOAD_PURPOSES[String(formData?.get("purpose") || "product")] || UPLOAD_PURPOSES.product;
  if (!can(user.role, purpose.permission)) return deny();

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
    const key = generateKey(purpose.prefix, file.name || "archivo.jpg");
    const url = await uploadFile(key, buffer, file.type || "application/octet-stream");
    return NextResponse.json({ ok: true, url, key });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: error.message || "No se pudo subir la imagen"
    }, { status: 500 });
  }
}
