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

***2026***

**Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.**

Documento de Especificación de Requerimientos de Software

Versión *1.0*

| CONTROL DE VERSIONES | | | | | |
| --- | --- | --- | --- | --- | --- |
| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| 1.0 | KHZM / FSYP | VRLN / AACV | KHZM / AACV | 14/05/2026 | V1.0 |

**ÍNDICE GENERAL**

[**INTRODUCCIÓN 4**](#_5pooojmeh722)

[**1. Generalidades de la Empresa 5**](#_tbv9lwo6e0ni)

[1.1. Nombre de la Empresa 5](#_mpmq3sg4l8rn)

[NODIEX DEL PERÚ S.A.C. 5](#_870iizzdvz4z)

[1.2. Visión 5](#_fhg5y84c96p6)

[1.3. Misión 5](#_o5utl21uvij5)

[1.4. Organigrama 5](#_81jdoixxolil)

[**2. Visionamiento de la Empresa 6**](#_m6wexerd5u9j)

[2.1. Descripción del Problema 6](#_p6223oj5aopp)

[2.2. Objetivos de Negocios 7](#_15919rwmjie5)

[2.3. Objetivos de Diseño 7](#_7yq9tuujuke4)

[2.4. Alcance del Proyecto 8](#_fgmwb6cwznto)

[2.5. Viabilidad del Sistema 8](#_q41b867n50mc)

[2.6. Información Obtenida del Levantamiento de Información 14](#_o5htbxtqq58c)

[2.6.1. Hallazgos Clave del Mercado 15](#_s73mgxl97f43)

[2.6.2. Oportunidades Identificadas 16](#_7hffefrv1yfc)

[**3. Análisis de Procesos 18**](#_hb95oq6p9r61)

[3.1. Diagrama del Proceso Actual - Diagrama de Actividades 18](#_8bzru2eom83s)

[3.2. Diagrama del Proceso Propuesto - Diagrama de Actividades Inicial 19](#_90rw5ovn7ud6)

[**4. Especificación De Requerimientos De Software 20**](#_ods7psmqkd8)

[4.1. Cuadro de Requerimientos Funcionales Inicial 20](#_owadslsois79)

[4.2. Cuadro de Requerimientos No Funcionales 22](#_5prgektfo5jf)

[4.3. Cuadro de Requerimientos Funcionales Final 27](#_h8h2erw1rg)

[4.4. Reglas de NegocioCuadro de Reglas de Negocio 30](#_uxdw8jkvuev)

[**5. Fase De Desarrollo 34**](#_bqrz716pfy1b)

[5.1. Perfiles de Usuario 34](#_ti33h18gvaqm)

[5.2. Modelo Conceptual 35](#_ntmpc1rot3hv)

[5.2.1. Diagrama de Paquetes 35](#_bwda1bo8edks)

[5.2.2. Diagrama de Casos de Uso 36](#_x7jq619o1paz)

[5.2.3. Escenarios de Caso de Uso (Narrativa) 37](#_9wq16ddc4jf0)

[5.3. Modelo Lógico 55](#_mz91opr9hohh)

[5.3.1. Análisis de objetos 55](#_1lspvog6qs1i)

[5.3.2. Diagrama de Secuencia
Secuencia A: Consulta tracking pública 68](#_f8viqy9lfwm)

[5.3.3. Diagrama de Clases 77](#_bkuc5mkjrq8r)

# **INTRODUCCIÓN**

El presente Documento de Especificación de Requerimientos de Software (SRS) tiene como propósito definir detalladamente las funcionalidades, restricciones, reglas de negocio y atributos de calidad del "Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.".

Este documento establece una base sólida y unificada para el diseño, desarrollo y validación del ecosistema web, garantizando que todas las partes interesadas —incluyendo el equipo de desarrollo, la gerencia de Nodiex y los evaluadores del proyecto— tengan una comprensión clara y precisa de los alcances técnicos y comerciales de la solución.

El sistema propuesto nace ante la necesidad de resolver la limitada presencia digital de la empresa en mercados internacionales y la deficiente gestión manual en la trazabilidad de sus despachos. Para ello, se proyecta la construcción de una plataforma moderna, escalable y multiidioma que integre un catálogo de exportación B2B y un módulo automatizado de seguimiento logístico ("Order Tracking").

A través de las siguientes secciones, este documento describirá el entorno del sistema, el análisis de los procesos actuales frente a la propuesta de valor digital, los perfiles de usuario involucrados y la especificación exhaustiva de los requerimientos funcionales y no funcionales (contemplando la arquitectura basada en Next.js y PostgreSQL). De esta manera, el SRS servirá como la guía directriz técnica y operativa durante todo el ciclo de vida del desarrollo, asegurando la entrega de un producto de software que cumpla con los estándares de calidad y los objetivos estratégicos de Nodiex del Perú S.A.C.

# **Generalidades de la Empresa**

## Nombre de la Empresa

NODIEX DEL PERÚ S.A.C.

## Visión

Posicionarse en mercados internacionales como una empresa exportadora tecnológicamente avanzada, transparente y confiable en la producción y comercialización de hierbas aromáticas y especias de calidad premium.

## Misión

Modernizar la gestión de exportaciones y ofrecer trazabilidad logística en tiempo real a clientes B2B, optimizando el uso de recursos administrativos y fortaleciendo las relaciones comerciales.

## Organigrama

La empresa cuenta con una estructura jerárquica encabezada por la Gerencia General, que se apoya en un Asesor Externo y delega la operación a la Gerencia Comercial. De ésta dependen cuatro áreas funcionales: Control de Calidad, Planta y Mantenimiento (con su Jefe de Producción y operarios), Logística y Recursos Humanos. El área contable reporta directamente a la Gerencia Comercial.

**Figura 01**

*Organigrama de la Empresa*

**![](data:image/jpeg;base64...)**

*Fuente: NODIEX DEL PERÚ S.A.C.*

# **Visionamiento de la Empresa**

## Descripción del Problema

En el competitivo sector agroexportador, Nodiex del Perú S.A.C. enfrenta dificultades para expandir su presencia internacional debido a una infraestructura digital obsoleta e incompleta. Actualmente, su plataforma web no cuenta con soporte multiidioma ni visibilidad clara de precios B2B (por tonelada métrica o contenedor), lo que limita severamente su capacidad para conectar con importadores en mercados clave de habla inglesa y portuguesa.

Por otro lado, el proceso de trazabilidad logística de las exportaciones se gestiona de manera manual y reactiva a través de correos electrónicos. Atender la consulta de un cliente B2B sobre el estado de su contenedor toma un promedio de 45 minutos. Esta deficiencia operativa no solo genera una sobrecarga administrativa y altos costos de atención, sino que impide ofrecer la transparencia y rapidez que el mercado internacional exige.

En respuesta a esta problemática, el nuevo ecosistema web para Nodiex surge como una solución tecnológica diseñada para modernizar la gestión de exportaciones. Al centralizar un catálogo multiidioma y automatizar la trazabilidad logística en tiempo real, el sistema tiene la misión de optimizar los recursos administrativos, fortalecer la confianza comercial y posicionar a la empresa a la vanguardia de la agroexportación digital.

## Objetivos de Negocios

* Posicionar a Nodiex del Perú en mercados internacionales como una empresa exportadora tecnológicamente avanzada, transparente y confiable.
* Automatizar el seguimiento logístico para reducir drásticamente los tiempos y costos operativos asociados a la atención al cliente B2B.
* Expandir el alcance comercial y aumentar las ventas netas internacionales penetrando de manera efectiva en mercados de habla inglesa y portuguesa.
* Fidelizar a los clientes internacionales mediante un servicio de valor agregado que garantice seguridad, rapidez e información precisa sobre sus despachos.

## Objetivos de Diseño

* Desarrollar un ecosistema web interactivo y de alto rendimiento basado en tecnologías modernas y escalables (Next.js y PostgreSQL).
* Diseñar una interfaz visual (UI/UX) con estética editorial minimalista, que sea altamente intuitiva y conserve la identidad visual de la empresa (paleta verde y logo).
* Implementar un soporte multiidioma (ES/EN/PT) fluido y estructurado para una óptima indexación SEO global.
* Crear un panel de administración ágil que simplifique la gestión del catálogo B2B y la generación de códigos de seguimiento.

## Alcance del Proyecto

* Desarrollo de un sitio web público multiidioma y responsivo, accesible desde navegadores móviles y de escritorio.
* Implementación de un sistema de "Order Tracking" donde el cliente final pueda consultar el estado de su contenedor ingresando un código único cifrado, obteniendo resultados en segundos y sin necesidad de iniciar sesión.
* Panel administrativo protegido mediante autenticación por token (JWT) para la gestión (CRUD) del catálogo de hierbas y especias, estableciendo precios B2B y gestionando estados de envío.
* Persistencia de datos relacionales robusta y segura mediante PostgreSQL.
* Sección pública para la exhibición de certificaciones oficiales de calidad (SENASA, BRC, ISO).
* Despliegue del sistema bajo una arquitectura Serverless nativa en la nube (como Vercel) para garantizar alta disponibilidad.

## Viabilidad del Sistema

* **Viabilidad Técnica**

Las tecnologías propuestas forman un stack moderno, maduro y ampliamente documentado que garantiza estabilidad a largo plazo sin necesidad de adquirir o mantener servidores físicos en las instalaciones de NODIEX. La arquitectura adoptada es Cloud-Native y Serverless, lo que permite escalado automático y despliegue continuo desde el repositorio hacia producción.

Stack tecnológico propuesto:

| **Capa** | **Tecnología** | **Propósito** |
| --- | --- | --- |
| Frontend / Admin | Next.js 14 (React 18) + Tailwind CSS | Interfaces responsivas, SSR para SEO internacional |
| Backend / API | Next.js Route Handlers + Prisma ORM | Lógica de negocio y endpoints REST sin servidor adicional |
| Base de Datos | PostgreSQL 15+ (vía Supabase o Neon) | Persistencia de datos relacionales robusta e íntegra |
| Infraestructura Cloud | Vercel (Edge Network) | Despliegue Serverless con baja latencia internacional |
| Seguridad | JWT + bcrypt + TLS/HTTPS | Autenticación, cifrado de credenciales y transmisión segura |
| Control de Versiones | Git + GitHub | Flujo colaborativo de desarrollo de software |

Requerimientos mínimos del entorno de desarrollo

| **Recurso** | **Especificación mínima** | **Uso principal** |
| --- | --- | --- |
| Procesador | Intel i5 10ma gen / Ryzen 5 | Compilación de Next.js y ejecución local |
| RAM | 16 GB | Manejo fluido del IDE y bases de datos locales |
| Almacenamiento | 512 GB SSD NVMe | Velocidad de operaciones I/O |

* **Viabilidad Económica**

El proyecto es económicamente viable y presenta retorno positivo desde el primer año de implementación. Se sustenta en un enfoque de bajo costo basado en tecnologías de código abierto (Next.js, PostgreSQL, Tailwind CSS) y servicios cloud con planes iniciales gratuitos o de bajo costo.

Costos de Desarrollo e Implementación

| **Recurso** | **Cantidad / Duración** | **Costo Unitario (S/)** | **Total (S/)** |
| --- | --- | --- | --- |
| Desarrollador Full-Stack / Líder | 1 pers. × 3.5 meses | S/ 2,500/total | S/ 2,500 |
| Desarrollador Frontend | 1 pers. × 3.5 meses | S/ 2,500/total | S/ 2,500 |
| Desarrollador Backend / QA | 1 pers. × 3.5 meses | S/ 2,500/total | S/ 2,500 |
| Especialista en BD y Documentación | 1 pers. × 3.5 meses | S/ 2,500/total | S/ 2,500 |
| Licencias y Testing Tools | Pago único | — | S/ 200 |
| Costos Operativos (Energía, Internet) | 3.5 meses | S/ 50/mes | S/ 350 |
| **TOTAL INVERSIÓN INICIAL** |  |  | **S/ 10,550** |

Costos Operativos Cloud

| **Concepto** | **Año 1 (S/)** | **Año 2 (S/)** | **Año 3 (S/)** |
| --- | --- | --- | --- |
| Dominio y SSL (.com) | 150 | 150 | 150 |
| Hosting (Vercel Pro) | 912 | 912 | 1,100 |
| Base de Datos (Supabase Pro) | 0 (Free Tier) | 1,140 | 1,140 |
| Servicios Email (Resend) | 200 | 350 | 500 |
| Mantenimiento Evolutivo | 1,500 | 3,000 | 3,500 |
| **Total Costo Operativo Anual** | **S/ 2,762** | **S/ 5,552** | **S/ 6,390** |

* **Viabilidad Operativa**

El proyecto es altamente viable en el plano operativo. La solución se integra en el Departamento de Ventas sin alterar de forma drástica sus operaciones actuales, sino reemplazando procesos manuales (edición directa de PHP, gestión por correos) por un Panel de Administración intuitivo que no requiere conocimientos técnicos avanzados.

Impacto en los procesos clave:

| **Proceso** | **Situación Actual** | **Con el Sistema** |
| --- | --- | --- |
| Consulta de estado de despacho | 45 min por interacción (manual vía correo) | < 10 segundos (tracking automático con código único) |
| Actualización de catálogo/precios | Edición manual de archivos PHP (requiere técnico) | 2 min desde el panel administrativo (sin conocimientos técnicos) |
| Atención a compradores internacionales | Traducción manual, comunicación no estandarizada | Portal multiidioma ES/EN/PT autoservicio 24/7 |
| Publicación de certificaciones | Envío manual bajo demanda | Sección pública siempre disponible |

Garantías de adopción operativa:

* Se realizará una sesión de capacitación antes del despliegue a producción, validada mediante acta de conformidad.
* El diseño del panel prioriza la usabilidad para usuarios no técnicos (RNF-05), reduciendo la curva de aprendizaje al mínimo.
* El sistema incluye roles y permisos para que cada perfil de usuario solo acceda a las funciones correspondientes a su responsabilidad.

El principal riesgo operativo identificado es la resistencia del personal administrativo al cambio desde el flujo de correo electrónico hacia el panel digital (R-01). Este riesgo se mitiga con la capacitación programada y el diseño centrado en la simplicidad del flujo de trabajo.

## Información Obtenida del Levantamiento de Información

El levantamiento de información se realizó mediante análisis documental y entrevistas con la Gerencia General y el Personal Administrativo/Comercial de NODIEX DEL PERÚ S.A.C. Los interesados participantes fueron:

| **Rol en el organigrama** | **Rol en el sistema** |
| --- | --- |
| **Gerente General** | Tomador de decisiones / Patrocinador |
| **Gerencia Comercial** | Supervisor del sistema, aprueba publicaciones |
| **Jefe de Logística** | **Usuario primario** — registra despachos y actualiza estados de tracking |
| **Responsable de Contabilidad / Asistente** | Usuario de consulta (reportes internos) |
| **Jefe de Control de Calidad** | Gestiona certificaciones (SENASA, BRC, ISO, BASC) en el panel |
| **Asesor Externo** | No opera el sistema directamente |
| **Operarios de Planta/Campo** | No interactúan con el sistema |

### Hallazgos Clave del Mercado

Los hallazgos revelan dos problemáticas críticas e interrelacionadas que limitan la competitividad internacional de la empresa:

Hallazgo 1 — Infraestructura Web Obsoleta e Incompleta

* El sitio web actual (nodiexdelperu.com) está construido íntegramente en PHP estático, lo que impide actualizaciones autónomas de contenido sin intervención técnica directa en el código fuente.
* El sitio no cuenta con soporte multiidioma: opera exclusivamente en español, eliminando visibilidad ante importadores de mercados angloparlantes y lusófonos.
* No existen precios por contenedor visibles (por Tonelada Métrica, contenedor 20' ni 40'), lo que obliga a los compradores B2B a solicitar cotizaciones manuales para conocer costos básicos.
* Las certificaciones de calidad (SENASA, BRC, ISO, BASC) no cuentan con una sección pública dedicada; se comparten de manera manual bajo demanda del comprador.
* El diseño responsivo es limitado y no está optimizado para dispositivos móviles modernos.

Hallazgo 2 — Gestión Logística Reactiva y Manual

Todo el seguimiento de despachos internacionales se gestiona al 100% por correo electrónico, mensajes de WhatsApp y llamadas telefónicas.

* El tiempo promedio documentado para atender una consulta de estado de contenedor es de 45 minutos por interacción, debido a que el personal debe buscar información dispersa en múltiples canales antes de poder responder.
* Esta dinámica genera saturación del equipo administrativo, costos operativos elevados y ausencia de transparencia en tiempo real para el cliente extranjero.
* No existe ningún repositorio digital unificado de historial logístico; la información de despachos anteriores no es fácilmente recuperable para análisis gerencial.

### Oportunidades Identificadas

Del análisis de la situación actual se identificaron las siguientes oportunidades de mejora con impacto directo en el negocio:

| **N.°** | **Oportunidad** | **Impacto Proyectado** |
| --- | --- | --- |
| O-01 | Automatizar el seguimiento logístico mediante un sistema de Order Tracking con código único | Reducción del **60% del tiempo** operativo en atención B2B; de 45 min a menos de 10 segundos por consulta |
| O-02 | Implementar catálogo multiidioma (ES/EN/PT) con precios por TM y contenedor | Apertura a mercados de habla inglesa y portuguesa; incremento proyectado de **S/ 15,000 anuales** en ventas |
| O-03 | Crear sección pública de certificaciones (SENASA, BRC, ISO, BASC) | Incremento de confianza y credibilidad ante compradores internacionales exigentes |
| O-04 | Dotar de panel administrativo autónomo al personal de NODIEX | Eliminación de la dependencia técnica para actualizar catálogo, precios y certificaciones |
| O-05 | Posicionamiento SEO internacional mediante SSR y metadatos dinámicos en Next.js | Captación de nuevos leads corporativos sin costo adicional de publicidad pagada |
| O-06 | Despliegue Cloud-Native (Vercel + PostgreSQL) | Alta disponibilidad 24/7 sin inversión en infraestructura física local |

Necesidades Identificadas por Interesado

| **Interesado** | **Necesidad Principal Documentada** |
| --- | --- |
| **Gerencia General** | Reducir costos operativos de atención B2B e incrementar ventas internacionales mediante presencia digital moderna |
| **Personal Administrativo** | Contar con un panel simple que no requiera conocimientos técnicos para registrar despachos, actualizar precios y publicar certificaciones |
| **Clientes B2B Internacionales** | Consultar el estado de su contenedor de forma autónoma, inmediata y en su idioma, sin necesidad de contactar a la empresa |
| **Potenciales Compradores** | Acceder a información clara de productos, precios por volumen y certificaciones de calidad desde cualquier dispositivo |

El levantamiento de información confirma que el sistema propuesto responde directamente a necesidades reales y documentadas de la organización. La transformación de un proceso manual de 45 minutos por consulta a un autoservicio de menos de 10 segundos, junto con la apertura a mercados internacionales mediante el portal multi idioma, validan plenamente la justificación técnica, operativa y financiera del proyecto

# **Análisis de Procesos**

## Diagrama del Proceso Actual - Diagrama de Actividades

**Figura 02**

**![](data:image/png;base64...)**

**Diagrama del Proceso Actual**

*Fuente: Elaboración propia*

## Diagrama del Proceso Propuesto - Diagrama de Actividades Inicial

**Figura 03**

![](data:image/png;base64...)

**Diagrama del Proceso Propuesto**

*Fuente: Elaboración propia*

# **Especificación De Requerimientos De Software**

## Cuadro de Requerimientos Funcionales Inicial

| **ID** | **Nombre** | **Descripción** | **Actor** | **Prioridad** | **Criterio de aceptación** |
| --- | --- | --- | --- | --- | --- |
| RFI-01 | Consulta manual de estado de despacho | El cliente B2B solicita el estado de su pedido por llamada, WhatsApp o correo, y el personal administrativo responde de forma reactiva. | Cliente B2B / Personal administrativo | Alta | Se evidencia que el estado del pedido depende de interacción humana y no de autoservicio; el tiempo promedio de respuesta es cercano a 45 minutos por consulta. |
| RFI-02 | Consolidación manual de información logística | El personal reúne información de despacho desde mensajes/correos dispersos para poder responder consultas. | Personal administrativo | Alta | Se valida que la trazabilidad no está centralizada y requiere búsqueda manual en múltiples canales. |
| RFI-03 | Publicación web estática de contenido corporativo | La web actual basada en PHP estático publica información limitada y de actualización no autónoma. | Personal administrativo / Cliente B2B | Alta | Se comprueba ausencia de gestión dinámica de contenidos y dependencia técnica para cambios web. |
| RFI-04 | Gestión manual de catálogo y precios de exportación | La información comercial (productos, medidas, precios) se gestiona de forma no estructurada y sin panel dedicado. | Personal administrativo/comercial | Alta | Se verifica que no existe módulo para administrar catálogo con unidades y divisas de exportación en una base centralizada. |
| RFI-05 | Envío manual de evidencias/certificaciones | Las certificaciones de calidad se comparten por medios manuales bajo demanda del comprador. | Personal administrativo / Cliente B2B | Media | Se constata que no existe una sección pública consolidada para consulta de certificaciones. |
| RFI-06 | Atención manual a compradores de distintos idiomas | La comunicación internacional depende de interacción humana y traducciones operativas no estandarizadas. | Personal comercial / Cliente B2B | Media | Se identifica que no hay contenido web estructurado ES/EN/PT y la atención multilingüe no está automatizada. |
| RFI-07 | Control operativo por personal autorizado sin controles digitales formales | El registro/actualización logística lo realiza personal de confianza, sin un sistema formal de roles y permisos en plataforma. | Gerencia / Personal administrativo | Alta | Se valida que la autorización existe como práctica organizativa, pero no como control técnico en software. |
| RFI-08 | Registro histórico operativo para gestión gerencial | La gerencia obtiene información histórica con esfuerzo operativo, sin repositorio digital unificado para decisiones. | Gerencia general | Media | Se evidencia ausencia de trazabilidad histórica centralizada con acceso estructurado para análisis. |

##

## Cuadro de Requerimientos No Funcionales

| **ID** | **Nombre** | **Descripción** | **Actor** | **Prioridad** | **Criterio de aceptación** |
| --- | --- | --- | --- | --- | --- |
| RNF-01 | Rendimiento de consulta tracking | La consulta pública del estado de despacho debe responder en un tiempo breve para evitar demoras al cliente. | Cliente B2B | Alta | En pruebas de aceptación, el tiempo de respuesta de consulta de tracking es menor a 10 segundos por solicitud en condiciones normales. |
| RNF-02 | Protección de credenciales y datos sensibles | Las credenciales administrativas y datos sensibles deben protegerse con cifrado. Las contraseñas se almacenan con hash bcrypt (factor mínimo 10). La comunicación opera bajo TLS/HTTPS en producción. | Administrador del sistema | Alta | Las contraseñas no se almacenan en texto plano; el tráfico en producción opera bajo TLS 1.3/HTTPS; auditoría de seguridad básica aprobada antes del despliegue. |
| RNF-02 | Seguridad de acceso administrativo | El panel administrativo debe permitir acceso solo a usuarios autorizados mediante credenciales seguras y control de sesión. | Personal administrativo / Gerencia | Alta | El ingreso al panel requiere usuario y contraseña válidos; la contraseña se almacena cifrada y la sesión expira tras inactividad definida. |
| RNF-03 | Resiliencia ante abuso de endpoint público | El módulo tracking público debe mitigar ataques por fuerza bruta y abuso automatizado mediante rate limiting: máximo 30 consultas por IP cada 10 minutos. | Backend/QA / Seguridad operativa | Alta | Se implementa rate limiting que bloquea IPs que superen 30 consultas en 10 minutos; se bloquean patrones de consulta sospechosos. Verificado mediante pruebas automatizadas. |
| RNF-04 | Usabilidad para usuario no técnico | El panel debe ser usable por personal administrativo sin conocimientos avanzados de programación. El tiempo máximo de aprendizaje para operaciones básicas es de 2 horas. | Personal administrativo/comercial | Alta | En validación de usuarios, el personal registra/actualiza catálogo, certificaciones y despachos sin soporte técnico continuo. El panel se aprende en una sesión de capacitación de 2 horas. |
| RNF-05 | Soporte multilingüe corporativo | El portal debe soportar contenidos en español, inglés y portugués. Español es obligatorio; inglés y portugués pueden publicarse progresivamente. | Cliente B2B / Personal comercial | Alta | El usuario puede visualizar el contenido principal en ES/EN/PT. Si un idioma no tiene traducción completa, el sistema muestra fallback controlado en español con indicador visual. |
| RNF-06 | Consistencia de unidades y divisas de exportación | La plataforma debe manejar estándares comerciales internacionales: unidades TM, contenedor 20', contenedor 40'; monedas PEN, USD, EUR; con validación de formato numérico y monto > 0. | Personal comercial / Cliente B2B | Alta | El sistema rechaza unidades y monedas fuera de las permitidas. Los campos de precio validan formato numérico y monto positivo antes de guardar. Verificado en pruebas de validación de formularios. |
| RNF-07 | Disponibilidad sobre infraestructura cloud | La solución debe desplegarse en infraestructura cloud (Vercel + PostgreSQL) sin dependencia de servidores físicos locales, garantizando disponibilidad >= 99.5% mensual. | Gerencia / Administrador TI | Media | El ambiente productivo opera en servicios cloud contratados con disponibilidad >= 99.5% mensual (máximo 3.6 horas de inactividad mensual). Dominio y hosting activos. |
| RNF-08 | Cumplimiento legal de datos personales | El tratamiento de datos debe alinearse con Ley N.° 29733 y buenas prácticas de privacidad: minimización de datos, acceso restringido y manejo responsable. | Gerencia / Responsable de datos | Alta | Se restringe acceso a información sensible; las contraseñas se almacenan con hash bcrypt factor 10; la sesión JWT expira en 8 horas; se aplican controles de protección según Ley 29733. |
| RNF-09 | Auditabilidad operativa mínima | Las operaciones críticas de actualización deben dejar trazabilidad para control interno: usuario, fecha/hora y tipo de cambio en operaciones sobre tracking, catálogo y certificaciones. | Gerencia / Personal administrativo | Media | Se registra al menos usuario, fecha/hora y tipo de operación en las tres tablas principales (despachos, productos, certificaciones). Datos disponibles para consulta gerencial en < 5 segundos. |

## Cuadro de Requerimientos Funcionales Final

| **ID** | **Nombre** | **Descripción** | **Actor** | **Prioridad** |
| --- | --- | --- | --- | --- |
| RFF-01 (desde RFI-01) | Consulta de tracking público | El sistema expone una pantalla pública para que el cliente consulte su despacho mediante código opaco sin autenticación. | Cliente B2B | Alta |
| RFF-02 (desde RFI-01) | Validación de código de seguimiento | El sistema valida formato, existencia y estado del código de tracking antes de mostrar resultados. | Cliente B2B | Alta |
| RFF-03 (desde RFI-01) | Visualización de estado logístico al cliente | Ante código válido, el sistema muestra estado del despacho y datos permitidos para consulta externa. | Cliente B2B | Alta |
| RFF-04 (desde RFI-02) | Registro de despacho en panel | El personal autorizado registra un nuevo despacho para generar trazabilidad digital. | Personal administrativo | Alta |
| RFF-05 (desde RFI-02) | Actualización de estados de despacho | El panel permite actualizar el estado logístico de cada despacho en su ciclo operativo, respetando la secuencia definida. | Personal administrativo | Alta |
| RFF-06 (desde RFI-02) | Historial de estados por despacho | El sistema conserva la secuencia de cambios de estado por cada despacho con fecha, hora y responsable. | Personal administrativo / Gerencia | Media |
| RFF-07 (desde RFI-03) | Gestión de contenido corporativo en panel | El personal gestiona contenido institucional y comercial del portal desde la interfaz administrativa. | Personal administrativo | Alta |
| RFF-08 (desde RFI-03) | Publicación dinámica de contenidos web | Los cambios aprobados en panel se reflejan en el portal público de forma dinámica. | Personal administrativo / Cliente B2B | Alta |
| RFF-09 (desde RFI-04) | Alta y edición de productos exportables | El panel permite crear y actualizar fichas de productos de exportación. | Personal comercial | Alta |
| RFF-10 (desde RFI-04) | Gestión de presentaciones logísticas | El sistema permite definir presentaciones por unidad de negocio (TM, contenedor 20', contenedor 40'). | Personal comercial | Alta |
| RFF-11 (desde RFI-04) | Gestión de precios multimoneda | El panel administra precios en PEN, USD y EUR por producto/presentación. El monto debe ser mayor a 0 y tener formato numérico válido. | Personal comercial | Alta |
| RFF-12 (desde RFI-04) | Publicación controlada de catálogo | El sistema permite publicar solo productos con datos mínimos completos: nombre, descripción, unidad logística, al menos un precio válido y estado activo. | Personal comercial / Cliente B2B | Alta |
| RFF-13 (desde RFI-05) | Registro de certificaciones oficiales | El panel permite registrar certificaciones (SENASA/BRC/ISO/BASC) con tipo, vigencia y archivo/evidencia asociado. | Personal administrativo | Alta |
| RFF-14 (desde RFI-05) | Publicación y vigencia de certificaciones | El portal muestra certificaciones vigentes y permite marcar como no vigente las vencidas (conservadas históricamente). | Personal administrativo / Cliente B2B | Alta |
| RFF-15 (desde RFI-06) | Gestión de traducciones de contenido | El panel permite administrar contenidos en español, inglés y portugués por cada sección relevante. Español es obligatorio. | Personal comercial | Alta |
| RFF-16 (desde RFI-06) | Selección de idioma en portal público | El portal ofrece selector de idioma. Si no existe traducción, aplica fallback controlado a español con indicador. | Cliente B2B | Alta |
| RFF-17 (desde RFI-07) | Autenticación de usuarios administrativos | El panel exige autenticación para acceder a funciones internas: usuario y contraseña válidos generan token JWT (vigencia 8h). Después de 5 intentos fallidos, se bloquea el acceso temporalmente. | Personal administrativo | Alta |
| RFF-18 (desde RFI-07) | Autorización por roles y permisos | El sistema restringe operaciones según rol de usuario y matriz de permisos configurada. Accesos denegados se registran sin modificar datos. | Gerencia / Personal administrativo | Alta |
| RFF-19 (desde RFI-08) | Bitácora de cambios operativos | El sistema registra operaciones críticas de catálogo, tracking y certificaciones: usuario, fecha/hora, operación y entidad afectada. Si falla el registro, la operación crítica no se confirma. | Gerencia / Personal administrativo | Media |
| RFF-20 (desde RFI-08) | Consulta administrativa para toma de decisiones | El panel ofrece consulta consolidada de movimientos e información histórica relevante para la gerencia, con filtros por fecha y tipo de operación. | Gerencia general | Media |
| RFF-21 (desde RFI-08) | Reporte de auditoría de operaciones | El sistema permite generar y visualizar reportes de auditoría que consolidan los eventos de la bitácora: operaciones sobre tracking, catálogo, certificaciones y accesos al panel, filtrables por usuario, fecha y tipo de operación. | Gerencia / Personal administrativo | Media |

*Fuente: Elaboración propia*

## Reglas de Negocio*Cuadro de Reglas de Negocio*

| **ID RN** | **Regla** | **Condición/Disparador** | **Validación** | **Excepción** | **Resultado esperado** |
| --- | --- | --- | --- | --- | --- |
| RN-01 | Generación obligatoria de código opaco por despacho | Alta de nuevo despacho en panel | El sistema genera código único no secuencial y no reutilizable. | Migración de despacho histórico: se genera código al primer guardado. | Todo despacho queda identificable por código público seguro. |
| RN-02 | Consulta pública sin autenticación solo por código válido | Usuario accede a tracking público | Debe ingresar código existente y activo. | Código inexistente/inactivo: respuesta genérica sin detalle sensible. | Cliente consulta estado sin login; se protege confidencialidad. |
| RN-03 | Control de intentos para tracking público | Múltiples consultas desde mismo origen (>30 en 10 min) | Aplicar rate limiting y umbral de bloqueo temporal. | Origen en lista blanca operativa (si existe política aprobada). | Se reduce riesgo de enumeración/fuerza bruta. |
| RN-04 | Solo personal autorizado actualiza estados logísticos | Crear/editar estado de despacho | Usuario debe estar autenticado con JWT válido y rol habilitado. | Emergencia operativa: rol superior autorizado por gerencia. | Se mantiene integridad del estado logístico. |
| RN-05 | Flujo válido de estados de despacho | Cambio de estado de un despacho | El nuevo estado debe respetar la secuencia definida: registrado → en tránsito → entregado/cerrado. | Reversión por error requiere motivo y usuario con permiso de corrección. | Se evita inconsistencia temporal en tracking. |
| RN-06 | Catálogo solo con unidades de negocio permitidas | Alta/edición de producto o presentación | Unidad debe ser: TM, contenedor 20', contenedor 40'. | Producto informativo sin precio logístico: se permite como borrador no publicable. | Uniformidad comercial internacional en catálogo. |
| RN-07 | Precios comerciales en divisas permitidas con monto positivo | Alta/edición de precio | Moneda: PEN, USD o EUR; monto > 0; formato numérico válido. | Precio no definido: estado 'pendiente', no visible públicamente. | Se previenen precios inválidos y confusión comercial. |
| RN-08 | Publicación de producto condicionada a datos mínimos | Solicitud de publicar producto | Debe tener nombre, descripción, unidad logística, al menos un precio válido y estado activo. | Campaña interna: se permite borrador no publicado. | Solo contenido completo llega al portal público. |
| RN-09 | Publicación de certificaciones con metadatos verificables | Alta/edición de certificación | Debe incluir tipo de certificación, vigencia y archivo/evidencia asociado. | Certificación vencida: se conserva históricamente pero marcada no vigente. | Transparencia comercial y confianza del comprador. |
| RN-10 | Política multilingüe de contenido | Publicación/actualización de contenido | Español (ES) es obligatorio; EN/PT pueden publicarse progresivamente. | Si EN/PT no existe, se muestra fallback controlado al ES con indicador. | Portal usable durante carga incremental de traducciones. |
| RN-11 | Acceso al panel únicamente con sesión autenticada y JWT vigente | Intento de ingreso a módulo administrativo | Usuario/credencial válidos y token JWT vigente (8h). Bloqueo tras 5 intentos fallidos. | Token expirado: solicitar nueva autenticación. | Se protege superficie administrativa del sistema. |
| RN-12 | Autorización por rol para operaciones críticas | Crear, editar, eliminar, publicar | Matriz de permisos debe validar operación por rol antes de ejecutar. | Usuario superadministrador designado por gerencia. | Se evita modificación no autorizada de datos críticos. |
| RN-13 | Registro de auditoría obligatorio en cambios críticos | Confirmación de operación crítica | Guardar usuario, fecha/hora, operación y entidad afectada. Si falla el registro de auditoría, la operación crítica no se confirma. | Fallo de almacenamiento de auditoría: operación crítica no se confirma. | Trazabilidad para control interno y soporte gerencial. |
| RN-14 | Integridad de datos antes de exposición pública | Solicitud de visualización pública (tracking/catálogo/certificaciones) | El sistema solo expone registros en estado publicable/activo. | Registro en revisión interna: oculto hasta aprobación. | Se reduce riesgo reputacional por datos incompletos/erróneos. |
| RN-15 | Cumplimiento de protección de datos personales (Ley 29733) | Procesamiento de información de clientes/operaciones | Aplicar minimización de datos, acceso restringido y manejo responsable. | Requerimiento legal/auditoría formal documentada. | Operación alineada con marco legal peruano. |
| RN-16 | Continuidad operativa post-despliegue | Cierre de proyecto y transición | Deben existir manuales y capacitación aprobada por usuarios clave antes del despliegue. | Cambio de personal: programar sesión de refuerzo. | NODIEX opera el panel con autonomía inicial. |

*Fuente: Elaboración propia*

# **Fase De Desarrollo**

## Perfiles de Usuario

| **ID** | **Perfil** | **Objetivo** | **Responsabilidades clave** | **Permisos principales** | **Restricciones** |
| --- | --- | --- | --- | --- | --- |
| PU-01 | Cliente B2B Internacional | Consultar trazabilidad y evidencia comercial de forma autónoma. | Consultar tracking, revisar catálogo publicado, revisar certificaciones vigentes, usar selector de idioma. | Acceso solo de lectura al portal público. | No accede al panel administrativo ni a datos internos/sensibles. |
| PU-02 | Administrador Operativo | Mantener actualizado el ciclo logístico de despachos. | Registrar despacho, actualizar estados, revisar historial de estados, validar consistencia operativa. | Crear/editar despachos y estados, consultar bitácora operativa según rol. | No define políticas globales de seguridad ni configuración avanzada de roles. |
| PU-03 | Administrador Comercial | Gestionar oferta exportable y contenido comercial multilingüe. | Administrar productos, presentaciones y precios; publicar catálogo; gestionar certificaciones; administrar traducciones. | CRUD de catálogo, certificaciones y contenidos según permisos asignados. | No aprueba excepciones de seguridad ni auditorías legales de alto nivel. |
| PU-04 | Gerencia General | Supervisar continuidad, cumplimiento y desempeño comercial-operativo. | Consultar históricos, monitorear indicadores, revisar auditoría, validar políticas de acceso. | Lectura gerencial de panel, aprobación de políticas internas y excepciones autorizadas. | No ejecuta operación diaria de carga de datos salvo contingencia aprobada. |

## Modelo Conceptual

### Diagrama de Paquetes

**Figura 04**

Diagrama de Paquetes

**![](data:image/png;base64...)**

*Fuente: Elaboración propia*

### Diagrama de Casos de Uso

**Figura 5**

Diagrama de Casos de Uso

**![](data:image/jpeg;base64...)**

*Fuente: Elaboración propia*

### Escenarios de Caso de Uso (Narrativa)

**UC-01 Consultar tracking público (RFF-01)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-01 Consultar tracking público (RFF-01) |
| **Propósito** | Permitir consulta pública de seguimiento por código opaco. |
| **Actores** | Cliente B2B. |
| **Precondiciones** | Portal disponible. |
| **Disparador** | Cliente abre módulo tracking. |
| **Flujo Principal** | 1) Ingresa código. 2) Solicita consulta. 3) Sistema procesa solicitud. |
| **Excepciones** | Si servicio no disponible, mostrar mensaje de contingencia. |
| **Postcondiciones** | Solicitud de consulta registrada. |
| **RN/RNF** | RN-02, RNF-01. |

**UC-02 Validar código tracking (RFF-02)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-02 Validar código tracking (RFF-02) |
| **Propósito** | Evitar exposición de datos por códigos inválidos. |
| **Actores** | Cliente B2B, Sistema. |
| **Precondiciones** | Código ingresado. |
| **Disparador** | Ejecución de consulta de tracking. |
| **Flujo Principal** | 1) Validar formato. 2) Buscar existencia y estado. 3) Determinar respuesta segura. |
| **Excepciones** | Código inválido/inexistente retorna mensaje genérico. |
| **Postcondiciones** | Resultado de validación persistido para auditoría técnica. |
| **RN/RNF** | RN-01, RN-02, RN-03, RNF-04. |

**UC-03 Visualizar estado logístico (RFF-03)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-02 Validar código tracking (RFF-02) |
| **Propósito** | Evitar exposición de datos por códigos inválidos. |
| **Actores** | Cliente B2B, Sistema. |
| **Precondiciones** | Código ingresado. |
| **Disparador** | Ejecución de consulta de tracking. |
| **Flujo Principal** | 1) Validar formato. 2) Buscar existencia y estado. 3) Determinar respuesta segura. |
| **Excepciones** | Código inválido/inexistente retorna mensaje genérico. |
| **Postcondiciones** | Resultado de validación persistido para auditoría técnica. |
| **RN/RNF** | RN-01, RN-02, RN-03, RNF-04. |

**UC-04 Registrar despacho (RFF-04)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-04 Registrar despacho (RFF-04) |
| **Propósito** | Crear despacho trazable en el panel administrativo. |
| **Actores** | Administrador Operativo. |
| **Precondiciones** | Usuario autenticado y autorizado. |
| **Disparador** | Solicitud de alta de despacho. |
| **Flujo Principal** | 1) Completa formulario. 2) Sistema valida datos. 3) Registra despacho y código opaco. |
| **Excepciones** | Datos incompletos impiden guardado. |
| **Postcondiciones** | Despacho creado con identificador único. |
| **RN/RNF** | RN-01, RN-04, RN-16, RNF-02. |

**UC-05 Actualizar estado de despacho (RFF-05)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-05 Actualizar estado de despacho (RFF-05) |
| **Propósito** | Mantener secuencia logística actualizada. |
| **Actores** | Administrador Operativo. |
| **Precondiciones** | Despacho existente; sesión válida. |
| **Disparador** | Cambio de estado operativo. |
| **Flujo Principal** | 1) Selecciona despacho. 2) Define nuevo estado. 3) Sistema valida secuencia y guarda. |
| **Excepciones** | Estado no permitido requiere corrección o permiso superior. |
| **Postcondiciones** | Estado vigente actualizado. |
| **RN/RNF** | RN-04, RN-05, RN-13, RNF-11. |

**UC-06 Consultar historial de estados (RFF-06)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-06 Consultar historial de estados (RFF-06) |
| **Propósito** | Revisar trazabilidad temporal de un despacho. |
| **Actores** | Administrador Operativo, Gerencia. |
| **Precondiciones** | Usuario autorizado. |
| **Disparador** | Solicitud de revisión histórica. |
| **Flujo Principal** | 1) Filtrar despacho. 2) Listar transiciones con fecha/hora/responsable. |
| **Excepciones** | Sin historial, mostrar estado inicial. |
| **Postcondiciones** | Historial consultado para control. |
| **RN/RNF** | RN-05, RN-13, RNF-11. |

**UC-07 Gestionar contenido corporativo (RFF-07)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-07 Gestionar contenido corporativo (RFF-07) |
| **Propósito** | Administrar información institucional/comercial en panel. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Sesión válida con permisos. |
| **Disparador** | Alta o edición de contenido. |
| **Flujo Principal** | 1) Crear/editar contenido. 2) Guardar borrador publicable. |
| **Excepciones** | Campos obligatorios faltantes bloquean operación. |
| **Postcondiciones** | Contenido disponible para publicación. |
| **RN/RNF** | RN-11, RN-12, RNF-05. |

**UC-08 Publicar contenido web (RFF-08)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-08 Publicar contenido web (RFF-08) |
| **Propósito** | Publicar dinámicamente contenido aprobado. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Contenido en estado publicable. |
| **Disparador** | Acción de publicar. |
| **Flujo Principal** | 1) Confirmar publicación. 2) Sistema refleja cambios en portal. |
| **Excepciones** | Si validación falla, permanecer en borrador. |
| **Postcondiciones** | Contenido visible públicamente. |
| **RN/RNF** | RN-14, RNF-05. |

**UC-09 Gestionar productos exportables (RFF-09)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-09 Gestionar productos exportables (RFF-09) |
| **Propósito** | Crear y actualizar fichas de productos. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Usuario autenticado/autorizado. |
| **Disparador** | Alta o edición de producto. |
| **Flujo Principal** | 1) Registrar nombre y descripción. 2) Definir estado. 3) Guardar. |
| **Excepciones** | Datos requeridos faltantes impiden registro. |
| **Postcondiciones** | Producto persistido en catálogo interno. |
| **RN/RNF** | RN-08, RN-12, RNF-05. |

**UC-10 Gestionar presentaciones logísticas (RFF-10)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-10 Gestionar presentaciones logísticas (RFF-10) |
| **Propósito** | Definir unidad logística válida por producto. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Producto existente. |
| **Disparador** | Registro/edición de presentación. |
| **Flujo Principal** | 1) Seleccionar unidad (TM/20'/40'). 2) Guardar relación. |
| **Excepciones** | Unidad fuera de catálogo permitida es rechazada. |
| **Postcondiciones** | Presentación válida registrada. |
| **RN/RNF** | RN-06, RNF-07. |

**UC-11 Gestionar precios multimoneda (RFF-11)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-11 Gestionar precios multimoneda (RFF-11) |
| **Propósito** | Mantener precios en PEN/USD/EUR. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Producto y presentación existentes. |
| **Disparador** | Alta/edición de precio. |
| **Flujo Principal** | 1) Seleccionar moneda permitida. 2) Registrar monto. 3) Validar y guardar. |
| **Excepciones** | Moneda no permitida o monto inválido bloquean guardado. |
| **Postcondiciones** | Precio disponible para publicación. |
| **RN/RNF** | RN-07, RNF-07. |

**UC-12 Publicar catálogo controlado (RFF-12)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-12 Publicar catálogo controlado (RFF-12) |
| **Propósito** | Publicar solo productos completos y consistentes. |
| **Actores** | Administrador Comercial, Cliente B2B. |
| **Precondiciones** | Producto con datos mínimos validados. |
| **Disparador** | Solicitud de publicar producto. |
| **Flujo Principal** | 1) Sistema verifica completitud. 2) Cambia estado a público. |
| **Excepciones** | Producto incompleto queda en borrador. |
| **Postcondiciones** | Catálogo público consistente. |
| **RN/RNF** | RN-08, RN-14, RNF-05. |

**UC-13 Registrar certificaciones (RFF-13)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-13 Registrar certificaciones (RFF-13) |
| **Propósito** | Registrar certificaciones con soporte documental. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Sesión válida y permisos. |
| **Disparador** | Alta/edición de certificación. |
| **Flujo Principal** | 1) Registrar tipo y vigencia. 2) Adjuntar evidencia. 3) Guardar. |
| **Excepciones** | Sin evidencia o vigencia inválida, no guardar. |
| **Postcondiciones** | Certificación disponible para publicación. |
| **RN/RNF** | RN-09, RN-12, RNF-05. |

