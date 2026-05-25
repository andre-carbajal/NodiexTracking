import { NextResponse } from "next/server";
import { audit, findActiveShipmentByCode } from "@/lib/store";
import { isValidTrackingCode } from "@/lib/validators";

export async function GET(request, { params }) {
  const { codigo } = await params;
  const normalized = String(codigo).trim().toUpperCase();

  if (!isValidTrackingCode(normalized)) {
    return NextResponse.json({
      ok: false,
      message: "Formato de codigo invalido."
    }, { status: 400 });
  }

  const shipment = await findActiveShipmentByCode(normalized);

  await audit("public", shipment ? "tracking_consultado" : "tracking_fallido", "despacho", normalized);

  if (!shipment) {
    return NextResponse.json({
      ok: false,
      message: "No se encontro informacion para este codigo."
    }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    shipment: {
      code: shipment.code,
      destination: shipment.destination,
      product: shipment.product,
      currentStatus: shipment.currentStatus,
      updatedAt: shipment.updatedAt,
      history: shipment.history
    }
  });
}
