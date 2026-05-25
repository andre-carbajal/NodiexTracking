import { NextResponse } from "next/server";
import { audit, store } from "@/lib/store";

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
    return NextResponse.json({ ok: false, message: "Rate limit exceeded" }, { status: 429 });
  }
  recent.push(now);
  store.rateLimit.set(ip, recent);

  const { code } = await request.json().catch(() => ({}));
  const normalized = String(code ?? "").trim().toUpperCase();
  const validFormat = /^NDX-[A-Z0-9]{4}-20\d{2}$/.test(normalized);
  const shipment = validFormat ? store.shipments.find((item) => item.code === normalized && item.active) : null;

  audit("public", shipment ? "tracking_consultado" : "tracking_fallido", "despacho", validFormat ? normalized : "formato invalido");

  if (!shipment) {
    return NextResponse.json({ ok: false, message: "No se pudo validar el codigo ingresado." }, { status: 404 });
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