**UC-14 Publicar certificaciones vigentes (RFF-14)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-14 Publicar certificaciones vigentes (RFF-14) |
| **Propósito** | Mostrar al cliente solo certificaciones activas. |
| **Actores** | Administrador Comercial, Cliente B2B. |
| **Precondiciones** | Certificación registrada. |
| **Disparador** | Publicación o consulta pública de certificaciones. |
| **Flujo Principal** | 1) Verificar vigencia. 2) Publicar/mostrar en portal. |
| **Excepciones** | Certificación vencida marcada no vigente. |
| **Postcondiciones** | Evidencia pública alineada a vigencia real. |
| **RN/RNF** | RN-09, RN-14. |

**UC-15 Gestionar traducciones (RFF-15)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-15 Gestionar traducciones (RFF-15) |
| **Propósito** | Mantener contenidos en ES/EN/PT. |
| **Actores** | Administrador Comercial. |
| **Precondiciones** | Contenido base en español. |
| **Disparador** | Carga o actualización de traducción. |
| **Flujo Principal** | 1) Editar versión por idioma. 2) Guardar estado por idioma. |
| **Excepciones** | Si EN/PT incompleto, se mantiene como no publicado. |
| **Postcondiciones** | Contenido multilingüe administrado. |
| **RN/RNF** | RN-10, RNF-06. |

