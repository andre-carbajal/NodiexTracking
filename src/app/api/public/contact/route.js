import { NextResponse } from "next/server";
import { validateContactFields } from "@/lib/validators";
import { audit } from "@/lib/store";

const rateLimitMap = globalThis.__nodiexContactRateLimit ?? new Map();
globalThis.__nodiexContactRateLimit = rateLimitMap;

function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request) {
  const ip = clientIp(request);
  const bucket = rateLimitMap.get(ip) ?? [];
  const now = Date.now();
  const recent = bucket.filter((stamp) => now - stamp < 10 * 60 * 1000);
  if (recent.length >= 5) {
    return NextResponse.json({ ok: false, message: "Demasiadas solicitudes. Intente en unos minutos." }, { status: 429 });
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);

  const body = await request.json().catch(() => ({}));
  const { valid, errors } = validateContactFields(body);
  if (!valid) {
    return NextResponse.json({ ok: false, message: "Campos invalidos", errors }, { status: 400 });
  }

  await audit("publico", "contacto_enviado", "contacto", `${body.name} - ${body.email}`);

  return NextResponse.json({ ok: true, message: "Solicitud recibida correctamente." });
}
