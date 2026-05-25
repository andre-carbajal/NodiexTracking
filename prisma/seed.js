const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const roles = [
  {
    id: "role-superadmin",
    nombreRol: "superadmin",
    descripcion: "Usuario superadministrador designado por gerencia.",
    permisos: ["shipments:write", "catalog:write", "certificates:write", "content:write", "audit:read", "roles:manage"]
  },
  {
    id: "role-operativo",
    nombreRol: "operativo",
    descripcion: "Administrador operativo para despachos y tracking.",
    permisos: ["shipments:write", "audit:read"]
  },
  {
    id: "role-comercial",
    nombreRol: "comercial",
    descripcion: "Administrador comercial para catalogo, precios, certificaciones y traducciones.",
    permisos: ["catalog:write", "certificates:write", "content:write"]
  },
  {
    id: "role-gerencia",
    nombreRol: "gerencia",
    descripcion: "Gerencia general con supervision y auditoria.",
    permisos: ["audit:read"]
  },
  {
    id: "role-cliente-b2b-publico",
    nombreRol: "cliente_b2b_publico",
    descripcion: "Cliente B2B internacional con acceso publico sin autenticacion.",
    permisos: ["tracking:read", "catalog:read", "certificates:read"]
  }
];

const products = [
  {
    id: "prod-olive",
    active: true,
    published: true,
    translations: {
      es: { name: "Aceituna de mesa", description: "Producto seleccionado para exportación, calibrado y preparado para compradores internacionales." },
      en: { name: "Table olives", description: "Selected export-ready product, graded and prepared for international buyers." },
      pt: { name: "Azeitona de mesa", description: "Produto selecionado para exportação, calibrado e preparado para compradores internacionais." }
    },
    presentations: [
      { unit: "TM", prices: { PEN: 4200, USD: 1125, EUR: 1035 } },
      { unit: "Contenedor 20'", prices: { USD: 21400, EUR: 19600 } }
    ]
  },
  {
    id: "prod-oregano",
    active: true,
    published: true,
    translations: {
      es: { name: "Orégano seco", description: "Lote agroexportable con control de calidad y documentación comercial disponible." },
      en: { name: "Dried oregano", description: "Exportable agricultural lot with quality control and commercial documentation available." }
    },
    presentations: [
      { unit: "TM", prices: { PEN: 8800, USD: 2350, EUR: 2160 } },
      { unit: "Contenedor 40'", prices: { USD: 46800 } }
    ]
  }
];

const certificates = [
  { id: "cert-senasa", type: "SENASA", status: "vigente", validUntil: "2026-12-31", evidence: "Certificado fitosanitario vigente", published: true },
  { id: "cert-brc", type: "BRC", status: "vigente", validUntil: "2026-10-15", evidence: "Evidencia de inocuidad alimentaria", published: true },
  { id: "cert-iso", type: "ISO", status: "vigente", validUntil: "2027-02-20", evidence: "Sistema de gestion de calidad", published: true },
  { id: "cert-basc-old", type: "BASC", status: "vencida", validUntil: "2024-09-01", evidence: "Registro historico conservado", published: false }
];

const shipments = [
  {
    id: "ship-001",
    code: "NDX-8Q4M-2026",
    client: "Andes Import LLC",
    destination: "Miami, Estados Unidos",
    product: "Aceituna de mesa",
    currentStatus: "en tránsito",
    createdAt: "2026-05-01T09:15:00.000Z",
    updatedAt: "2026-05-23T15:20:00.000Z",
    history: [
      { status: "registrado", at: "2026-05-01T09:15:00.000Z", responsible: "Admin Operativo", note: "Despacho registrado en NODIEX." },
      { status: "en tránsito", at: "2026-05-23T15:20:00.000Z", responsible: "Admin Operativo", note: "Contenedor en ruta internacional." }
    ]
  },
  {
    id: "ship-002",
    code: "NDX-P7K2-2026",
    client: "Lusitana Foods",
    destination: "Lisboa, Portugal",
    product: "Orégano seco",
    currentStatus: "entregado/cerrado",
    createdAt: "2026-04-20T11:40:00.000Z",
    updatedAt: "2026-05-18T18:05:00.000Z",
    history: [
      { status: "registrado", at: "2026-04-20T11:40:00.000Z", responsible: "Admin Operativo", note: "Codigo generado." },
      { status: "en tránsito", at: "2026-04-30T08:00:00.000Z", responsible: "Admin Operativo", note: "Salida confirmada." },
      { status: "entregado/cerrado", at: "2026-05-18T18:05:00.000Z", responsible: "Admin Operativo", note: "Entrega cerrada." }
    ]
  }
];

