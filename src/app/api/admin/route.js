import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import { audit, store } from "@/lib/store";

function deny() {
  return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
}

export async function GET(request) {
  const user = verifyToken(request);
  if (!user) return deny();

  return NextResponse.json({
    ok: true,
    user,
    data: {
      shipments: store.shipments,
      products: store.products,
      certificates: store.certificates,
      audit: can(user.role, "audit:read") ? store.audit : []
    }
  });
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  const body = await request.json().catch(() => ({}));

  if (body.type === "shipment") {
    if (!can(user.role, "shipments:write")) return deny();
    const code = `NDX-${Math.random().toString(36).slice(2, 6).toUpperCase()}-2026`;
    const shipment = {
      id: crypto.randomUUID(),
      code,
      client: body.client || "Cliente internacional",
      destination: body.destination || "Destino pendiente",
      product: body.product || "Producto pendiente",
      currentStatus: "registrado",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: true,
      history: [{ status: "registrado", at: new Date().toISOString(), responsible: user.username, note: "Despacho creado desde panel." }]
    };
    audit(user.username, "crear", "despacho", code);
    store.shipments.unshift(shipment);
    return NextResponse.json({ ok: true, item: shipment });
  }

  if (body.type === "shipmentStatus") {
    if (!can(user.role, "shipments:write")) return deny();
    const allowed = ["registrado", "en tránsito", "entregado/cerrado"];
    const shipment = store.shipments.find((item) => item.id === body.id);
    if (!shipment || !allowed.includes(body.status)) return NextResponse.json({ ok: false, message: "Estado no permitido" }, { status: 400 });
    const currentIndex = allowed.indexOf(shipment.currentStatus);
    const nextIndex = allowed.indexOf(body.status);
    if (nextIndex < currentIndex && !body.reason) return NextResponse.json({ ok: false, message: "Reversion requiere motivo" }, { status: 400 });
    shipment.currentStatus = body.status;
    shipment.updatedAt = new Date().toISOString();
    shipment.history.push({ status: body.status, at: shipment.updatedAt, responsible: user.username, note: body.reason || "Actualizacion operativa." });
    audit(user.username, "actualizar_estado", "despacho", `${shipment.code} -> ${body.status}`);
    return NextResponse.json({ ok: true, item: shipment });
  }

  if (body.type === "product") {
    if (!can(user.role, "catalog:write")) return deny();
    const price = Number(body.price);
    if (!["PEN", "USD", "EUR"].includes(body.currency) || !["TM", "Contenedor 20'", "Contenedor 40'"].includes(body.unit) || !(price > 0)) {
      return NextResponse.json({ ok: false, message: "Unidad, moneda o precio invalido" }, { status: 400 });
    }
    const product = {
      id: crypto.randomUUID(),
      active: true,
      published: Boolean(body.publish),
      translations: { es: { name: body.name, description: body.description } },
      presentations: [{ unit: body.unit, prices: { [body.currency]: price } }]
    };
    audit(user.username, "crear", "producto", body.name);
    store.products.unshift(product);
    return NextResponse.json({ ok: true, item: product });
  }

  if (body.type === "certificate") {
    if (!can(user.role, "certificates:write")) return deny();
    if (!["SENASA", "BRC", "ISO", "BASC"].includes(body.certType) || !body.validUntil || !body.evidence) {
      return NextResponse.json({ ok: false, message: "Certificacion incompleta" }, { status: 400 });
    }
    const valid = new Date(body.validUntil) >= new Date();
    const certificate = {
      id: crypto.randomUUID(),
      type: body.certType,
      status: valid ? "vigente" : "vencida",
      validUntil: body.validUntil,
      evidence: body.evidence,
      published: valid
    };
    audit(user.username, "crear", "certificacion", body.certType);
    store.certificates.unshift(certificate);
    return NextResponse.json({ ok: true, item: certificate });
  }

  return NextResponse.json({ ok: false, message: "Operacion no soportada" }, { status: 400 });
}