**UC-16 Seleccionar idioma en portal (RFF-16)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-16 Seleccionar idioma en portal (RFF-16) |
| **Propósito** | Permitir navegación del comprador en idioma preferido. |
| **Actores** | Cliente B2B. |
| **Precondiciones** | Portal público disponible. |
| **Disparador** | Cliente cambia idioma en interfaz. |
| **Flujo Principal** | 1) Selecciona idioma. 2) Sistema carga versión disponible. |
| **Excepciones** | Si no existe traducción, aplicar fallback a ES. |
| **Postcondiciones** | Cliente visualiza contenido en idioma disponible. |
| **RN/RNF** | RN-10, RN-14, RNF-06. |

**UC-17 Autenticar usuario administrativo (RFF-17)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-17 Autenticar usuario administrativo (RFF-17) |
| **Propósito** | Restringir acceso al panel a usuarios válidos. |
| **Actores** | Administrador Operativo, Administrador Comercial. |
| **Precondiciones** | Usuario registrado. |
| **Disparador** | Intento de inicio de sesión. |
| **Flujo Principal** | 1) Ingresar credenciales. 2) Validar identidad. 3) Emitir sesión/JWT. |
| **Excepciones** | Credenciales inválidas o token expirado requieren nuevo inicio. |
| **Postcondiciones** | Sesión autenticada activa. |
| **RN/RNF** | RN-11, RNF-02, RNF-03. |

