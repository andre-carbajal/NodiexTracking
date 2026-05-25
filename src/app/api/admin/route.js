import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import { createCertificate, createProduct, createShipment, getAdminData, updateShipment, updateShipmentStatus } from "@/lib/store";

function deny() {
  return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
}

export async function GET(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  user.canReadAudit = can(user.role, "audit:read");

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "8", 10);

  return NextResponse.json({
    ok: true,
    user,
    data: await getAdminData(user, page, pageSize)
  });
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  const body = await request.json().catch(() => ({}));

  if (body.type === "shipment") {
    if (!can(user.role, "shipments:write")) return deny();
    const shipment = await createShipment(user, body);
    return NextResponse.json({ ok: true, item: shipment, message: "Despacho creado exitosamente." });
  }

  if (body.type === "shipmentEdit") {
    if (!can(user.role, "shipments:write")) return deny();
    const result = await updateShipment(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item, message: "Despacho actualizado." });
  }

  if (body.type === "shipmentStatus") {
    if (!can(user.role, "shipments:write")) return deny();
    const result = await updateShipmentStatus(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item, message: "Estado actualizado. Notificacion enviada si corresponde." });
  }

  if (body.type === "product") {
    if (!can(user.role, "catalog:write")) return deny();
    const result = await createProduct(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item, message: "Producto creado." });
  }

  if (body.type === "certificate") {
    if (!can(user.role, "certificates:write")) return deny();
    const result = await createCertificate(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item, message: "Certificacion registrada." });
  }

  return NextResponse.json({ ok: false, message: "Operacion no soportada" }, { status: 400 });
}
