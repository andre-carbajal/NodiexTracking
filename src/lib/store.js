import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendTrackingUpdate } from "@/lib/notifications";

const globalRateLimit = globalThis.__nodiexRateLimit ?? new Map();
globalThis.__nodiexRateLimit = globalRateLimit;

export const PRODUCT_UNITS = ["TM", "Contenedor 20'", "Contenedor 40'"];
export const PRODUCT_CURRENCIES = ["PEN", "USD", "EUR"];

export const store = {
  rateLimit: globalRateLimit
};

let shipmentNotificationColumnsAvailable = null;

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

async function hasShipmentNotificationColumns(client = prisma) {
  if (shipmentNotificationColumnsAvailable !== null) return shipmentNotificationColumnsAvailable;

  const rows = await client.$queryRaw`
    SELECT attname
    FROM pg_attribute
    WHERE attrelid = 'public.despachos'::regclass
      AND attname IN ('email_cliente', 'idioma_preferido')
      AND NOT attisdropped
  `;
  shipmentNotificationColumnsAvailable = rows.length === 2;
  return shipmentNotificationColumnsAvailable;
}

function shipmentSelect(includeNotifications = false) {
  return {
    id: true,
    codigoTracking: true,
    cliente: true,
    destino: true,
    producto: true,
    estadoActual: true,
    ...(includeNotifications ? { emailCliente: true, idiomaPreferido: true } : {}),
    fechaRegistro: true,
    fechaActualizacion: true,
    activo: true,
    usuarioId: true,
    estados: true
  };
}

function validPriceValue(value) {
  const raw = String(value ?? "").trim();
  return /^\d+(\.\d{1,2})?$/.test(raw) && Number(raw) > 0;
}

function productCompleteness(product) {
  const translation = product.traducciones?.find((item) => item.idioma === "es");
  const missing = [];
  if (!translation?.titulo?.trim()) missing.push("nombre");
  if (!translation?.cuerpo?.trim()) missing.push("descripcion");
  if (!product.presentaciones?.length) missing.push("presentacion");
  const hasPrice = product.presentaciones?.some((presentation) => presentation.precios?.some((price) => money(price.monto) > 0));
  if (!hasPrice) missing.push("precio");
  return { complete: missing.length === 0, missing };
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
    publicationStatus: product.estadoPublicacion,
    imageUrl: product.imagenUrl ?? "",
    translations,
    presentations: product.presentaciones.map((presentation) => ({
      id: presentation.id,
      unit: presentation.tipoUnidad,
      prices: Object.fromEntries(presentation.precios.map((price) => [price.moneda, money(price.monto)]))
    })),
    name: localized.name,
    description: localized.description,
    fallback: !translations[lang],
    completeness: productCompleteness(product)
  };
}

function serializeCertificate(certificate) {
  return {
    id: certificate.id,
    type: certificate.tipo,
    status: certificate.estadoVigencia,
    validUntil: certificate.fechaVencimiento.toISOString().slice(0, 10),
    evidence: certificate.evidencia ?? certificate.urlEvidencia ?? "",
    imageUrl: certificate.urlEvidencia ?? "",
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

function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    estado: user.estado,
    roles: user.roles?.map((item) => item.rol.nombreRol) ?? []
  };
}

