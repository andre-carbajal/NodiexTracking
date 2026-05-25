import { prisma } from "@/lib/prisma";
import { sendTrackingUpdate } from "@/lib/notifications";

const globalRateLimit = globalThis.__nodiexRateLimit ?? new Map();
globalThis.__nodiexRateLimit = globalRateLimit;

export const store = {
  rateLimit: globalRateLimit
};

function roleNames(user) {
  return user?.roles?.map((item) => item.rol.nombreRol) ?? [];
}

export function userSessionPayload(user) {
  const roles = roleNames(user);
  return {
    id: user.id,
    username: user.username,
    role: roles[0] ?? "cliente_b2b_publico",
    roles
  };
}

function money(value) {
  return Number(value);
}

function serializeProduct(product, lang = "es") {
  const translations = Object.fromEntries(
    product.traducciones.map((item) => [
      item.idioma,
      { name: item.titulo ?? "", description: item.cuerpo ?? "" }
    ])
  );
  const base = translations.es ?? { name: "", description: "" };
  const localized = translations[lang] ?? base;

  return {
    id: product.id,
    active: product.activo,
    published: product.estadoPublicacion === "publicado",
    translations,
    presentations: product.presentaciones.map((presentation) => ({
      unit: presentation.tipoUnidad,
      prices: Object.fromEntries(presentation.precios.map((price) => [price.moneda, money(price.monto)]))
    })),
    name: localized.name,
    description: localized.description,
    fallback: !translations[lang]
  };
}

function serializeCertificate(certificate) {
  return {
    id: certificate.id,
    type: certificate.tipo,
    status: certificate.estadoVigencia,
    validUntil: certificate.fechaVencimiento.toISOString().slice(0, 10),
    evidence: certificate.evidencia ?? certificate.urlEvidencia ?? "",
    published: certificate.publicado
  };
}

function serializeShipment(shipment) {
  return {
    id: shipment.id,
    code: shipment.codigoTracking,
    client: shipment.cliente,
    destination: shipment.destino,
    product: shipment.producto,
    currentStatus: shipment.estadoActual,
    emailCliente: shipment.emailCliente ?? "",
    idiomaPreferido: shipment.idiomaPreferido ?? "es",
    createdAt: shipment.fechaRegistro.toISOString(),
    updatedAt: shipment.fechaActualizacion.toISOString(),
    active: shipment.activo,
    history: [...(shipment.estados ?? [])]
      .sort((a, b) => a.fechaHora.getTime() - b.fechaHora.getTime())
      .map((event) => ({
        status: event.estado,
        at: event.fechaHora.toISOString(),
        responsible: event.responsable,
        note: event.observacion ?? ""
      }))
  };
}

function serializeAudit(event) {
  return {
    id: event.id,
    user: event.usuarioNombre ?? event.usuario?.username ?? "sistema",
    operation: event.accion,
    entity: event.entidad,
    createdAt: event.fechaHora.toISOString(),
    detail: event.detalle?.detail ?? String(event.detalle ?? "")
  };
}

export async function audit(user, operation, entity, detail, tx = prisma, userId = null) {
  const event = await tx.bitacoraEvento.create({
    data: {
      usuarioId: userId,
      usuarioNombre: user,
      accion: operation,
      entidad: entity,
      detalle: { detail }
    }
  });
  return serializeAudit(event);
}

export async function getVisibleProducts(lang) {
  const products = await prisma.producto.findMany({
    where: {
      activo: true,
      estadoPublicacion: "publicado",
      presentaciones: {
        some: {
          precios: { some: {} }
        }
      }
    },
    include: {
      traducciones: true,
      presentaciones: {
        include: { precios: true }
      }
    },
    orderBy: { createdAt: "asc" }
  });

  return products.map((product) => serializeProduct(product, lang));
}

export async function getVisibleCertificates() {
  const certificates = await prisma.certificacion.findMany({
    where: {
      publicado: true,
      estadoVigencia: "vigente",
      fechaVencimiento: { gte: new Date() }
    },
    orderBy: { fechaVencimiento: "asc" }
  });

  return certificates.map(serializeCertificate);
}

