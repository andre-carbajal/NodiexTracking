import { NextResponse } from "next/server";
import { validateContactFields } from "@/lib/validators";
import { audit } from "@/lib/store";
import { prisma } from "@/lib/prisma";

const rateLimitMap = globalThis.__nodiexContactRateLimit ?? new Map();
globalThis.__nodiexContactRateLimit = rateLimitMap;

function clientIp(request) {
  if (request.ip) return request.ip;
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "local";
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

  // Guardar mensaje de contacto en base de datos
  await prisma.contacto.create({
    data: {
      nombre: body.name,
      empresa: body.company || null,
      correo: body.email,
      pais: body.country || null,
      mensaje: body.message
    }
  });

  await audit("publico", "contacto_enviado", "contacto", `${body.name} - ${body.email}`);

  return NextResponse.json({ ok: true, message: "Solicitud recibida correctamente." });
}
