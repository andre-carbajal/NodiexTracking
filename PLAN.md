# PLAN.md — Implementación Nodiex

**Sistema Web de Modernización Digital y Trazabilidad Logística**
**Stack actual:** Next.js 16 (App Router, JS), Prisma 7, PostgreSQL (Supabase), CSS custom, JWT + bcrypt
**Duración:** 10 semanas (09/04/2026 — 24/06/2026)

---

## FASE 1: CONCEPCIÓN (Semanas 1-2)

### 1.1 Revisión y ajustes del proyecto existente
- [x] Auditar `package.json`: verificar dependencias actualizadas y agregar las faltantes
- [x] Instalar dependencias nuevas: `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner` (Cloudflare R2)
- [x] Configurar variables de entorno en `.env.local`: `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_PUBLIC_URL`, `RESEND_API_KEY`
- [x] Revisar que `.gitignore` incluya `.env*.local`
- [x] Verificar deploy existente en Vercel y CI/CD (`.github/workflows/deploy.yml`)

### 1.2 Cloudflare R2 — Storage de archivos
- [x] Crear bucket en Cloudflare R2 para assets del proyecto
- [ ] Configurar políticas CORS en el bucket (permitir upload desde el dominio de la app)
- [x] Configurar subdominio público para assets (`pub-b8368783935b452db4d37c617979f165.r2.dev`)
- [x] Crear `src/lib/storage.js` con funciones: `uploadFile(buffer, key, contentType)`, `deleteFile(key)`, `getPublicUrl(key)`, `generateKey(prefix, filename)`
- [ ] Probar upload/download de un archivo de prueba desde el entorno local

### 1.3 Verificación del modelo de datos existente
- [x] Revisar schema de Prisma (`prisma/schema.prisma`): las 14 tablas reflejan las reglas de negocio
- [x] Verificar migraciones aplicadas en Supabase (3 migraciones existentes)
- [x] Agregar campo `imagen_url` a modelo `productos` (schema + migración + ALTER TABLE en SQL Editor)
- [x] Modelo `certificaciones` ya tiene `url_evidencia` y `evidencia` — no requiere campo adicional
- [ ] Ejecutar seed (`prisma/seed.js`) en entorno local y verificar datos de prueba
- [x] Verificar RLS (Row Level Security) habilitado en tablas públicas (migración 003)

---

## FASE 2: ELABORACIÓN (Semanas 3-4)

### 2.1 Refactorización del landing page — extracción de componentes
- [x] Extraer componente `<Header />` de `src/app/page.js` (logo, nav anclas, selector idioma, hamburger)
- [x] Extraer componente `<Hero />` (fondo, headline, CTAs, widget tracking embebido)
- [x] Extraer componente `<TrackingWidget />` (input código, botón consultar, skeleton carga, resultado)
- [x] Extraer componente `<TrackingResult />` (timeline estados, datos del despacho, ubicación)
- [x] Extraer componente `<AboutBand />` (sección "Sobre nosotros", imágenes, misión/visión)
- [x] Extraer componente `<CatalogSection />` (grid productos, filtros, ficha comercial lateral)
- [x] Extraer componente `<CertificatesStrip />` (badges de certificaciones vigentes)
- [x] Extraer componente `<SupportGrid />` (3 tarjetas: seguridad, tiempo real, soporte)
- [x] Extraer componente `<ContactForm />` (formulario funcional con validación)
- [x] Extraer componente `<Footer />` (logo, info contacto, link admin)
- [x] Crear `src/components/` y mover todos los componentes extraídos
- [x] Refactorizar `src/app/page.js` para que solo componga los componentes extraídos

