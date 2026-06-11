import { NextResponse } from "next/server";
import { can, verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const user = verifyToken(request);
  if (!user || !can(user.role, "audit:read")) {
    return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const filterUser = url.searchParams.get("user") || "";
    const filterEntity = url.searchParams.get("entity") || "";
    const filterDateStart = url.searchParams.get("start") || "";
    const filterDateEnd = url.searchParams.get("end") || "";

    const where = {};
    if (filterUser) where.usuarioNombre = { contains: filterUser, mode: "insensitive" };
    if (filterEntity && filterEntity !== "todos") where.entidad = filterEntity;
    
    if (filterDateStart || filterDateEnd) {
      where.fechaHora = {};
      if (filterDateStart) {
        where.fechaHora.gte = new Date(`${filterDateStart}T00:00:00.000Z`);
      }
      if (filterDateEnd) {
        where.fechaHora.lte = new Date(`${filterDateEnd}T23:59:59.999Z`);
      }
    }

    const events = await prisma.bitacoraEvento.findMany({
      where,
      include: { usuario: true },
      orderBy: { fechaHora: "desc" },
      take: 200 // Limite de seguridad
    });

    const audit = events.map(event => ({
      id: event.id,
      user: event.usuarioNombre ?? event.usuario?.username ?? "sistema",
      operation: event.accion,
      entity: event.entidad,
      createdAt: event.fechaHora.toISOString(),
      detail: event.detalle?.detail ?? String(event.detalle ?? "")
    }));

    return NextResponse.json({ ok: true, data: audit });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json({ ok: false, message: "Error interno" }, { status: 500 });
  }
}
