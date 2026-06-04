import { NextResponse } from "next/server";
import { audit, findActiveShipmentByCode, findActiveShipmentByCodeAndEmail, store } from "@/lib/store";
import { isValidEmail, isValidTrackingCode } from "@/lib/validators";

const MAX_REQUESTS = 30;
const WINDOW_MS = 10 * 60 * 1000;

function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request) {
  const ip = clientIp(request);
  const bucket = store.rateLimit.get(ip) ?? [];
  const now = Date.now();
  const recent = bucket.filter((stamp) => now - stamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    const waitMinutes = Math.ceil((WINDOW_MS - (now - oldest)) / 60000);
    return NextResponse.json({
      ok: false,
      message: `Demasiadas consultas. Intente en ${waitMinutes} minutos.`
    }, { status: 429 });
  }
  recent.push(now);
  store.rateLimit.set(ip, recent);

  const remaining = MAX_REQUESTS - recent.length;

  const { code, email, step = "code" } = await request.json().catch(() => ({}));
  const normalized = String(code ?? "").trim().toUpperCase();
  const validFormat = isValidTrackingCode(normalized);

  if (!validFormat) {
    await audit("public", "tracking_fallido", "despacho", "formato invalido");
    return NextResponse.json({
      ok: false,
      message: "Formato de codigo invalido. Ejemplo: NDX-8Q4M-2026"
    }, { status: 400 });
  }

  if (step === "code") {
    const shipment = await findActiveShipmentByCode(normalized);
    await audit("public", shipment ? "tracking_codigo_validado" : "tracking_fallido", "despacho", normalized);

    if (!shipment) {
      return NextResponse.json({
        ok: false,
        message: "No se pudo validar el codigo ingresado. Verifique el dato o contacte a NODIEX."
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
      remaining,
      verifiedCode: true,
      code: shipment.code,
      message: "Codigo validado. Ingrese el correo registrado para ver el detalle."
    });
  }

  if (step !== "email") {
    return NextResponse.json({
      ok: false,
      message: "Paso de validacion no soportado."
    }, { status: 400 });
  }

  const normalizedEmail = String(email ?? "").trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    await audit("public", "tracking_fallido", "despacho", `${normalized} - correo invalido`);
    return NextResponse.json({
      ok: false,
      message: "Ingrese el correo registrado para este pedido."
    }, { status: 400 });
  }

  const shipment = await findActiveShipmentByCodeAndEmail(normalized, normalizedEmail);
  await audit("public", shipment ? "tracking_consultado" : "tracking_fallido", "despacho", `${normalized} - ${normalizedEmail}`);

  if (!shipment) {
    return NextResponse.json({
      ok: false,
      message: "El correo no coincide con el registrado para este pedido."
    }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    remaining,
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
