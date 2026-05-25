import { NextResponse } from "next/server";
import { audit, findActiveShipmentByCode, store } from "@/lib/store";
import { isValidTrackingCode } from "@/lib/validators";

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

  const { code } = await request.json().catch(() => ({}));
  const normalized = String(code ?? "").trim().toUpperCase();
  const validFormat = isValidTrackingCode(normalized);
  const shipment = validFormat ? await findActiveShipmentByCode(normalized) : null;

  await audit("public", shipment ? "tracking_consultado" : "tracking_fallido", "despacho", validFormat ? normalized : "formato invalido");

  if (!shipment) {
    return NextResponse.json({
      ok: false,
      message: "No se pudo validar el codigo ingresado. Verifique el dato o contacte a NODIEX."
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
