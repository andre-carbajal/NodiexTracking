import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import { createCertificate, createProduct, createShipment, getAdminData, updateShipmentStatus } from "@/lib/store";

function deny() {
  return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
}

export async function GET(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  user.canReadAudit = can(user.role, "audit:read");

  return NextResponse.json({
    ok: true,
    user,
    data: await getAdminData(user)
  });
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  const body = await request.json().catch(() => ({}));

  if (body.type === "shipment") {
    if (!can(user.role, "shipments:write")) return deny();
    const shipment = await createShipment(user, body);
    return NextResponse.json({ ok: true, item: shipment });
  }

  if (body.type === "shipmentStatus") {
    if (!can(user.role, "shipments:write")) return deny();
    const result = await updateShipmentStatus(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item });
  }

  if (body.type === "product") {
    if (!can(user.role, "catalog:write")) return deny();
    const result = await createProduct(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item });
  }

  if (body.type === "certificate") {
    if (!can(user.role, "certificates:write")) return deny();
    const result = await createCertificate(user, body);
    if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, item: result.item });
  }

  return NextResponse.json({ ok: false, message: "Operacion no soportada" }, { status: 400 });
}