### 2.2 Refactorización del panel admin — extracción de componentes
- [x] Extraer componente `<AdminLogin />` de `src/app/admin/page.js`
- [x] Extraer componente `<AdminDashboard />` (sidebar + área de contenido)
- [x] Extraer componente `<AdminSidebar />` (navegación por módulos)
- [x] Extraer componente `<DespachosList />` (tabla despachos)
- [x] Extraer componente `<DespachoForm />` (formulario crear/editar despacho)
- [x] Extraer componente `<EstadosTimeline />` (historial de estados con cambio de estado)
- [x] Extraer componente `<ProductosList />` (tabla productos)
- [x] Extraer componente `<ProductoForm />` (formulario crear/editar producto + presentaciones + precios)
- [x] Extraer componente `<CertificacionesList />` (tabla certificaciones)
- [x] Extraer componente `<CertificacionForm />` (formulario crear/editar certificación + upload)
- [x] Extraer componente `<TraduccionesEditor />` (pestañas ES/EN/PT por entidad)
- [x] Extraer componente `<BitacoraView />` (tabla auditoría con filtros)
- [x] Extraer componente `<UsuariosList />` y `<UsuarioForm />` (gestión de usuarios)
- [x] Refactorizar `src/app/admin/page.js` para que solo componga los componentes extraídos

### 2.3 Mejoras de arquitectura y seguridad
- [x] Crear `src/middleware.js` para proteger rutas `/admin` con verificación JWT
- [x] Mover verificación de token de localStorage a httpOnly cookie (más seguro)
- [x] Implementar helper `lib/validators.js`: sanitización de inputs, validación de formatos
- [x] Agregar headers de seguridad HTTP (CSP, HSTS, X-Content-Type-Options) en `next.config.mjs`

### 2.4 Mejoras de UX/UI transversales
- [x] Crear componente `<LoadingSkeleton />` (variantes: card, table-row, timeline, form)
- [x] Crear componente `<Toast />` para notificaciones de éxito/error (cambios en panel admin)
- [x] Crear componente `<EmptyState />` para listas vacías (sin productos, sin despachos, etc.)
- [x] Crear componente `<Pagination />` reutilizable para todas las tablas
- [x] Implementar manejo de errores global con `<ErrorBoundary />`
- [x] Agregar `loading.js` y `error.js` en rutas clave

---

## FASE 3: CONSTRUCCIÓN (Semanas 5-8)

### 3.1 Módulo de Order Tracking (Mejoras) — SEMANA 5

#### 3.1.1 Mejoras al endpoint de tracking público
- [x] Revisar `POST /api/tracking`: confirmar que valida formato, existencia y estado del código (RFF-02)
- [x] Verificar que responde con mensaje genérico para código inválido/inexistente (RN-02, sin exponer datos)
- [x] Verificar rate limiting: 30 consultas/10min/IP (RNF-03, RN-03) — actualmente es in-memory, migrar a Redis o mantener en memoria con advertencia en docs
- [x] Verificar registro en `bitacora_eventos` por cada consulta (RFF-19)
- [ ] Verificar tiempo de respuesta < 10 segundos (RNF-01) — test con 10k+ registros
- [x] Agregar endpoint `GET /api/public/tracking/[codigo]` como alternativa para links compartibles

#### 3.1.2 Mejoras al widget de tracking en landing page
- [x] Revisar `<TrackingWidget />`: input con validación visual de formato de código
- [x] Mostrar `<LoadingSkeleton />` durante la consulta (actualmente no tiene estado de carga)
- [x] Mostrar mensaje claro si se excede rate limit ("Demasiadas consultas. Intenta en X minutos")
- [x] Implementar `<TrackingResult />` con timeline visual de estados (íconos por estado, fechas, horas)
- [x] Mostrar datos del despacho: producto, cantidad, presentación logística, fecha estimada
- [x] Agregar botón "Compartir" o "Copiar enlace" para compartir resultado de tracking
- [ ] Hacer el widget completamente responsive (los clientes consultan desde smartphones)
- [x] Implementar multiidioma en el widget (ES/EN/PT según selector global)

#### 3.1.3 Página dedicada de tracking público
- [x] Crear ruta `/tracking` con página independiente (no solo widget en landing)
- [x] Si se accede a `/tracking/[codigo]`, pre-llenar el campo y ejecutar consulta automática
- [x] Diseñar layout limpio enfocado solo en la consulta de tracking
- [ ] Agregar favicon y metadatos específicos para SEO de la página de tracking

### 3.2 Módulo Panel Admin — Despachos — SEMANA 5-6