async function main() {
  const passwordHash = bcrypt.hashSync("Nodiex2026!", 10);

  await prisma.$transaction(async (tx) => {
    await tx.bitacoraEvento.deleteMany();
    await tx.sesion.deleteMany();
    await tx.estadoDespacho.deleteMany();
    await tx.despacho.deleteMany();
    await tx.precio.deleteMany();
    await tx.presentacionLogistica.deleteMany();
    await tx.traduccion.deleteMany();
    await tx.contenido.deleteMany();
    await tx.producto.deleteMany();
    await tx.certificacion.deleteMany();
    await tx.usuarioRol.deleteMany();
    await tx.permiso.deleteMany();
    await tx.rol.deleteMany();
    await tx.usuario.deleteMany();

    for (const role of roles) {
      await tx.rol.create({
        data: {
          id: role.id,
          nombreRol: role.nombreRol,
          descripcion: role.descripcion,
          permisos: {
            create: role.permisos.map((permission) => {
              const [recurso, accion] = permission.split(":");
              return { id: `perm-${role.nombreRol}-${recurso}-${accion}`, recurso, accion };
            })
          }
        }
      });
    }

    const users = [
      { id: "u-admin", username: "admin", roleId: "role-superadmin" },
      { id: "u-operativo", username: "operativo", roleId: "role-operativo" },
      { id: "u-comercial", username: "comercial", roleId: "role-comercial" },
      { id: "u-gerencia", username: "gerencia", roleId: "role-gerencia" }
    ];

    for (const user of users) {
      await tx.usuario.create({
        data: {
          id: user.id,
          username: user.username,
          hashPassword: passwordHash,
          roles: { create: { rolId: user.roleId } }
        }
      });
    }

    for (const product of products) {
      await tx.producto.create({
        data: {
          id: product.id,
          activo: product.active,
          estadoPublicacion: product.published ? "publicado" : "borrador",
          traducciones: {
            create: Object.entries(product.translations).map(([idioma, value]) => ({
              id: `tr-${product.id}-${idioma}`,
              idioma,
              titulo: value.name,
              cuerpo: value.description,
              estado: "publicado"
            }))
          },
          presentaciones: {
            create: product.presentations.map((presentation, index) => ({
              id: `pres-${product.id}-${index + 1}`,
              tipoUnidad: presentation.unit,
              precios: {
                create: Object.entries(presentation.prices).map(([moneda, monto]) => ({
                  id: `price-${product.id}-${index + 1}-${moneda}`,
                  moneda,
                  monto
                }))
              }
            }))
          }
        }
      });
    }

    for (const certificate of certificates) {
      await tx.certificacion.create({
        data: {
          id: certificate.id,
          tipo: certificate.type,
          fechaVencimiento: new Date(`${certificate.validUntil}T00:00:00.000Z`),
          evidencia: certificate.evidence,
          estadoVigencia: certificate.status,
          publicado: certificate.published
        }
      });
    }

    for (const shipment of shipments) {
      await tx.despacho.create({
        data: {
          id: shipment.id,
          codigoTracking: shipment.code,
          cliente: shipment.client,
          destino: shipment.destination,
          producto: shipment.product,
          estadoActual: shipment.currentStatus,
          fechaRegistro: new Date(shipment.createdAt),
          fechaActualizacion: new Date(shipment.updatedAt),
          activo: true,
          estados: {
            create: shipment.history.map((event, index) => ({
              id: `state-${shipment.id}-${index + 1}`,
              estado: event.status,
              fechaHora: new Date(event.at),
              responsable: event.responsible,
              observacion: event.note
            }))
          }
        }
      });
    }

    await tx.bitacoraEvento.create({
      data: {
        id: "audit-seed",
        usuarioNombre: "sistema",
        accion: "seed",
        entidad: "sistema",
        detalle: { detail: "Datos iniciales cargados desde Prisma seed." }
      }
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
