import { NextResponse } from "next/server";
import { audit, findActiveShipmentByCode } from "@/lib/store";
import { isValidTrackingCode } from "@/lib/validators";

export async function GET(_request, { params }) {
  const { codigo } = await params;
  const normalized = String(codigo).trim().toUpperCase();

  if (!isValidTrackingCode(normalized)) {
    return NextResponse.json({
      ok: false,
      message: "Formato de codigo invalido."
    }, { status: 400 });
  }

  const shipment = await findActiveShipmentByCode(normalized);

  await audit("public", shipment ? "tracking_codigo_validado" : "tracking_fallido", "despacho", normalized);

  if (!shipment) {
    return NextResponse.json({
      ok: false,
      message: "No se encontro informacion para este codigo."
    }, { status: 404 });
  }

  if (!shipment.emailCliente) {
    return NextResponse.json({
      ok: false,
      message: "Este despacho no tiene correo registrado. Contacte a NODIEX para habilitar la consulta."
    }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    verifiedCode: true,
    code: shipment.code,
    message: "Codigo validado. Ingrese el correo registrado para ver el detalle."
  });
}