export async function getUserByUsername(username) {
  return prisma.usuario.findUnique({
    where: { username },
    include: { roles: { include: { rol: true } } }
  });
}

export async function registerLoginFailure(user) {
  const nextAttempts = user.failedAttempts + 1;
  const shouldLock = nextAttempts >= 5;
  await prisma.$transaction(async (tx) => {
    await tx.usuario.update({
      where: { id: user.id },
      data: {
        failedAttempts: shouldLock ? 0 : nextAttempts,
        lockedUntil: shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : user.lockedUntil
      }
    });
    await audit(user.username, "login_fallido", "usuario", "Credenciales invalidas", tx, user.id);
  });
}

export async function registerLoginSuccess(user, token, ip, expiresAt) {
  await prisma.$transaction(async (tx) => {
    await tx.usuario.update({
      where: { id: user.id },
      data: {
        failedAttempts: 0,
        lockedUntil: null,
        ultimoAcceso: new Date()
      }
    });
    await tx.sesion.create({
      data: {
        tokenJwt: token,
        fechaExpiracion: expiresAt,
        ipOrigen: ip,
        usuarioId: user.id
      }
    });
    await audit(user.username, "login_exitoso", "usuario", `Rol ${userSessionPayload(user).role}`, tx, user.id);
  });
}

export async function findActiveShipmentByCode(code) {
  const shipment = await prisma.despacho.findFirst({
    where: { codigoTracking: code, activo: true },
    include: { estados: true }
  });
  return shipment ? serializeShipment(shipment) : null;
}

export async function getAdminData(user, page = 1, pageSize = 8) {
  const [shipments, products, certificates, events, totalShipments] = await Promise.all([
    prisma.despacho.findMany({
      include: { estados: true },
      orderBy: { fechaRegistro: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.producto.findMany({
      include: { traducciones: true, presentaciones: { include: { precios: true } } },
      orderBy: { createdAt: "desc" }
    }),
    prisma.certificacion.findMany({ orderBy: { fechaVencimiento: "asc" } }),
    user.canReadAudit
      ? prisma.bitacoraEvento.findMany({ include: { usuario: true }, orderBy: { fechaHora: "desc" }, take: 100 })
      : Promise.resolve([]),
    prisma.despacho.count()
  ]);

  return {
    shipments: shipments.map(serializeShipment),
    products: products.map((product) => serializeProduct(product, "es")),
    certificates: certificates.map(serializeCertificate),
    audit: events.map(serializeAudit),
    totalShipments
  };
}

export async function createShipment(user, body) {
  return prisma.$transaction(async (tx) => {
    const code = await generateTrackingCode(tx);
    const now = new Date();
    const shipment = await tx.despacho.create({
      data: {
        codigoTracking: code,
        cliente: body.client || "Cliente internacional",
        destino: body.destination || "Destino pendiente",
        producto: body.product || "Producto pendiente",
        estadoActual: "registrado",
        emailCliente: body.emailCliente || null,
        idiomaPreferido: body.idiomaPreferido || "es",
        fechaRegistro: now,
        fechaActualizacion: now,
        usuarioId: user.id,
        estados: {
          create: {
            estado: "registrado",
            fechaHora: now,
            responsable: user.username,
            observacion: "Despacho creado desde panel."
          }
        }
      },
      include: { estados: true }
    });
    await audit(user.username, "crear", "despacho", code, tx, user.id);
    return serializeShipment(shipment);
  });
}

export async function updateShipment(user, body) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.despacho.findUnique({ where: { id: body.id } });
    if (!existing) return { error: "Despacho no encontrado", status: 404 };

    const data = {};
    if (body.client !== undefined) data.cliente = body.client;
    if (body.destination !== undefined) data.destino = body.destination;
    if (body.product !== undefined) data.producto = body.product;
    if (body.emailCliente !== undefined) data.emailCliente = body.emailCliente;
    if (body.idiomaPreferido !== undefined) data.idiomaPreferido = body.idiomaPreferido;
    data.fechaActualizacion = new Date();

    const shipment = await tx.despacho.update({
      where: { id: existing.id },
      data,
      include: { estados: true }
    });

    await audit(user.username, "actualizar", "despacho", shipment.codigoTracking, tx, user.id);
    return { item: serializeShipment(shipment) };
  });
}