function serializeProductOption(product) {
  const es = product.traducciones?.find((item) => item.idioma === "es");
  const fallback = product.traducciones?.[0];
  const name = es?.titulo || fallback?.titulo || "Producto sin nombre";
  return { id: product.id, name };
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

export async function getVisibleProducts(lang, filters = {}) {
  const search = String(filters.search || "").trim();
  const products = await prisma.producto.findMany({
    where: {
      activo: true,
      estadoPublicacion: "publicado",
      traducciones: {
        some: {
          idioma: "es",
          titulo: { not: "" },
          cuerpo: { not: "" }
        }
      },
      ...(search ? {
        AND: [{
          traducciones: {
            some: {
              idioma: { in: [...new Set([lang, "es"])] },
              titulo: { contains: search, mode: "insensitive" }
            }
          }
        }]
      } : {}),
      presentaciones: {
        some: {
          precios: { some: { monto: { gt: 0 } } }
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

export async function getPublicProduct(id, lang = "es") {
  const product = await prisma.producto.findFirst({
    where: {
      id,
      activo: true,
      estadoPublicacion: "publicado",
      traducciones: {
        some: {
          idioma: "es",
          titulo: { not: "" },
          cuerpo: { not: "" }
        }
      },
      presentaciones: {
        some: {
          precios: { some: { monto: { gt: 0 } } }
        }
      }
    },
    include: {
      traducciones: true,
      presentaciones: {
        include: { precios: true }
      }
    }
  });

  return product ? serializeProduct(product, lang) : null;
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
  const includeNotifications = await hasShipmentNotificationColumns();
  const shipment = await prisma.despacho.findFirst({
    where: { codigoTracking: code, activo: true },
    select: shipmentSelect(includeNotifications)
  });
  return shipment ? serializeShipment(shipment) : null;
}

export async function getAdminData(user, page = 1, pageSize = 8, filters = {}) {
  const includeNotifications = await hasShipmentNotificationColumns();
  const productPage = Number(filters.productPage || 1);
  const productPageSize = Number(filters.productPageSize || 8);
  const productSearch = String(filters.productSearch || "").trim();
  const productStatus = ["borrador", "publicado", "retirado"].includes(filters.productStatus) ? filters.productStatus : "";
  const productWhere = {
    ...(productStatus === "retirado" ? { activo: false } : { activo: true }),
    ...(productStatus && productStatus !== "retirado" ? { estadoPublicacion: productStatus } : {}),
    ...(productSearch ? {
      traducciones: {
        some: {
          idioma: "es",
          titulo: { contains: productSearch, mode: "insensitive" }
        }
      }
    } : {})
  };

  const [shipments, products, productOptions, certificates, events, totalShipments, totalProducts, users] = await Promise.all([
    prisma.despacho.findMany({
      select: shipmentSelect(includeNotifications),
      orderBy: { fechaRegistro: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.producto.findMany({
      where: productWhere,
      include: { traducciones: true, presentaciones: { include: { precios: true } } },
      orderBy: { createdAt: "desc" },
      skip: (productPage - 1) * productPageSize,
      take: productPageSize
    }),
    prisma.producto.findMany({
      where: { activo: true },
      include: { traducciones: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.certificacion.findMany({ orderBy: { fechaVencimiento: "asc" } }),
    user.canReadAudit
      ? prisma.bitacoraEvento.findMany({ include: { usuario: true }, orderBy: { fechaHora: "desc" }, take: 100 })
      : Promise.resolve([]),
    prisma.despacho.count(),
    prisma.producto.count({ where: productWhere }),
    user.role === "superadmin"
      ? prisma.usuario.findMany({ include: { roles: { include: { rol: true } } }, orderBy: { createdAt: "desc" } })
      : Promise.resolve([])
  ]);

  return {
    shipments: shipments.map(serializeShipment),
    products: products.map((product) => serializeProduct(product, "es")),
    productOptions: productOptions.map(serializeProductOption),
    certificates: certificates.map(serializeCertificate),
    audit: events.map(serializeAudit),
    users: users.map(serializeUser),
    totalShipments,
    totalProducts
  };
}

export async function createUser(user, body) {
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  const role = String(body.role || "").trim();
  const allowedRoles = ["superadmin", "operativo", "comercial", "gerencia"];

  if (!username || password.length < 8 || !allowedRoles.includes(role)) {
    return { error: "Usuario, contrasena o rol invalido", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.usuario.findUnique({ where: { username } });
    if (existing) return { error: "Usuario ya existe", status: 409 };

    const roleRecord = await tx.rol.findUnique({ where: { nombreRol: role } });
    if (!roleRecord) return { error: "Rol no existe", status: 400 };

    const created = await tx.usuario.create({
      data: {
        username,
        hashPassword: await bcrypt.hash(password, 10),
        estado: "activo",
        roles: { create: { rolId: roleRecord.id } }
      },
      include: { roles: { include: { rol: true } } }
    });

    await audit(user.username, "crear", "usuario", username, tx, user.id);
    return { item: serializeUser(created) };
  });
}

export async function createShipment(user, body) {
  const includeNotifications = await hasShipmentNotificationColumns();
  return prisma.$transaction(async (tx) => {
    const code = await generateTrackingCode(tx);
    const now = new Date();
    const shipmentId = crypto.randomUUID();
    const notificationData = includeNotifications
      ? {
        emailCliente: body.emailCliente || null,
        idiomaPreferido: body.idiomaPreferido || "es"
      }
      : {};

    if (!includeNotifications) {
      await tx.$executeRaw`
        INSERT INTO despachos (
          id,
          codigo_tracking,
          cliente,
          destino,
          producto,
          estado_actual,
          fecha_registro,
          fecha_actualizacion,
          activo,
          usuario_id
        ) VALUES (
          ${shipmentId},
          ${code},
          ${body.client || "Cliente internacional"},
          ${body.destination || "Destino pendiente"},
          ${body.product || "Producto pendiente"},
          ${"registrado"},
          ${now},
          ${now},
          ${true},
          ${user.id}
        )
      `;
      await tx.estadoDespacho.create({
        data: {
          estado: "registrado",
          fechaHora: now,
          responsable: user.username,
          observacion: "Despacho creado desde panel.",
          despachoId: shipmentId
        }
      });
      const shipment = await tx.despacho.findUnique({
        where: { id: shipmentId },
        select: shipmentSelect(false)
      });
      await audit(user.username, "crear", "despacho", code, tx, user.id);
      return serializeShipment(shipment);
    }

    const shipment = await tx.despacho.create({
      data: {
        id: shipmentId,
        codigoTracking: code,
        cliente: body.client || "Cliente internacional",
        destino: body.destination || "Destino pendiente",
        producto: body.product || "Producto pendiente",
        estadoActual: "registrado",
        ...notificationData,
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
      select: shipmentSelect(includeNotifications)
    });
    await audit(user.username, "crear", "despacho", code, tx, user.id);
    return serializeShipment(shipment);
  });
}

export async function updateShipment(user, body) {
  const includeNotifications = await hasShipmentNotificationColumns();
  const allowed = ["registrado", "en tránsito", "entregado/cerrado"];
  const nextStatus = body.currentStatus || body.status;
  if (nextStatus && !allowed.includes(nextStatus)) {
    return { error: "Estado no permitido", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.despacho.findUnique({
      where: { id: body.id },
      select: shipmentSelect(includeNotifications)
    });
    if (!existing) return { error: "Despacho no encontrado", status: 404 };

    const data = {};
    if (body.client !== undefined) data.cliente = body.client;
    if (body.destination !== undefined) data.destino = body.destination;
    if (body.product !== undefined) data.producto = body.product;
    if (includeNotifications && body.emailCliente !== undefined) data.emailCliente = body.emailCliente || null;
    if (includeNotifications && body.idiomaPreferido !== undefined) data.idiomaPreferido = body.idiomaPreferido;
    if (nextStatus && nextStatus !== existing.estadoActual) {
      data.estadoActual = nextStatus;
      data.estados = {
        create: {
          estado: nextStatus,
          fechaHora: new Date(),
          responsable: user.username,
          observacion: "Estado actualizado desde edicion del despacho."
        }
      };
    }
    data.fechaActualizacion = new Date();

    const shipment = await tx.despacho.update({
      where: { id: existing.id },
      data,
      select: shipmentSelect(includeNotifications)
    });

    await audit(user.username, "actualizar", "despacho", shipment.codigoTracking, tx, user.id);
    if (nextStatus && nextStatus !== existing.estadoActual) {
      await audit(user.username, "actualizar_estado", "despacho", `${shipment.codigoTracking} -> ${nextStatus}`, tx, user.id);
    }

    if (includeNotifications && nextStatus && nextStatus !== existing.estadoActual && shipment.emailCliente) {
      sendTrackingUpdate(
        shipment.emailCliente,
        shipment.codigoTracking,
        nextStatus,
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

export async function updateShipmentStatus(user, body) {
  const includeNotifications = await hasShipmentNotificationColumns();
  const allowed = ["registrado", "en tránsito", "entregado/cerrado"];
  if (!allowed.includes(body.status)) {
    return { error: "Estado no permitido", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.despacho.findUnique({
      where: { id: body.id },
      select: shipmentSelect(includeNotifications)
    });
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
      select: shipmentSelect(includeNotifications)
    });
    await audit(user.username, "actualizar_estado", "despacho", `${shipment.codigoTracking} -> ${body.status}`, tx, user.id);

    if (includeNotifications && shipment.emailCliente) {
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

function normalizeProductPayload(body) {
  const presentations = Array.isArray(body.presentations)
    ? body.presentations
      .map((presentation) => ({
        unit: String(presentation.unit || "").trim(),
        prices: Array.isArray(presentation.prices)
          ? presentation.prices
            .map((price) => ({
              currency: String(price.currency || "").trim(),
              amount: String(price.amount ?? "").trim()
            }))
            .filter((price) => price.currency || price.amount)
          : []
      }))
      .filter((presentation) => presentation.unit || presentation.prices.length)
    : [];

  if (!presentations.length && body.unit) {
    presentations.push({
      unit: body.unit,
      prices: [{ currency: body.currency || "USD", amount: String(body.price ?? "") }]
    });
  }

  return {
    name: String(body.name || "").trim(),
    description: String(body.description || "").trim(),
    imageUrl: String(body.imageUrl || "").trim(),
    publish: Boolean(body.publish),
    active: body.active !== false,
    presentations
  };
}

function validateProductPayload(payload) {
  const missing = [];
  if (!payload.name) missing.push("nombre");
  if (!payload.description) missing.push("descripcion");

  const normalizedPresentations = [];
  for (const presentation of payload.presentations) {
    if (!PRODUCT_UNITS.includes(presentation.unit)) {
      missing.push(`unidad ${presentation.unit || "vacia"}`);
      continue;
    }

    const prices = [];
    const currencies = new Set();
    for (const price of presentation.prices) {
      if (!price.amount) continue;
      if (!PRODUCT_CURRENCIES.includes(price.currency)) {
        missing.push(`moneda ${price.currency || "vacia"}`);
        continue;
      }
      if (currencies.has(price.currency)) {
        missing.push(`moneda duplicada ${presentation.unit}/${price.currency}`);
        continue;
      }
      currencies.add(price.currency);
      if (!validPriceValue(price.amount)) {
        missing.push(`precio ${presentation.unit}/${price.currency}`);
        continue;
      }
      prices.push({
        moneda: price.currency,
        monto: Number(price.amount).toFixed(2)
      });
    }

    normalizedPresentations.push({ tipoUnidad: presentation.unit, prices });
  }

  const hasValidPrice = normalizedPresentations.some((presentation) => presentation.prices.length > 0);
  if (payload.publish) {
    if (!normalizedPresentations.length) missing.push("presentacion");
    if (!hasValidPrice) missing.push("precio");
  }

  if (missing.length) {
    return { error: `Producto incompleto: ${[...new Set(missing)].join(", ")}`, status: 400 };
  }

  return { presentations: normalizedPresentations.filter((presentation) => presentation.prices.length > 0) };
}

export async function createProduct(user, body) {
  const payload = normalizeProductPayload(body);
  const validation = validateProductPayload(payload);
  if (validation.error) return validation;

  return prisma.$transaction(async (tx) => {
    const product = await tx.producto.create({
      data: {
        activo: true,
        imagenUrl: payload.imageUrl || null,
        estadoPublicacion: payload.publish ? "publicado" : "borrador",
        traducciones: {
          create: {
            idioma: "es",
            titulo: payload.name,
            cuerpo: payload.description,
            estado: payload.publish ? "publicado" : "borrador"
          }
        },
        presentaciones: {
          create: validation.presentations.map((presentation) => ({
            tipoUnidad: presentation.tipoUnidad,
            precios: {
              create: presentation.prices
            }
          }))
        }
      },
      include: { traducciones: true, presentaciones: { include: { precios: true } } }
    });
    await audit(user.username, "crear", "producto", payload.name, tx, user.id);
    return { item: serializeProduct(product, "es") };
  });
}

export async function updateProduct(user, body) {
  if (!body.id) return { error: "Producto no encontrado", status: 404 };
  const payload = normalizeProductPayload(body);
  const validation = validateProductPayload(payload);
  if (validation.error) return validation;

  return prisma.$transaction(async (tx) => {
    const existing = await tx.producto.findUnique({ where: { id: body.id } });
    if (!existing) return { error: "Producto no encontrado", status: 404 };

    await tx.traduccion.upsert({
      where: { productoId_idioma: { productoId: body.id, idioma: "es" } },
      update: {
        titulo: payload.name,
        cuerpo: payload.description,
        estado: payload.publish ? "publicado" : "borrador"
      },
      create: {
        productoId: body.id,
        idioma: "es",
        titulo: payload.name,
        cuerpo: payload.description,
        estado: payload.publish ? "publicado" : "borrador"
      }
    });

    await tx.presentacionLogistica.deleteMany({ where: { productoId: body.id } });

    const product = await tx.producto.update({
      where: { id: body.id },
      data: {
        activo: payload.active,
        imagenUrl: payload.imageUrl || null,
        estadoPublicacion: payload.publish ? "publicado" : "borrador",
        presentaciones: {
          create: validation.presentations.map((presentation) => ({
            tipoUnidad: presentation.tipoUnidad,
            precios: {
              create: presentation.prices
            }
          }))
        }
      },
      include: { traducciones: true, presentaciones: { include: { precios: true } } }
    });

    await audit(user.username, "actualizar", "producto", payload.name, tx, user.id);
    return { item: serializeProduct(product, "es") };
  });
}

export async function deleteProduct(user, body) {
  if (!body.id) return { error: "Producto no encontrado", status: 404 };

  return prisma.$transaction(async (tx) => {
    const existing = await tx.producto.findUnique({
      where: { id: body.id },
      include: { traducciones: true, presentaciones: { include: { precios: true } } }
    });
    if (!existing) return { error: "Producto no encontrado", status: 404 };

    const product = await tx.producto.update({
      where: { id: body.id },
      data: { activo: false, estadoPublicacion: "borrador" },
      include: { traducciones: true, presentaciones: { include: { precios: true } } }
    });

    await audit(user.username, "eliminar", "producto", serializeProduct(existing, "es").name || body.id, tx, user.id);
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
        urlEvidencia: body.imageUrl || null,
        estadoVigencia: valid ? "vigente" : "vencida",
        publicado: valid && body.publish !== false
      }
    });
    await audit(user.username, "crear", "certificacion", body.certType, tx, user.id);
    return { item: serializeCertificate(certificate) };
  });
}

export async function updateCertificate(user, body) {
  if (!body.id) return { error: "Certificacion no encontrada", status: 404 };
  if (!["SENASA", "BRC", "ISO", "BASC"].includes(body.certType) || !body.validUntil || !body.evidence) {
    return { error: "Certificacion incompleta", status: 400 };
  }

  return prisma.$transaction(async (tx) => {
    const existing = await tx.certificacion.findUnique({ where: { id: body.id } });
    if (!existing) return { error: "Certificacion no encontrada", status: 404 };

    const validUntil = new Date(`${body.validUntil}T00:00:00.000Z`);
    const valid = validUntil >= new Date();
    const certificate = await tx.certificacion.update({
      where: { id: body.id },
      data: {
        tipo: body.certType,
        fechaVencimiento: validUntil,
        evidencia: body.evidence,
        urlEvidencia: body.imageUrl || null,
        estadoVigencia: valid ? "vigente" : "vencida",
        publicado: valid && body.publish !== false
      }
    });

    await audit(user.username, "actualizar", "certificacion", body.certType, tx, user.id);
    return { item: serializeCertificate(certificate) };
  });
}

export async function deleteCertificate(user, body) {
  if (!body.id) return { error: "Certificacion no encontrada", status: 404 };

  return prisma.$transaction(async (tx) => {
    const existing = await tx.certificacion.findUnique({ where: { id: body.id } });
    if (!existing) return { error: "Certificacion no encontrada", status: 404 };

    const certificate = await tx.certificacion.update({
      where: { id: body.id },
      data: { publicado: false, estadoVigencia: "retirada" }
    });

    await audit(user.username, "eliminar", "certificacion", existing.tipo, tx, user.id);
    return { item: serializeCertificate(certificate) };
  });
}

async function generateTrackingCode(tx) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const random = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
    const code = `NDX-${random}-${new Date().getFullYear()}`;
    const existing = await tx.despacho.findUnique({
      where: { codigoTracking: code },
      select: { id: true }
    });
    if (!existing) return code;
  }
  throw new Error("No se pudo generar un codigo de tracking unico.");
}
