import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import {
  createCertificate,
  createProduct,
  createShipment,
  createUser,
  deleteCertificate,
  deleteProduct,
  getAdminData,
  updateCertificate,
  updateProduct,
  updateShipment,
  updateShipmentStatus
} from "@/lib/store";

function deny() {
  return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
}

function serverError(error) {
  console.error("Admin API error:", error);
  return NextResponse.json({
    ok: false,
    message: process.env.NODE_ENV === "development"
      ? error.message
      : "Error interno del servidor"
  }, { status: 500 });
}

export async function GET(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  user.canReadAudit = can(user.role, "audit:read");

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "8", 10);
    const productPage = parseInt(url.searchParams.get("productPage") || "1", 10);
    const productPageSize = parseInt(url.searchParams.get("productPageSize") || "8", 10);

    return NextResponse.json({
      ok: true,
      user,
      data: await getAdminData(user, page, pageSize, {
        productPage,
        productPageSize,
        productSearch: url.searchParams.get("productSearch") || "",
        productStatus: url.searchParams.get("productStatus") || ""
      })
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request) {
  const user = verifyToken(request);
  if (!user) return deny();
  const body = await request.json().catch(() => ({}));

  try {
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

    if (body.type === "productEdit") {
      if (!can(user.role, "catalog:write")) return deny();
      const result = await updateProduct(user, body);
      if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
      return NextResponse.json({ ok: true, item: result.item, message: "Producto actualizado." });
    }

    if (body.type === "productDelete") {
      if (!can(user.role, "catalog:write")) return deny();
      const result = await deleteProduct(user, body);
      if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
      return NextResponse.json({ ok: true, item: result.item, message: "Producto retirado del catalogo." });
    }

    if (body.type === "certificate") {
      if (!can(user.role, "certificates:write")) return deny();
      const result = await createCertificate(user, body);
      if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
      return NextResponse.json({ ok: true, item: result.item, message: "Certificacion registrada." });
    }

    if (body.type === "certificateEdit") {
      if (!can(user.role, "certificates:write")) return deny();
      const result = await updateCertificate(user, body);
      if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
      return NextResponse.json({ ok: true, item: result.item, message: "Certificacion actualizada." });
    }

    if (body.type === "certificateDelete") {
      if (!can(user.role, "certificates:write")) return deny();
      const result = await deleteCertificate(user, body);
      if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
      return NextResponse.json({ ok: true, item: result.item, message: "Certificacion retirada." });
    }

    if (body.type === "user") {
      if (!can(user.role, "roles:manage")) return deny();
      const result = await createUser(user, body);
      if (result.error) return NextResponse.json({ ok: false, message: result.error }, { status: result.status });
      return NextResponse.json({ ok: true, item: result.item, message: "Usuario creado." });
    }

    return NextResponse.json({ ok: false, message: "Operacion no soportada" }, { status: 400 });
  } catch (error) {
    return serverError(error);
  }
}