export async function updateShipmentStatus(user, body) {
  const allowed = ["registrado", "en tránsito", "entregado/cerrado"];
  if (!allowed.includes(body.status)) {
    return { error: "Estado no permitido", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.despacho.findUnique({ where: { id: body.id }, include: { estados: true } });
    if (!existing) return { error: "Despacho no encontrado", status: 404 };

    const currentIndex = allowed.indexOf(existing.estadoActual);
    const nextIndex = allowed.indexOf(body.status);
    if (nextIndex < currentIndex && !body.reason) {
      return { error: "Reversion requiere motivo obligatorio", status: 400 };
    }

    const now = new Date();
    const shipment = await tx.despacho.update({
      where: { id: existing.id },
      data: {
        estadoActual: body.status,
        fechaActualizacion: now,
        estados: {
          create: {
            estado: body.status,
            fechaHora: now,
            responsable: user.username,
            observacion: body.reason || "Actualizacion operativa."
          }
        }
      },
      include: { estados: true }
    });
    await audit(user.username, "actualizar_estado", "despacho", `${shipment.codigoTracking} -> ${body.status}`, tx, user.id);

    if (shipment.emailCliente) {
      const serialized = serializeShipment(shipment);
      sendTrackingUpdate(
        shipment.emailCliente,
        shipment.codigoTracking,
        body.status,
        shipment.destino,
        shipment.idiomaPreferido || "es"
      ).then((result) => {
        if (result?.ok) {
          audit(user.username, "notificacion_enviada", "despacho", `${shipment.codigoTracking} - ${shipment.emailCliente}`, undefined, user.id);
        }
      }).catch(() => {});
    }

    return { item: serializeShipment(shipment) };
  });
}

export async function createProduct(user, body) {
  const price = Number(body.price);
  if (!["PEN", "USD", "EUR"].includes(body.currency) || !["TM", "Contenedor 20'", "Contenedor 40'"].includes(body.unit) || !(price > 0)) {
    return { error: "Unidad, moneda o precio invalido", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const product = await tx.producto.create({
      data: {
        activo: true,
        estadoPublicacion: body.publish ? "publicado" : "borrador",
        traducciones: {
          create: {
            idioma: "es",
            titulo: body.name,
            cuerpo: body.description,
            estado: body.publish ? "publicado" : "borrador"
          }
        },
        presentaciones: {
          create: {
            tipoUnidad: body.unit,
            precios: {
              create: {
                moneda: body.currency,
                monto: price
              }
            }
          }
        }
      },
      include: { traducciones: true, presentaciones: { include: { precios: true } } }
    });
    await audit(user.username, "crear", "producto", body.name, tx, user.id);
    return { item: serializeProduct(product, "es") };
  });
}

export async function createCertificate(user, body) {
  if (!["SENASA", "BRC", "ISO", "BASC"].includes(body.certType) || !body.validUntil || !body.evidence) {
    return { error: "Certificacion incompleta", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const validUntil = new Date(`${body.validUntil}T00:00:00.000Z`);
    const valid = validUntil >= new Date();
    const certificate = await tx.certificacion.create({
      data: {
        tipo: body.certType,
        fechaVencimiento: validUntil,
        evidencia: body.evidence,
        estadoVigencia: valid ? "vigente" : "vencida",
        publicado: valid
      }
    });
    await audit(user.username, "crear", "certificacion", body.certType, tx, user.id);
    return { item: serializeCertificate(certificate) };
  });
}

async function generateTrackingCode(tx) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const random = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
    const code = `NDX-${random}-${new Date().getFullYear()}`;
    const existing = await tx.despacho.findUnique({ where: { codigoTracking: code } });
    if (!existing) return code;
  }
  throw new Error("No se pudo generar un codigo de tracking unico.");
}