#### 3.2.1 CRUD de despachos (mejoras sobre lo existente)
- [x] Revisar `<DespachosList />`: debe mostrar tabla paginada con filtros (estado, fecha, código)
- [x] Implementar paginación real en endpoint `GET/POST /api/admin` para despachos
- [x] Revisar `<DespachoForm />`: campos requeridos (producto, presentación, cliente, fecha estimada)
- [x] Generar código tracking opaco no secuencial automáticamente (RN-01) — verificar implementación actual
- [x] Agregar validación de campos obligatorios antes de enviar (RN-04)
- [x] Mostrar mensajes de error específicos por campo en el formulario
- [x] Implementar edición de despacho existente (no solo creación)

#### 3.2.2 Gestión de estados de despacho
- [x] Implementar flujo de estados: Registrado → En Tránsito → Entregado (RN-05)
- [x] Validar secuencia: no permitir saltos inválidos sin motivo
- [x] Permitir reversión solo con motivo obligatorio y permiso de rol superior
- [x] Crear `<EstadosTimeline />`: historial visual con fecha, hora, estado, responsable, observación (RFF-06)
- [x] Botón "Agregar estado" con dropdown de estados permitidos según estado actual
- [x] Registrar cada cambio de estado en bitácora automáticamente (RN-13)

#### 3.2.3 Notificaciones automáticas de tracking
- [x] Configurar Resend (ya está en dependencias, verificar API key en `.env.local`)
- [x] Crear `lib/notifications.js`: función `sendTrackingUpdate(email, codigo, nuevoEstado)`
- [x] Al cambiar estado: disparar envío asíncrono (no bloquear la operación)
- [x] Email multiidioma según preferencia registrada del cliente (ES/EN/PT)
- [x] Registrar envío en bitácora
- [x] Agregar campo `email_cliente` al modelo `despachos` si no existe
- [x] Agregar campo `idioma_preferido` (ES/EN/PT) al modelo `despachos` si no existe

### 3.3 Módulo Catálogo — SEMANA 6-7

#### 3.3.1 Gestión de productos (mejoras)
- [x] Revisar `<ProductosList />`: tabla paginada con filtros por nombre y estado
- [x] Implementar paginación real en API para productos
- [x] Revisar `<ProductoForm />`: campos nombre, descripción + upload de imagen
- [x] Agregar upload de imagen del producto a Cloudflare R2 (`lib/storage.js`)
- [x] Mostrar preview de imagen antes de guardar
- [x] Validar campos obligatorios: nombre, descripción (RN-08)

#### 3.3.2 Gestión de presentaciones logísticas
- [x] En `<ProductoForm />`: sección "Presentaciones" dentro del formulario de producto
- [x] Selector de tipo de unidad: TM, Contenedor 20', Contenedor 40' (RN-06)
- [x] Agregar/eliminar presentaciones dinámicamente (múltiples por producto)
- [x] Validar que tipo de unidad sea uno de los 3 permitidos

#### 3.3.3 Gestión de precios multimoneda
- [x] En cada presentación: sub-sección "Precios"
- [x] Selector de moneda: PEN, USD, EUR (RN-07)
- [x] Campo monto: numérico con validación > 0 y 2 decimales máx (RN-07, RNF-06)
- [x] Agregar/quitar precios dinámicamente por presentación
- [x] Validar que al menos 1 precio esté definido para poder publicar (RN-08)

#### 3.3.4 Publicación controlada
- [x] Botón "Publicar" con validación previa de completitud (RN-08)
- [x] Indicador visual de estado: borrador (gris), completo no publicado (amarillo), publicado (verde)
- [x] Al publicar: verificar nombre, descripción, al menos 1 presentación, al menos 1 precio > 0
- [x] Producto incompleto no se puede publicar: mostrar lista de campos faltantes

#### 3.3.5 Mejoras al catálogo público
- [x] Revisar `<CatalogSection />`: los filtros actuales son decorativos, hacerlos funcionales
- [x] Implementar filtro real por nombre de producto en el frontend
- [x] Hacer funcional el botón "Descargar ficha técnica" (generar PDF simple con datos del producto)
- [x] Mejorar `<CatalogCard />` con imagen del producto, precios destacados en 3 monedas
- [x] Crear ruta `/productos` como página independiente (no solo sección en landing)
- [x] Crear ruta `/productos/[id]` con página de detalle de producto individual
- [x] Implementar SEO: metadatos dinámicos por producto y por idioma

