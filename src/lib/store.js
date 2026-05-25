import bcrypt from "bcryptjs";

const now = new Date().toISOString();

const initialProducts = [
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

const initialCertificates = [
  { id: "cert-senasa", type: "SENASA", status: "vigente", validUntil: "2026-12-31", evidence: "Certificado fitosanitario vigente", published: true },
  { id: "cert-brc", type: "BRC", status: "vigente", validUntil: "2026-10-15", evidence: "Evidencia de inocuidad alimentaria", published: true },
  { id: "cert-iso", type: "ISO", status: "vigente", validUntil: "2027-02-20", evidence: "Sistema de gestion de calidad", published: true },
  { id: "cert-basc-old", type: "BASC", status: "vencida", validUntil: "2024-09-01", evidence: "Registro historico conservado", published: false }
];

const initialShipments = [
  {
    id: "ship-001",
    code: "NDX-8Q4M-2026",
    client: "Andes Import LLC",
    destination: "Miami, Estados Unidos",
    product: "Aceituna de mesa",
    currentStatus: "en tránsito",
    createdAt: "2026-05-01T09:15:00.000Z",
    updatedAt: "2026-05-23T15:20:00.000Z",
    active: true,
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
    active: true,
    history: [
      { status: "registrado", at: "2026-04-20T11:40:00.000Z", responsible: "Admin Operativo", note: "Codigo generado." },
      { status: "en tránsito", at: "2026-04-30T08:00:00.000Z", responsible: "Admin Operativo", note: "Salida confirmada." },
      { status: "entregado/cerrado", at: "2026-05-18T18:05:00.000Z", responsible: "Admin Operativo", note: "Entrega cerrada." }
    ]
  }
];

const passwordHash = bcrypt.hashSync("Nodiex2026!", 10);

const initialUsers = [
  { id: "u-admin", username: "admin", passwordHash, role: "superadmin", failedAttempts: 0, lockedUntil: null },
  { id: "u-operativo", username: "operativo", passwordHash, role: "operativo", failedAttempts: 0, lockedUntil: null },
  { id: "u-comercial", username: "comercial", passwordHash, role: "comercial", failedAttempts: 0, lockedUntil: null },
  { id: "u-gerencia", username: "gerencia", passwordHash, role: "gerencia", failedAttempts: 0, lockedUntil: null }
];

const globalStore = globalThis.__nodiexStore ?? {
  products: initialProducts,
  certificates: initialCertificates,
  shipments: initialShipments,
  users: initialUsers,
  audit: [
    { id: "audit-seed", user: "sistema", operation: "seed", entity: "sistema", createdAt: now, detail: "Datos iniciales cargados." }
  ],
  rateLimit: new Map()
};

globalThis.__nodiexStore = globalStore;

export const store = globalStore;

export function audit(user, operation, entity, detail) {
  const event = {
    id: crypto.randomUUID(),
    user,
    operation,
    entity,
    detail,
    createdAt: new Date().toISOString()
  };
  store.audit.unshift(event);
  return event;
}

export function publicProduct(product, lang) {
  const base = product.translations.es;
  const localized = product.translations[lang] ?? base;
  const fallback = !product.translations[lang];
  return { ...product, name: localized.name, description: localized.description, fallback };
}

export function getVisibleProducts(lang) {
  return store.products
    .filter((product) => product.active && product.published && product.presentations?.some((item) => Object.keys(item.prices ?? {}).length))
    .map((product) => publicProduct(product, lang));
}

export function getVisibleCertificates() {
  const today = new Date();
  return store.certificates.filter((certificate) => certificate.published && certificate.status === "vigente" && new Date(certificate.validUntil) >= today);
}