**UC-18 Autorizar operación por rol (RFF-18)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-18 Autorizar operación por rol (RFF-18) |
| **Propósito** | Controlar acciones por matriz de permisos. |
| **Actores** | Administrador Operativo, Administrador Comercial, Gerencia. |
| **Precondiciones** | Usuario autenticado. |
| **Disparador** | Ejecución de operación crítica. |
| **Flujo Principal** | 1) Consultar rol/permisos. 2) Autorizar o denegar. |
| **Excepciones** | Denegación registra intento sin modificar datos. |
| **Postcondiciones** | Operaciones ejecutadas solo por usuarios autorizados. |
| **RN/RNF** | RN-12, RN-15, RNF-02. |

**UC-19 Registrar bitácora operativa (RFF-19)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-19 Registrar bitácora operativa (RFF-19) |
| **Propósito** | Mantener trazabilidad de operaciones críticas. |
| **Actores** | Sistema, Gerencia (consulta). |
| **Precondiciones** | Operación crítica en curso. |
| **Disparador** | Confirmación de acción crítica. |
| **Flujo Principal** | 1) Capturar usuario/fecha/acción/entidad. 2) Persistir evento. |
| **Excepciones** | Si falla registro de bitácora, operación crítica no confirma. |
| **Postcondiciones** | Evento auditable disponible para revisión. |
| **RN/RNF** | RN-13, RNF-11. |