### 3.4 Módulo de Certificaciones — SEMANA 7

#### 3.4.1 Gestión de certificaciones (mejoras)
- [ ] Revisar `<CertificacionesList />`: tabla paginada con filtros por tipo y estado
- [ ] Implementar paginación real en API para certificaciones
- [ ] Revisar `<CertificacionForm />`: campos tipo, fecha emisión, fecha vencimiento, upload archivo
- [ ] Agregar upload de archivo/evidencia a Cloudflare R2
- [ ] Validar que tenga tipo, fechas válidas y archivo adjunto (RN-09)
- [ ] Marcar automáticamente como "vencida" cuando `fechaVencimiento < hoy`
- [ ] Las certificaciones vencidas se conservan en BD pero no se muestran en portal (RN-09)

#### 3.4.2 Mejoras al portal público de certificaciones
- [ ] Revisar `<CertificatesStrip />`: actualmente muestra badges, mejorar diseño
- [ ] Hacer clic en badge → mostrar detalle (tipo, fechas, botón descargar evidencia)
- [ ] Crear ruta `/certificaciones` como página independiente
- [ ] Mostrar solo certificaciones vigentes (RN-14)
- [ ] Implementar multiidioma en certificaciones

### 3.5 Módulo de Traducciones y Multiidioma — SEMANA 7-8

#### 3.5.1 Mejoras al sistema i18n existente
- [ ] Revisar `lib/i18n.js`: el sistema actual tiene cadenas estáticas ES/EN/PT
- [ ] Implementar enrutamiento por idioma: `/es/...`, `/en/...`, `/pt/...` (middleware i18n)
- [ ] El idioma debe persistir en cookie/URL, no solo en estado React local
- [ ] Configurar `next.config.mjs` para soportar rutas multiidioma

#### 3.5.2 Gestión de traducciones en panel admin
- [ ] Crear `<TraduccionesEditor />`: pestañas ES / EN / PT para cada contenido traducible
- [ ] Español obligatorio: no se puede guardar sin contenido en ES (RN-10)
- [ ] Inglés y portugués opcionales: si vacíos, fallback a español con indicador visual "[ES]"
- [ ] Aplicar editor de traducciones a: productos (nombre, descripción), certificaciones, secciones de contenido
- [ ] Crear endpoints para CRUD de traducciones en `/api/admin`

#### 3.5.3 Gestión de contenido corporativo (tablas `contenidos` + `traducciones`)
- [ ] Activar las tablas `contenidos` y `traducciones` que ya existen pero no se usan
- [ ] Crear página `/admin/contenido` con lista de secciones editables (RFF-07)
- [ ] Secciones: Quiénes Somos, Misión, Visión, Contacto, Footer
- [ ] Cada sección con campos de texto (no rich text) en ES/EN/PT (RFF-08)
- [ ] Cambios se reflejan inmediatamente en el portal público
- [ ] Reemplazar textos hardcodeados en landing page por contenido dinámico desde BD

### 3.6 Gestión de Usuarios y Roles — SEMANA 8

#### 3.6.1 Panel de gestión de usuarios
- [ ] Crear `<UsuariosList />`: tabla de usuarios con búsqueda y filtro por estado
- [ ] Crear `<UsuarioForm />`: crear/editar usuario (username, contraseña, roles asignados)
- [ ] Asignar/desasignar roles mediante checkboxes (operativo, comercial, gerencia)
- [ ] Activar/desactivar usuario (no eliminar físicamente)
- [ ] Endpoints CRUD de usuarios en `/api/admin` (protegidos por rol superadmin)
- [ ] Validar que solo superadmin puede gestionar usuarios y roles

