**![C:\Users\EPIS\Documents\upt.png](data:image/png;base64...)**

**UNIVERSIDAD PRIVADA DE TACNA**

**FACULTAD DE INGENIERÍA**

**Escuela Profesional de Ingeniería de Sistemas**

**Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.**

Curso: Gestión de Proyectos

Docente: Ing. Dr. Matha Paredes Vignola

Integrantes:

**Carbajal Vargas, Andre Alejandro (2023077287)**

**Llanos Niño, Vincenzo Rafael (2023076797)**

**Yupa Gomez, Fatima Sofia (2023076618)**

**Zapana Murillo, Kiara Holly (2023077087)**

**Tacna – Perú**

**2026**

| CONTROL DE VERSIONES | | | | | |
| --- | --- | --- | --- | --- | --- |
| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| 1.0 | KHZM / FSYP | VRLN / AACV | KHZM / AACV | 14/05/2026 | V1.0 |

Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.

Documento de Arquitectura de Software

Versión 1.0

| CONTROL DE VERSIONES | | | | | |
| --- | --- | --- | --- | --- | --- |
| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| 1.0 | KHZM / FSYP | VRLN / AACV | KHZM / AACV | 14/05/2026 | V1.0 |

ÍNDICE GENERAL

[**1. INTRODUCCIÓN 4**](#_heading=h.dzu5t3wt0m6m)

[1.1. Propósito (Diagrama 4+1) 4](#_heading=h.4piw0gij63lx)

[1.2. Alcance 4](#_heading=h.bb847dejasep)

[1.3. Definición, siglas y abreviaturas 5](#_heading=h.tx00097wtecl)

[1.4. Organización del documento 5](#_heading=h.u3xtjoh4qk2q)

[**2. OBJETIVOS Y RESTRICCIONES ARQUITECTONICAS 6**](#_heading=h.z9gggk72th7g)

[2.1. Priorización de requerimientos 6](#_heading=h.7a287xehilxq)

[2.1.1. Requerimientos Funcionales 6](#_heading=h.9ixx2s4nwpam)

[2.1.2. Requerimientos No Funcionales – Atributos de Calidad 7](#_heading=h.j4zzdh4li94e)

[2.2. Restricciones 8](#_heading=h.p1t0sg55638r)

[**3. REPRESENTACIÓN DE LA ARQUITECTURA DEL SISTEMA 8**](#_heading=h.u303mec33cob)

[3.1. Vista de Caso de uso 8](#_heading=h.v5smhht1gosq)

[3.1.1. Diagramas de Casos de Uso 9](#_heading=h.qdnt5yr7sc37)

[3.2. Vista Lógica 9](#_heading=h.lzv336zbbixq)

[3.2.1. Diagrama de Subsistemas (paquetes) 9](#_heading=h.iyj8hzwlwicy)

[3.2.2. Diagrama de Secuencia (vista de diseño) 10](#_heading=h.20tgixituh7)

[3.2.3. Diagrama de Colaboración (vista de diseño) 10](#_heading=h.66l2mi8kz46k)

[3.2.4. Diagrama de Objetos 10](#_heading=h.rx6alu8hk6f0)

[3.2.5. Diagrama de Clases 10](#_heading=h.puotovbysf4f)

[3.2.6. Diagrama de Base de datos (relacional o no relacional) 11](#_heading=h.qnlw7h8ps5na)

[3.3. Vista de Implementación (vista de desarrollo) 11](#_heading=h.b1ji0xmbds0t)

[3.3.1. Diagrama de arquitectura software (paquetes) 11](#_heading=h.k9gjnm7j5uul)

[3.3.2. Diagrama de arquitectura del sistema (Diagrama de componentes) 12](#_heading=h.aumymk493g4x)

[3.4. Vista de procesos 12](#_heading=h.3qw5ynjhe85z)

[3.4.1. Diagrama de Procesos del sistema (diagrama de actividad) 13](#_heading=h.8ttiip60h34x)

[3.5. Vista de Despliegue (vista física) 13](#_heading=h.tnx0ta1eku3)

[3.5.1. Diagrama de despliegue 13](#_heading=h.dnv9onihipmc)

[**4. ATRIBUTOS DE CALIDAD DEL SOFTWARE 14**](#_heading=h.me8lfzl4up2a)

[4.1. Escenario de Funcionalidad 14](#_heading=h.bsqrf1wqomko)

[4.2. Escenario de Usabilidad 15](#_heading=h.iemy4cq8f6oz)

[4.3. Escenario de confiabilidad 15](#_heading=h.oa9v11usj75c)

[4.4. Escenario de rendimiento 16](#_heading=h.1fr7744rzs8b)

[4.5. Escenario de mantenibilidad 17](#_heading=h.sllwswgr9pcb)

[4.6. Otros Escenarios 17](#_heading=h.p5jefyzciyu6)

[4.6.1. Escalabilidad 17](#_heading=h.g48slxa9lml3)

[4.6.2. Seguridad (OWASP Top 10) 18](#_heading=h.hxo04aym9gzx)

[4.6.3. Portabilidad 18](#_heading=h.9r62429orcvb)

# **INTRODUCCIÓN**

## **Propósito (Diagrama 4+1)**

El presente Documento de Arquitectura de Software (SAD) adopta el modelo de vistas 4+1 (Kruchten, 1995) para describir la arquitectura del Sistema Web de Modernización Digital y Trazabilidad Logística de Exportaciones de NODIEX DEL PERÚ S.A.C. Su propósito es ofrecer una visión global, estructurada y comprensible de las decisiones de diseño arquitectónico, cubriendo las perspectivas funcional, lógica, de implementación, de procesos y de despliegue.

El documento está dirigido a la gerencia de NODIEX DEL PERÚ S.A.C., al equipo de desarrollo (Nextrack S.A.C.) y al docente evaluador del curso de Gestión de Proyectos de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Privada de Tacna.

La arquitectura descrita tiene como objetivos generales de diseño:

* Garantizar tiempos de consulta de tracking inferiores a 10 segundos.
* Proveer un panel administrativo operable sin conocimientos técnicos avanzados.
* Soporta contenido multi idioma (ES/EN/PT) con escalabilidad progresiva.
* Proteger la información corporativa mediante autenticación JWT, cifrado bcrypt y TLS 1.3.
* Alcanzar una disponibilidad del 99.5% mensual sobre infraestructura cloud (Vercel + VPS).

## **Alcance**

El sistema web abarca cinco módulos funcionales principales desplegados sobre infraestructura Cloud-Native (Vercel + VPS Elástika):

* Módulo de Order Tracking: portal público de seguimiento de despachos internacionales mediante códigos únicos opacos, sin requerir autenticación del cliente B2B.
* Módulo de Panel Administrativo CMS: interfaz de gestión interna para el registro de envíos, catálogo de productos, precios y publicación de certificaciones oficiales.
* Módulo de Catálogo Multiidioma: portafolio de productos agroexportadores en español, inglés y portugués, con precios en PEN, USD y EUR.
* Módulo de Certificaciones: sección pública para la visualización y descarga de certificaciones vigentes (SENASA, BRC, ISO, BASC).
* Módulo de Seguridad: autenticación JWT, cifrado bcrypt, roles y permisos, bitácora de auditoría.

Quedan fuera del alcance de esta versión: la integración directa con sistemas aduaneros (SUNAT, navieras), el procesamiento de pagos en línea y la automatización completa de negociaciones comerciales externas.

## **Definición, siglas y abreviaturas**

| Término / Sigla | Definición |
| --- | --- |
| **SAD** | Software Architecture Document. Documento de Arquitectura de Software. |
| **B2B** | Business-to-Business. Modelo de negocio entre empresas exportadoras e importadoras. |
| **JWT** | JSON Web Token. Estándar RFC 7519 para transmisión segura de información como objeto JSON firmado. |
| **API REST** | Interfaz de programación basada en el estilo arquitectónico REST sobre protocolo HTTP. |
| **CDN** | Content Delivery Network. Red de distribución de contenido con baja latencia global. |
| **VPS** | Virtual Private Server. Servidor virtual privado alojado en la nube. |
| **SSR** | Server-Side Rendering. Renderizado del lado del servidor para mejor SEO y rendimiento. |
| **Next.js** | Framework React para aplicaciones web con SSR y generación de sitios estáticos. |
| **PostgreSQL** | Sistema gestor de bases de datos relacional de código abierto. |
| **ORM** | Object-Relational Mapper. Capa de abstracción entre el código y la base de datos (Prisma ORM). |
| **SENASA** | Servicio Nacional de Sanidad Agraria del Perú. Emite certificaciones fitosanitarias para exportación. |
| **BRC** | British Retail Consortium. Certificación internacional de seguridad alimentaria. |
| **BASC** | Business Alliance for Secure Commerce. Certificación de seguridad en cadena de suministro. |
| **bcrypt** | Algoritmo de hash criptográfico utilizado para almacenar contraseñas de forma segura. |
| **TLS** | Transport Layer Security. Protocolo de cifrado para comunicaciones en red. |
| **COK** | Costo de Oportunidad del Capital. Tasa de descuento utilizada en evaluación financiera. |
| **QA** | Quality Attribute. Atributo de calidad del software. |

## **Organización del documento**

El presente documento se organiza en cuatro secciones principales:

* Sección 1 — Introducción: propósito, alcance, glosario y organización del SAD.
* Sección 2 — Objetivos y Restricciones Arquitectónicas: priorización de requerimientos funcionales y no funcionales, y restricciones del sistema.
* Sección 3 — Representación de la Arquitectura del Sistema: vistas de caso de uso, lógica, implementación, procesos y despliegue con sus diagramas correspondientes.
* Sección 4 — Atributos de Calidad del Software: escenarios de funcionalidad, usabilidad, confiabilidad, rendimiento, mantenibilidad y otros.

# **OBJETIVOS Y RESTRICCIONES ARQUITECTONICAS**

## **Priorización de requerimientos**

### Requerimientos Funcionales

| ID | Descripcion | Prioridad |
| --- | --- | --- |
| RFF-01 | Consulta de tracking público: pantalla pública para consultar despacho mediante código opaco sin autenticación. | Alta |
| RFF-02 | Validación de código de seguimiento: valida formato, existencia y estado del código antes de mostrar resultados. | Alta |
| RFF-03 | Visualización de estado logístico: ante código válido, muestra estado del despacho y datos permitidos al cliente. | Alta |
| RFF-04 | Registro de despacho en panel: el personal autorizado registra nuevos despachos para generar trazabilidad digital. | Alta |
| RFF-05 | Actualización de estados de despacho: permite actualizar el estado logístico respetando la secuencia definida. | Alta |
| RFF-06 | Historial de estados por despacho: conserva la secuencia de cambios de estado con fecha, hora y responsable. | Media |
| RFF-07 | Gestión de contenido corporativo en panel: el personal gestiona contenido institucional y comercial. | Alta |
| RFF-08 | Publicación dinámica de contenidos web: cambios aprobados en panel se reflejan en el portal público. | Alta |
| RFF-09 | Alta y edición de productos exportables: el panel permite crear y actualizar fichas de productos. | Alta |
| RFF-10 | Gestión de presentaciones logísticas: define presentaciones por unidad de negocio (TM, contenedor 20'/40'). | Alta |
| RFF-11 | Gestión de precios multimoneda: administra precios en PEN, USD y EUR por producto/presentación. | Alta |
| RFF-12 | Publicación controlada de catálogo: solo publica productos con datos mínimos completos. | Alta |
| RFF-13 | Registro de certificaciones oficiales: registra SENASA/BRC/ISO/BASC con tipo, vigencia y evidencia. | Alta |
| RFF-14 | Publicación y vigencia de certificaciones: muestra certificaciones vigentes y archiva las vencidas. | Alta |
| RFF-15 | Gestión de traducciones: administra contenidos en ES/EN/PT por cada sección relevante. | Alta |
| RFF-16 | Selección de idioma en portal: selector de idioma con fallback controlado a español. | Alta |
| RFF-17 | Autenticación de usuarios administrativos: JWT (8 h), bloqueo tras 5 intentos fallidos. | Alta |
| RFF-18 | Autorización por roles y permisos: restringe operaciones según rol y matriz de permisos. | Alta |
| RFF-19 | Bitácora de cambios operativos: registra usuario, fecha/hora, operación y entidad afectada. | Media |
| RFF-20 | Consulta histórica gerencial: consulta consolidada de movimientos con filtros por fecha. | Media |
| RFF-21 | Reporte de auditoría de operaciones: genera reportes filtrables de la bitácora. | Media |

###

### Requerimientos No Funcionales – Atributos de Calidad

| ID | Descripcion | Prioridad |
| --- | --- | --- |
| RNF-01 | Rendimiento de consulta tracking: tiempo de respuesta < 10 segundos en condiciones normales. | Alta |
| RNF-02 | Protección de credenciales: hash bcrypt factor 10, TLS 1.3/HTTPS en producción. | Alta |
| RNF-03 | Resiliencia ante abuso: rate limiting de 30 consultas por IP cada 10 minutos en el endpoint público. | Alta |
| RNF-04 | Usabilidad para usuario no técnico: aprendizaje del panel en sesión de capacitación de 2 horas. | Alta |
| RNF-05 | Soporte multilingüe: contenidos en ES/EN/PT con fallback controlado a español. | Alta |
| RNF-06 | Consistencia de unidades y divisas: TM, contenedor 20'/40'; PEN, USD, EUR; validación de montos positivos. | Alta |
| RNF-07 | Disponibilidad cloud: >= 99.5% mensual sin servidores físicos locales (Vercel + VPS). | Media |
| RNF-08 | Cumplimiento legal: Ley N.° 29733, sesión JWT de 8 h, bcrypt factor 10, acceso restringido. | Alta |
| RNF-09 | Auditabilidad: usuario, fecha/hora y tipo de operación en tablas de despachos, productos y certificaciones. | Media |

## **Restricciones**

Las siguientes restricciones limitan las opciones de diseño arquitectónico y deben ser respetadas en todo el ciclo de vida del sistema:

| ID | Descripción |
| --- | --- |
| RES-01 | Conectividad a Internet: requiere conexión activa; no existe modo offline. |
| RES-02 | Compatibilidad de navegadores: Chrome 110+, Firefox 110+, Safari 16+, Edge 110+. |
| RES-03 | Sin procesamiento de pagos: no incluye pasarelas de pago en v1.0. |
| RES-04 | Sin integración aduanera: no se integra con SUNAT, aduanas ni navieras. |
| RES-05 | Marco legal peruano: cumplimiento estricto de Ley N.° 29733. |
| RES-06 | Plazo de desarrollo: duración máxima de 10 semanas (09 abril – 24 junio 2026). |
| RES-07 | Tecnología definida: Next.js 14+, React 18, PostgreSQL 15+, Vercel y VPS Elástika. |

# **REPRESENTACIÓN DE LA ARQUITECTURA DEL SISTEMA**

## **Vista de Caso de uso**

La vista de caso de uso describe las funcionalidades del sistema tal como son percibidas por los actores externos. Para el sistema NODIEX, se identifican cuatro perfiles de usuario y veinte casos de uso (UC-01 a UC-20) que cubren el ciclo completo de operación: tracking público, gestión de despachos, catálogo, certificaciones, seguridad y auditoría.

Los actores principales del sistema son:

* Cliente B2B Internacional (PU-01): consulta tracking, catálogo y certificaciones sin autenticación.
* Administrador Operativo (PU-02): registra y actualiza despachos logísticos.
* Administrador Comercial (PU-03): gestiona catálogo, precios, certificaciones y traducciones.
* Gerencia General (PU-04): supervisa, consulta históricos y revisa auditoría.

### Diagramas de Casos de Uso

Diagrama

## Vista Lógica

La vista lógica representa los requerimientos funcionales del sistema mediante su descomposición en subsistemas, clases y objetos. Describe cómo el sistema está estructurado internamente para satisfacer las responsabilidades identificadas en el modelo de casos de uso.

La arquitectura lógica del sistema se organiza en cinco capas principales:

* Capa de Presentación (Frontend): Next.js 14 con React 18 y Tailwind CSS. Gestiona el portal público multiidioma y el panel administrativo CMS.
* Capa de Aplicación (API): Next.js Route Handlers actuando como endpoints REST serverless, encargados de la lógica de negocio.
* Capa de Dominio (ORM): Prisma ORM que abstrae las operaciones de base de datos y define el modelo relacional.
* Capa de Datos: PostgreSQL 15+ alojado en VPS Elástika, gestionando la persistencia de despachos, catálogo, certificaciones y auditoría.
* Capa de Seguridad Transversal: JWT, bcrypt, TLS 1.3 y rate limiting aplicados en todas las operaciones críticas.

###

### Diagrama de Subsistemas (paquetes)

El Diagrama de Paquetes (Figura 04 del SRS – FD03) descompone el sistema en los siguientes paquetes arquitectónicos:

* pkg\_tracking: lógica de consulta pública, validación de código opaco y visualización de estado logístico.
* pkg\_admin\_panel: gestión de despachos, catálogo, certificaciones, traducciones y usuarios administrativos.
* pkg\_catalog: productos, presentaciones logísticas, precios multimoneda y publicación controlada.
* pkg\_certifications: registro, vigencia y publicación pública de certificaciones oficiales.
* pkg\_auth\_security: autenticación JWT, autorización por roles, sesiones y bitácora de auditoría.
* pkg\_notifications: integración Nodemailer/Resend para notificaciones automáticas de cambio de estado.
* pkg\_database: esquema relacional PostgreSQL con Prisma ORM.

Diagrama

### Diagrama de Secuencia (vista de diseño)

El SRS (FD03) documenta veinte diagramas de secuencia (Figuras 26 a 45) que representan el flujo de mensajes entre los objetos del sistema para cada caso de uso. Los diagramas de mayor relevancia arquitectónica son:

* Secuencia A — Consulta de tracking público (UC-01 a UC-03): el cliente ingresa el código, el sistema lo valida contra la base de datos, aplica rate limiting y retorna el estado del despacho en menos de 10 segundos.
* Secuencia B — Actualización administrativa de estado (UC-04 a UC-05): el administrador operativo se autentica mediante JWT, registra o actualiza el despacho siguiendo el flujo definido, y el sistema persiste el cambio junto con el registro de bitácora.
* Secuencia C — Publicación de catálogo (UC-09 a UC-12): el administrador comercial crea el producto, define presentaciones y precios, y el sistema valida los datos mínimos antes de publicar en el portal público.
* Secuencia D — Autenticación y autorización (UC-17 a UC-18): validación de credenciales, emisión de JWT con vigencia de 8 horas, bloqueo tras 5 intentos fallidos y verificación de permisos por rol en cada operación crítica.

Diagrama

### Diagrama de Colaboración (vista de diseño)

Los diagramas de colaboración se derivan de los diagramas de secuencia y enfatizan las relaciones estructurales entre los objetos participantes. Para el flujo de tracking público, los objetos colaboradores son: TrackingController (API Route Handler), CodigoTrackingRepository, DespachoRepository, EstadoDespachoService y RateLimitMiddleware. Para el flujo de administración, los objetos son: AuthMiddleware, JwtService, RolPermisosService, DespachoService y BitacoraRepository.

Diagrama

### Diagrama de Objetos

El siguiente cuadro presenta el modelo de objetos del sistema con sus responsabilidades, atributos clave y colaboraciones, derivado del análisis de los 20 casos de uso:

Diagrama

### Diagrama de Clases

El Diagrama de Clases General (Figura 46 del SRS – FD03) muestra las relaciones de herencia, asociación, agregación y composición entre las 14 entidades del modelo de dominio. Las relaciones más relevantes para la arquitectura son:

* Usuario — Rol (asociación N:M a través de tabla intermedia): define el conjunto de permisos por perfil.
* Despacho — EstadoDespacho (composición 1:N): cada despacho posee un historial de transiciones de estado.
* Despacho — CodigoTracking (composición 1:1): el código opaco es parte integral del despacho.
* Producto — PresentacionLogistica — Precio (asociación 1:N:N): estructura comercial multimoneda.
* Contenido — Traduccion (composición 1:N): soporte multiidioma por sección.
* BitacoraEvento (asociación hacia múltiples entidades): registro transversal de auditoría.

Diagrama

### Diagrama de Base de datos (relacional o no relacional)

El modelo relacional se implementa en PostgreSQL 15+. Las tablas principales y sus relaciones son:

* usuarios (id PK, username, hash\_password, estado, ultimo\_acceso)
* roles (id PK, nombre\_rol, descripcion)
* usuarios\_roles (usuario\_id FK, rol\_id FK) — tabla intermedia N:M
* permisos (id PK, recurso, accion, rol\_id FK)
* sesiones (id PK, token\_jwt, fecha\_expiracion, ip\_origen, usuario\_id FK)
* despachos (id PK, codigo\_tracking UNIQUE, fecha\_registro, estado\_actual, usuario\_id FK)
* estados\_despacho (id PK, estado, fecha\_hora, observacion, responsable, despacho\_id FK)
* productos (id PK, nombre, descripcion, estado\_publicacion)
* presentaciones\_logisticas (id PK, tipo\_unidad, capacidad, producto\_id FK)
* precios (id PK, moneda, monto, vigencia, presentacion\_id FK)
* certificaciones (id PK, tipo, fecha\_emision, fecha\_vencimiento, url\_evidencia, estado\_vigencia)
* contenidos (id PK, seccion, estado\_publicacion, fecha\_actualizacion)
* traducciones (id PK, idioma, titulo, cuerpo, estado, contenido\_id FK, producto\_id FK)
* bitacora\_eventos (id PK, entidad, accion, fecha\_hora, usuario\_id FK, detalle JSONB)

Diagrama

## **Vista de Implementación (vista de desarrollo)**

La vista de implementación detalla la estructura del código fuente y el mapeo de los paquetes lógicos en artefactos de software desplegables. El sistema adopta una arquitectura Cloud-Native y Serverless que elimina la necesidad de servidores de aplicación dedicados.

### Diagrama de arquitectura software (paquetes)

La arquitectura de software se organiza en capas claramente delimitadas dentro del repositorio monorepo Next.js. Las capas y su correspondencia con el stack tecnológico son:

| **Capa** | **Tecnología** | **Propósito** |
| --- | --- | --- |
| **Frontend / Admin** | Next.js 14 (React 18) + Tailwind CSS | Interfaces responsivas, SSR para SEO internacional |
| **Backend / API** | Next.js Route Handlers + Prisma ORM | Lógica de negocio y endpoints REST sin servidor adicional |
| **Base de Datos** | PostgreSQL 15+ (Supabase o Neon) | Persistencia de datos relacionales robusta e íntegra |
| **Infraestructura Cloud** | Vercel (Edge Network) | Despliegue Serverless con baja latencia internacional |
| **Seguridad** | JWT + bcrypt + TLS/HTTPS | Autenticación, cifrado de credenciales y transmisión segura |
| **Control de Versiones** | Git + GitHub | Flujo colaborativo de desarrollo de software |
| **Notificaciones** | Nodemailer / Resend | Envío de correos automáticos de seguimiento |

Estructura del repositorio (monorepo Next.js 14):

* /app — Rutas de Next.js (App Router): páginas públicas y panel administrativo.
* /app/api — Route Handlers: endpoints REST para tracking, catálogo, certificaciones y auth.
* /components — Componentes React reutilizables (UI pública y admin).
* /lib — Utilidades: Prisma client, JWT helpers, bcrypt helpers, rate limiter.
* /prisma — Schema de Prisma ORM y migraciones de PostgreSQL.
* /public — Assets estáticos (logos, imágenes de certificaciones).
* /middleware.ts — Middleware global para autenticación JWT y rate limiting.

Diagrama

### Diagrama de arquitectura del sistema (Diagrama de componentes)

Los componentes principales del sistema y sus interfaces son:

* Portal Público (Next.js SSR): componente de tracking, catálogo multiidioma, sección de certificaciones y selector de idioma. Se comunica con la API REST mediante fetch asíncrono.
* Panel Administrativo (Next.js Client): formularios de gestión de despachos, catálogo, certificaciones y traducciones. Requiere sesión JWT válida.
* API REST (Next.js Route Handlers): expone endpoints protegidos y públicos. Integra middleware de autenticación JWT, autorización por rol y rate limiting.
* Servicio de Notificaciones (Nodemailer/Resend): envía correos automáticos al cliente B2B ante cambios de estado relevantes.
* Base de Datos (PostgreSQL 15+ vía Prisma ORM): gestiona la persistencia de todos los datos del sistema con snapshots diarios.

Diagrama

## **Vista de procesos**

La vista de procesos describe la descomposición del sistema en procesos concurrentes y la comunicación entre ellos. El sistema identifica dos flujos de proceso principales:

* Proceso de Consulta Pública (sincrónico, stateless): el cliente B2B realiza una solicitud HTTP GET al endpoint de tracking. El middleware de rate limiting verifica el límite por IP, el Route Handler consulta PostgreSQL a través de Prisma ORM y retorna el estado en formato JSON. No existe estado de sesión en el lado del servidor.
* Proceso de Administración (asíncrono, stateful con JWT): el administrador inicia sesión, obtiene un JWT (8 horas). Cada operación crítica (crear despacho, publicar producto, registrar certificación) pasa por el middleware de autenticación y autorización, ejecuta la lógica de negocio, persiste el cambio y registra el evento en la bitácora. Si la operación activa una notificación, se encola un mensaje al servicio de correo (Nodemailer/Resend).

### Diagrama de Procesos del sistema (diagrama de actividad)

El SRS (FD03) documenta dos diagramas de actividad:

* Figura 02 — Proceso Actual: flujo reactivo de consulta de estado de contenedor vía correo electrónico y llamadas, con tiempo promedio documentado de 45 minutos por interacción.
* Figura 03 — Proceso Propuesto: flujo automatizado de consulta de tracking mediante código único opaco, con tiempo de respuesta menor a 10 segundos y sin intervención del personal administrativo.

Diagrama

Diagrama

## **Vista de Despliegue (vista física)**

La vista de despliegue describe la distribución física del sistema sobre nodos de infraestructura. El sistema adopta una arquitectura Cloud-Native sin servidores físicos en las instalaciones de NODIEX.

Los nodos de despliegue son:

* Vercel Edge Network (CDN Global): nodo de producción para el frontend Next.js y los Route Handlers serverless. El despliegue es automático desde el repositorio GitHub (CI/CD). Provee baja latencia a compradores internacionales.
* VPS Elástika (Nube): nodo de base de datos PostgreSQL 15+. Incluye snapshots diarios automáticos y acceso restringido desde la API de Vercel vía SSL. Costo anual: S/ 200.00.
* Servicio de Correo (Resend/SMTP): nodo de notificaciones de tracking. Se integra con la API mediante llamadas asíncronas.
* Dispositivos Cliente (Browsing): smartphones, tablets y computadoras de escritorio de los compradores B2B internacionales y del personal administrativo de NODIEX. Acceden al sistema vía HTTPS con navegadores modernos (Chrome 110+, Firefox 110+, Safari 16+, Edge 110+).

La comunicación entre nodos opera sobre TLS 1.3 (HTTPS). El DNS del dominio corporativo apunta al CDN de Vercel. La base de datos no tiene exposición pública directa; solo acepta conexiones desde la API autenticada.

### Diagrama de despliegue

El diagrama de despliegue (Diagrama de Contenedores C4) muestra los siguientes contenedores y su comunicación:

* Browser (Cliente) ←HTTPS→ Vercel Edge Network (Next.js SSR + API Routes)
* Vercel Edge Network ←SSL/PostgreSQL protocol→ VPS Elástika (PostgreSQL 15+)
* Vercel Edge Network ←HTTPS/API→ Resend/SMTP (Notificaciones de tracking)
* GitHub (Repositorio) ←CI/CD webhooks→ Vercel Edge Network (Deploy automático)

Diagrama

# **ATRIBUTOS DE CALIDAD DEL SOFTWARE**

Los Atributos de Calidad (QAs) son propiedades medibles y evaluables del sistema, usadas para indicar el grado en que satisface las necesidades de los stakeholders (Wojcik, 2013). A continuación se describen los escenarios de calidad del sistema NODIEX, con sus estímulos, respuestas esperadas y métricas de aceptación.

## **Escenario de Funcionalidad**

Se califica de acuerdo con el conjunto de características y capacidades del programa, la generalidad de las funciones entregadas y la seguridad general del sistema (Pressman, 2010).

| Atributo | Estímulo / Escenario | Respuesta del Sistema | Métrica / Meta |
| --- | --- | --- | --- |
| Funcionalidad — Tracking | El cliente B2B ingresa un código de seguimiento desde cualquier dispositivo. | El sistema valida el código, aplica rate limiting y retorna el estado del despacho. | Respuesta en < 10 segundos; error genérico para código inválido (sin exponer datos sensibles). |
| Funcionalidad — Catálogo | El comprador internacional navega el catálogo de productos desde el portal público. | El sistema muestra productos publicados con precios multimoneda e información multiidioma. | Solo productos con datos mínimos completos son visibles; precios en PEN, USD y EUR. |
| Funcionalidad — Certificaciones | El importador requiere verificar las certificaciones de calidad de NODIEX. | El sistema presenta las certificaciones vigentes (SENASA, BRC, ISO, BASC) con descarga disponible. | Certificaciones vencidas marcadas como no vigentes; evidencia documental adjunta. |
| Funcionalidad — Administración | El personal crea un nuevo despacho y genera el código de seguimiento. | El sistema valida los datos, registra el despacho y genera automáticamente el código opaco único. | Código no secuencial, no reutilizable, generado en < 2 segundos. |

## **Escenario de Usabilidad**

Este atributo se refiere a la facilidad con la que un usuario puede aprender a utilizar e interpretar los resultados producidos por el sistema (Barbacci, 1995). Para el sistema NODIEX, se consideran los aspectos de aprendizaje, eficiencia de uso y minimización del impacto de errores.

| **Atributo** | **Estímulo / Escenario** | **Respuesta del Sistema** | **Métrica / Meta** |
| --- | --- | --- | --- |
| Usabilidad — Aprendizaje del panel | Personal administrativo sin conocimientos técnicos intenta operar el panel por primera vez. | El panel guía al usuario con flujos intuitivos, etiquetas claras y mensajes de validación en español. | El personal opera catálogo, despachos y certificaciones de forma autónoma en < 2 horas de capacitación. |
| Usabilidad — Responsividad móvil | Un comprador B2B accede al portal de tracking desde un smartphone. | El portal se adapta a pantallas desde 320px de ancho con diseño responsive. | Funcionalidad completa accesible en dispositivos móviles sin zoom ni scroll horizontal. |
| Usabilidad — Multiidioma | Un importador angloparlante navega el portal y selecciona inglés. | El sistema cambia el idioma de la interfaz; si falta traducción, aplica fallback a español con indicador. | Selector de idioma visible; contenido en inglés y portugués disponible progresivamente. |
| Usabilidad — Manejo de errores | El administrador ingresa un precio con formato incorrecto o una moneda no permitida. | El sistema muestra un mensaje de validación claro antes de intentar guardar. | Ningún dato inválido llega a la base de datos; el usuario entiende el error sin soporte técnico. |

## **Escenario de confiabilidad**

Es el equilibrio entre confidencialidad, integridad, irrefutabilidad y disponibilidad de la información. La seguridad del sistema se caracteriza por mecanismos y técnicas empleados para reducir el impacto de ataques y amenazas, abarcando los planos físico, lógico y humano.

| **Atributo** | **Estímulo / Escenario** | **Respuesta del Sistema** | **Métrica / Meta** |
| --- | --- | --- | --- |
| Confiabilidad — Autenticación | Un atacante intenta acceder al panel con credenciales incorrectas de forma repetida. | El sistema bloquea temporalmente el acceso tras 5 intentos fallidos consecutivos. | Bloqueo efectivo verificado en pruebas automatizadas; contraseñas almacenadas con bcrypt factor 10. |
| Confiabilidad — Rate limiting | Un bot intenta enumerar códigos de tracking mediante consultas automatizadas. | El middleware bloquea IPs que superen 30 consultas en 10 minutos y registra el evento. | 0% de información sensible expuesta ante código inválido; bloqueo verificado en pruebas de carga. |
| Confiabilidad — Disponibilidad | El sistema experimenta un pico de consultas de compradores internacionales simultáneos. | La arquitectura serverless de Vercel escala automáticamente sin intervención manual. | Disponibilidad >= 99.5% mensual (máx. 3.6 h de inactividad); hasta 500 usuarios concurrentes. |
| Confiabilidad — Protección legal | El sistema procesa datos de contacto de clientes B2B. | Los datos se gestionan bajo minimización, acceso restringido y cifrado según Ley N.° 29733. | Sesión JWT de 8 horas; datos sensibles no expuestos en logs ni respuestas de error. |

## **Escenario de rendimiento**

Se mide con base en la velocidad de procesamiento, el tiempo de respuesta, el uso de recursos, el conjunto y la eficiencia (Pressman, 2010, pág. 187).

| **Atributo** | **Estímulo / Escenario** | **Respuesta del Sistema** | **Métrica / Meta** |
| --- | --- | --- | --- |
| Rendimiento — Tracking | 100 clientes B2B consultan simultáneamente el estado de sus despachos. | El sistema procesa las consultas en paralelo aprovechando el modelo serverless de Vercel. | Tiempo de respuesta < 10 segundos por consulta bajo carga concurrente de hasta 500 usuarios. |
| Rendimiento — Panel admin | El administrador carga el listado completo de despachos activos. | El sistema pagina los resultados y retorna la primera página desde la base de datos. | Tiempo de carga del panel < 2 segundos en condiciones normales de red. |
| Rendimiento — SEO | Un motor de búsqueda indexa el catálogo de productos. | Next.js genera las páginas con SSR, produciendo HTML completo para los crawlers. | Páginas del catálogo indexadas en inglés, español y portugués; Core Web Vitals aceptables. |
| Rendimiento — Notificaciones | Un despacho cambia de estado y el sistema debe notificar al cliente. | El servicio Resend/Nodemailer envía el correo de notificación de forma asíncrona. | Correo entregado en < 30 segundos; el cambio de estado no se bloquea esperando la notificación. |

## **Escenario de mantenibilidad**

Combina la capacidad del programa para ser ampliable (extensibilidad), adaptable y servicial (Pressman, 2010, pág. 187). El equipo desarrollador (Nextrack S.A.C.) proveerá un servicio de mantenimiento preventivo y correctivo anual.

| **Atributo** | **Estímulo / Escenario** | **Respuesta del Sistema** | **Métrica / Meta** |
| --- | --- | --- | --- |
| Mantenibilidad — Actualización | El equipo de desarrollo necesita actualizar la lógica de estados logísticos. | La arquitectura en capas (Route Handlers + Prisma ORM) permite modificar la capa de negocio sin afectar el frontend. | Cambio desplegable mediante CI/CD desde GitHub sin downtime; < 1 hora de tiempo de implementación. |
| Mantenibilidad — Backup | Se produce un fallo en el VPS Elástika. | El sistema puede restaurarse desde el snapshot diario de PostgreSQL. | RPO (Recovery Point Objective) < 24 horas; RTO (Recovery Time Objective) < 4 horas. |
| Mantenibilidad — Extensibilidad | NODIEX requiere integrar su sistema con APIs de navieras en v2.0. | La arquitectura REST y el modelo de datos permiten añadir nuevos endpoints sin refactorización mayor. | Nuevos módulos integrables sin modificar la base de datos existente (adición de tablas). |
| Mantenibilidad — Autonomía operativa | El personal de NODIEX necesita añadir un nuevo producto al catálogo. | El CMS administrativo permite la operación completa sin intervención del equipo de desarrollo. | 0% de dependencia técnica para operaciones diarias de catálogo, tracking y certificaciones. |

## **Otros Escenarios**

### Escalabilidad

El atributo de escalabilidad se refiere a la capacidad del sistema para crecer en usuarios, datos y funcionalidades sin degradación de rendimiento ni necesidad de reestructuración arquitectónica. El modelo serverless de Vercel garantiza escalado automático horizontal en los componentes de frontend y API. La base de datos PostgreSQL en VPS Elástika puede migrarse a un plan superior (Supabase Pro, Neon) sin cambios en el código, gracias a la abstracción del ORM Prisma.

| **Atributo** | **Estímulo / Escenario** | **Respuesta del Sistema** | **Métrica / Meta** |
| --- | --- | --- | --- |
| Escalabilidad — Usuarios | El volumen de consultas de tracking se triplica en temporada alta de exportaciones. | Vercel escala automáticamente las funciones serverless según la demanda. | Sin degradación de rendimiento hasta 500 usuarios concurrentes en la configuración inicial. |
| Escalabilidad — Datos | El historial de despachos acumula más de 10,000 registros en 3 años de operación. | PostgreSQL maneja el volumen con índices en campos de búsqueda frecuente (codigo\_tracking, estado). | Tiempo de consulta de tracking < 10 segundos incluso con 10,000+ despachos en base de datos. |

### Seguridad (OWASP Top 10)

El sistema implementa controles de seguridad alineados con el OWASP Top 10 (2021) para mitigar las vulnerabilidades web más frecuentes:

* A01 — Broken Access Control: matriz de roles y permisos con verificación en cada operación crítica (UC-18). Accesos denegados se registran en bitácora sin modificar datos.
* A02 — Cryptographic Failures: contraseñas almacenadas con hash bcrypt factor 10; comunicación cifrada con TLS 1.3; JWT con firma HS256.
* A03 — Injection: validación y sanitización de inputs en cliente (formularios React) y servidor (Prisma ORM con queries parametrizadas). Ninguna consulta SQL se construye por concatenación de strings.
* A05 — Security Misconfiguration: variables de entorno para credenciales de base de datos y secret JWT; headers de seguridad HTTP (CSP, HSTS) configurados en Vercel.
* A07 — Identification and Authentication Failures: bloqueo tras 5 intentos fallidos (RNF-02), sesión JWT de 8 horas, rate limiting de 30 req/IP/10 min (RNF-03).
* A09 — Security Logging and Monitoring Failures: bitácora transaccional (UC-19) con registro de usuario, fecha/hora, operación y entidad afectada para todas las operaciones críticas.

### Portabilidad

El sistema es portable entre proveedores cloud gracias al uso de tecnologías de código abierto. El frontend puede desplegarse en cualquier plataforma compatible con Node.js 20+ (Netlify, AWS Amplify, Railway). La base de datos PostgreSQL puede migrarse entre proveedores mediante pg\_dump/restore. Prisma ORM facilita la migración del esquema a nuevos entornos mediante el comando prisma migrate deploy.