**UC-20 Consulta histórica gerencial (RFF-20)**

| **Atributo** | **Descripción** |
| --- | --- |
| **Caso de Uso** | UC-20 Consulta histórica gerencial (RFF-20) |
| **Propósito** | Soportar decisiones de gerencia con información histórica consolidada. |
| **Actores** | Gerencia General. |
| **Precondiciones** | Sesión autorizada de gerencia. |
| **Disparador** | Solicitud de reporte/consulta histórica. |
| **Flujo Principal** | 1) Definir filtros. 2) Consultar movimientos de despachos/catálogo/certificaciones. 3) Visualizar resultados. |
| **Excepciones** | Sin datos en rango, mostrar resultado vacío controlado. |
| **Postcondiciones** | Información lista para análisis gerencial. |
| **RN/RNF** | RN-13, RN-15, RNF-11. |

## Modelo Lógico

### Análisis de objetos

* UC-01 — Consultar Tracking Público

Figura 6

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-02 — Validar Código de Seguimiento

Figura 7

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-03 — Visualizar Estado Logístico

Figura 8

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-04 — Registrar Despacho

Figura 9

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-05 — Actualizar Estado de Despacho

Figura 10

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-06 — Consultar Historial de Estados

Figura 11

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-07 — Gestionar Contenido Corporativo