#### 3.6.2 Visualización de roles y permisos
- [ ] Crear página `/admin/roles` con tabla de roles existentes
- [ ] Mostrar matriz de permisos por rol (lectura visual, no edición en v1)
- [ ] Los 4 roles ya están definidos en `lib/auth.js` y seed: superadmin, operativo, comercial, gerencia

### 3.7 Bitácora y Auditoría — SEMANA 8

#### 3.7.1 Visualización de bitácora
- [ ] Crear `<BitacoraView />` accesible solo para roles gerencia y superadmin
- [ ] Filtros: por usuario, fecha (rango), entidad (despachos/productos/certificaciones), tipo operación
- [ ] Tabla con: fecha/hora, usuario, entidad, acción, detalle expandible
- [ ] Implementar paginación real
- [ ] Endpoint `GET /api/admin?action=audit` con filtros (revisar implementación actual en `store.js`)

#### 3.7.2 Reporte de auditoría
- [ ] Botón "Exportar" en `<BitacoraView />` (RFF-21)
- [ ] Generar CSV con los eventos filtrados
- [ ] Columnas: Fecha, Hora, Usuario, Entidad, Operación, Detalle

### 3.8 Features adicionales del portal público — SEMANA 8

#### 3.8.1 Formulario de contacto funcional
- [x] Revisar `<ContactForm />`: actualmente no tiene handler de submit
- [x] Implementar endpoint `POST /api/public/contacto`
- [x] Campos: nombre, empresa, email, país, mensaje
- [x] Validar campos obligatorios y formato de email
- [ ] Enviar email a Nodiex con los datos del formulario (Resend)
- [x] Mostrar mensaje de confirmación al usuario
- [x] Implementar rate limiting en endpoint de contacto (evitar spam)

#### 3.8.2 Descarga de ficha técnica
- [ ] Implementar endpoint `GET /api/public/productos/[id]/ficha`
- [ ] Generar PDF simple con datos del producto, presentaciones y precios
- [ ] Botón "Descargar ficha técnica" funcional en cada producto del catálogo

---

## FASE 4: TRANSICIÓN (Semanas 9-10)

### 4.1 Pruebas funcionales — SEMANA 9

- [ ] **Tracking:** crear despacho → generar código → consultar tracking público → ver estados
- [ ] **Tracking:** probar código inválido → respuesta genérica sin datos sensibles (RN-02)
- [ ] **Tracking:** probar rate limiting (>30 consultas en 10 min) → bloqueo efectivo (RN-03)
- [ ] **Catálogo:** crear producto → agregar presentación → agregar precios → publicar → ver en portal
- [ ] **Catálogo:** probar que producto incompleto no se puede publicar (RN-08)
- [ ] **Catálogo:** validar unidades (TM/20'/40') y monedas (PEN/USD/EUR) — rechazar inválidas (RN-06, RN-07)
- [ ] **Catálogo:** probar descarga de ficha técnica PDF
- [ ] **Certificaciones:** crear → adjuntar evidencia → publicar → ver en portal → verificar vencidas ocultas (RN-09)
- [ ] **Auth:** login exitoso → JWT → acceso panel → logout → acceso denegado (RN-11)
- [ ] **Auth:** bloqueo tras 5 intentos fallidos (RNF-02)
- [ ] **Auth:** JWT expirado (8h) → rechaza acceso → redirige a login
- [ ] **Roles:** usuario operativo no puede gestionar catálogo ni certificaciones (RN-12)
- [ ] **Roles:** usuario comercial no puede gestionar usuarios
- [ ] **Roles:** gerencia puede ver bitácora pero no crear/editar despachos
- [ ] **Multiidioma:** cambiar ES/EN/PT → verificar fallback a ES donde no hay traducción (RN-10)
- [ ] **Multiidioma:** contenido en EN y PT se muestra correctamente donde existe
- [ ] **Contenido dinámico:** editar sección en panel → cambio visible en portal público (RFF-08)
- [ ] **Bitácora:** verificar que toda operación crítica queda registrada (RN-13)
- [ ] **Bitácora:** probar exportación de reporte CSV
- [ ] **Contacto:** enviar formulario → verificar email recibido → mensaje confirmación
- [ ] **Upload:** subir imagen de producto → ver en portal → eliminar producto → archivo limpiado de R2
- [ ] **Upload:** subir evidencia de certificación → descargar desde portal público