Figura 12

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-08 — Publicar Contenido Web

Figura 13

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-09 — Alta y Edición de Productos

Figura 14

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-10 — Gestión de Presentaciones Logísticas

Figura 15

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-11 — Gestión de Precios Multimoneda

Figura 16

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-12 — Publicación Controlada de Catálogo

Figura 17

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-13 — Registro de Certificaciones

Figura 18

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-14 — Publicación y Vigencia de Certificaciones

Figura 19

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-15 — Gestión de Traducciones

Figura 20

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-16 — Selección de Idioma en Portal

Figura 21

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-17 — Autenticación de Usuarios Administrativos

Figura 22

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-18 — Autorización por Roles y Permisos

Figura 23

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-19 — Bitácora de Cambios Operativos

Figura 24

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* UC-20 — Consulta Administrativa para Toma de Decisiones

Figura 25

![](data:image/png;base64...)

*Fuente: Elaboración propia*

* Cuadro de objetos

| **Objeto** | **Responsabilidad** | **Atributos clave** | **Colaboraciones** |
| --- | --- | --- | --- |
| Usuario | Representar identidad administrativa del sistema. | id, username, hashPassword, estado, ultimoAcceso | Rol, Sesion, BitacoraEvento |
| Rol | Definir conjunto de privilegios por perfil interno. | id, nombreRol, descripcion | Permiso, Usuario |
| Permiso | Representar acción autorizable en el sistema. | id, recurso, accion | Rol |
| Sesion | Gestionar estado de autenticación y vigencia de acceso. | id, tokenJwt, fechaExpiracion, ipOrigen | Usuario |
| Despacho | Modelar envío exportable sujeto a tracking. | id, codigoTracking, fechaRegistro, estadoActual | EstadoDespacho, CodigoTracking, BitacoraEvento |
| EstadoDespacho | Registrar transición logística del despacho. | id, estado, fechaHora, observacion, responsable | Despacho, Usuario |
| CodigoTracking | Encapsular identificador opaco de consulta pública. | valor, activo, fechaCreacion | Despacho |
| Producto | Representar oferta exportable de la empresa. | id, nombre, descripcion, estadoPublicacion | PresentacionLogistica, Precio, Traduccion |
| PresentacionLogistica | Definir formato de venta logística permitido. | id, tipoUnidad, capacidad | Producto |
| Precio | Registrar monto comercial por presentación y moneda. | id, moneda, monto, vigencia | Producto, PresentacionLogistica |
| Certificacion | Gestionar evidencias de cumplimiento de calidad. | id, tipo, fechaEmision, fechaVencimiento, urlEvidencia, estadoVigencia | BitacoraEvento |
| Contenido | Modelar contenido corporativo/comercial del portal. | id, seccion, estadoPublicacion, fechaActualizacion | Traduccion, BitacoraEvento |
| Traduccion | Representar variante idiomática por contenido/producto. | id, idioma, titulo, cuerpo, estado | Contenido, Producto |
| BitacoraEvento | Registrar operaciones críticas para auditoría. | id, entidad, accion, fechaHora, usuarioId, detalle | Usuario, Despacho, Producto, Certificacion, Contenido |

### Diagrama de Secuencia ***Secuencia B: Actualización administrativa de estado ![](data:image/jpeg;base64...)***

* ***UC-01 — Consultar Tracking Público***

Figura 26

***![](data:image/png;base64...)****Fuente: Elaboración propia*

* ***UC-02 — Validar Código de Seguimiento***

Figura 27

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-03 — Visualizar Estado Logístico***

Figura 28

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-04 — Registrar Despacho***

Figura 29

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-05 — Actualizar Estado de Despacho***

Figura 30

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-06 — Consultar Historial de Estados***

Figura 31

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-07 — Gestionar Contenido Corporativo***

Figura 32

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-08 — Publicar Contenido Web***

Figura 33

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-09 — Alta y Edición de Productos***

Figura 34

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-10 — Gestión de Presentaciones Logísticas***

Figura 35

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-11 — Gestión de Precios Multimoneda***

Figura 36

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-12 — Publicación Controlada de Catálogo***

Figura 37

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-13 — Registro de Certificaciones***

Figura 38

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-14 — Publicación y Vigencia de Certificaciones***

Figura 39

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-15 — Gestión de Traducciones***

Figura 40

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-16 — Selección de Idioma en Portal***

Figura 41

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-17 — Autenticación de Usuarios Administrativos***

Figura 42

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-18 — Autorización por Roles y Permisos***

Figura 43

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-19 — Bitácora de Cambios Operativos***

Figura 44

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

* ***UC-20 — Consulta Administrativa para Toma de Decisiones***

Figura 45

***![](data:image/png;base64...)***

*Fuente: Elaboración propia*

### Diagrama de Clases

**Figura 46**

Diagrama de clases general

![](data:image/jpeg;base64...)

*Fuente: Elaboración propia*