### 4.2 Pruebas no funcionales — SEMANA 9

- [ ] Prueba de carga: 500 usuarios concurrentes en endpoint tracking (RNF-07)
- [ ] Tiempo de respuesta tracking < 10 segundos con 10,000+ despachos (RNF-01)
- [ ] Tiempo de carga del panel admin < 2 segundos
- [ ] Diseño responsive: verificar en 320px, 768px, 1024px, 1440px
- [ ] Compatibilidad: Chrome 110+, Firefox 110+, Safari 16+, Edge 110+
- [ ] HTTPS/TLS 1.3 activo en producción (Vercel)
- [ ] Contraseñas NUNCA en texto plano (bcrypt factor 10)
- [ ] BD no accesible desde internet (solo API via Prisma + RLS activo)
- [ ] Rate limiting funcional post-deploy (in-memory reset en cada deploy/serverless cold start — documentar)
- [ ] Sanitización de inputs (XSS, SQL injection mitigado por Prisma parametrizado)

### 4.3 Documentación — SEMANA 9-10

- [ ] README.md del repositorio con instrucciones de setup local (actualizar CONTRIBUTION.md existente)
- [ ] Documentar endpoints de la API REST (lista de rutas, métodos, parámetros, respuestas)
- [ ] Documentar modelo de base de datos (diagrama o referencia al schema de Prisma)
- [ ] Documentar procedimiento de despliegue (Vercel + Supabase + Cloudflare R2)
- [ ] Documentar procedimiento de backup/restore (snapshots de Supabase)
- [ ] Documentar variables de entorno necesarias (`.env.example` existente, actualizar si faltan)

### 4.4 Despliegue a producción — SEMANA 10

- [ ] Configurar variables de entorno de producción en Vercel Dashboard
- [ ] Configurar dominio corporativo `nodiexdelperu.com` apuntando a Vercel
- [ ] Verificar SSL/TLS automático (Vercel)
- [ ] Ejecutar migraciones de BD en Supabase producción
- [ ] Ejecutar seed de roles y usuarios en producción
- [ ] Verificar deploy exitoso: CI/CD pasa lint → build → migrate → smoke test
- [ ] Verificar portal público, tracking, panel admin y catálogo en producción
- [ ] Verificar Cloudflare R2 sirviendo imágenes/archivos en producción
- [ ] Configurar snapshots diarios automáticos en Supabase

---

## REGLAS DE NEGOCIO — Checklist de Verificación

- [x] RN-01: Todo despacho genera código opaco único, no secuencial, no reutilizable
- [x] RN-02: Tracking público devuelve mensaje genérico para código inválido
- [x] RN-03: Rate limiting 30 consultas/10min/IP en endpoint tracking
- [x] RN-04: Solo usuario autenticado con JWT + rol operativo actualiza estados
- [x] RN-05: Flujo de estados: Registrado → En Tránsito → Entregado (sin saltos)
- [x] RN-06: Unidades de catálogo restringidas a TM, Contenedor 20', Contenedor 40'
- [x] RN-07: Monedas PEN/USD/EUR con monto > 0 y formato decimal válido
- [x] RN-08: Producto publicable solo con nombre, descripción, presentación, al menos 1 precio > 0
- [ ] RN-09: Certificaciones con tipo, vigencia y archivo; vencidas se conservan no vigentes
- [ ] RN-10: ES obligatorio; EN/PT progresivos con fallback a ES con indicador visual
- [x] RN-11: Panel requiere JWT vigente (8h); bloqueo tras 5 intentos fallidos
- [ ] RN-12: Autorización por rol y matriz de permisos en cada operación crítica
- [x] RN-13: Bitácora obligatoria en cambios críticos; si falla bitácora, operación se revierte
- [ ] RN-14: Solo registros publicables/activos se exponen en portal público
- [ ] RN-15: Cumplimiento Ley 29733: minimización datos, acceso restringido, cifrado
- [ ] RN-16: Documentación de usuario completada y entregada (README, CONTRIBUTION, docs API)
