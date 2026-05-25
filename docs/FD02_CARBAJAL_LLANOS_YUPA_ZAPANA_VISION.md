**![C:\Users\EPIS\Documents\upt.png](data:image/png;base64...)**

**UNIVERSIDAD PRIVADA DE TACNA**

**FACULTAD DE INGENIERÍA**

**Escuela Profesional de Ingeniería de Sistemas**

**Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.**

Curso: *Gestión de Proyectos*

Docente: Ing. Dr. Matha Paredes Vignola

Integrantes:

**Carbajal Vargas, Andre Alejandro (2023077287)**

**Llanos Niño, Vincenzo Rafael (2023076797)**

**Yupa Gomez, Fatima Sofia (2023076618)**

**Zapana Murillo, Kiara Holly (2023077087)**

**Tacna – Perú**

***2026***

#

#

#

#

#

#

#

**Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.**

**Documento de Especificación de Requerimientos de Software**

**Versión *1.0***

| **Versión** | **Hecha por** | **Revisada por** | **Aprobada por** | **Fecha** | **Motivo** |
| --- | --- | --- | --- | --- | --- |
| 1.0 | KHZM / FSYP | VRLN / AACV | KHZM / AACV | 21/04/2026 | V1.0 |

[**1. Introducción 5**](#_heading=)

[**1.1. Propósito 5**](#_heading=)

[**1.2. Alcance 5**](#_heading=)

[**1.3. Definiciones, Siglas y Abreviaturas 6**](#_heading=)

[**1.4. Referencias 7**](#_heading=)

[**1.5. Visión General 8**](#_heading=)

[**2. Posicionamiento 8**](#_heading=)

[**2.1. Oportunidad de negocio 8**](#_heading=)

[**2.2. Definición del problema 9**](#_heading=)

[**3. Descripción de los interesados y usuarios 10**](#_heading=)

[**3.1. Resumen de los interesados 10**](#_heading=)

[**3.2. Resumen de los usuarios 10**](#_heading=)

[**3.3. Entorno de usuario 11**](#_heading=)

[**3.4. Perfiles de los interesados 11**](#_heading=)

[**3.4.1. Gerencia General - NODIEX DEL PERÚ S.A.C. 11**](#_heading=)

[**3.4.2. Personal Administrativo / Comercial 12**](#_heading=)

[**3.4.3. Equipo DesarrolladorPerfiles de los Usuarios 12**](#_heading=)

[**3.4.4. Administrador del Sistema 13**](#_heading=)

[**3.4.5. Cliente B2B Internacional 13**](#_heading=)

[**3.4.6. Visitante Web 14**](#_heading=)

[**3.5. Necesidades de los interesados y usuarios 14**](#_heading=)

[**4. Vista General del Producto 15**](#_heading=)

[**4.1. Perspectiva del producto 15**](#_heading=)

[**4.2. Resumen de capacidades 15**](#_heading=)

[**4.3. Suposiciones y dependencias 16**](#_heading=)

[**4.4. Costos y precios 16**](#_heading=)

[**4.5. Licenciamiento e instalación 17**](#_heading=)

[**5. Características del producto 17**](#_heading=)

[**6. Restricciones 18**](#_heading=)

[**7. Rangos de calidad 18**](#_heading=)

[**8. Precedencia y Prioridad 19**](#_heading=)

[**9. Otros requerimientos del producto 20**](#_heading=)

[**9.1. Estándares aplicables 20**](#_heading=)

[**9.2. Estándares legales 20**](#_heading=)

[**9.3. Estándares de comunicación 20**](#_heading=)

[**9.4. Estándares de cumplimiento de la plataforma 20**](#_heading=)

[**9.5. Estándares de calidad y seguridad 21**](#_heading=)

[**CONCLUSIONES 22**](#_heading=)

[**RECOMENDACIONES 22**](#_heading=)

[**BIBLIOGRAFÍA 22**](#_heading=)

[**WEBGRAFÍA 23**](#_heading=)

# Introducción

## Propósito

El presente Documento de Visión tiene como propósito definir, de manera clara y estructurada, la visión general del sistema web de modernización digital y trazabilidad logística para la empresa NODIEX DEL PERÚ S.A.C. Este documento sirve como referencia principal para todos los interesados del proyecto, estableciendo el contexto del problema, las necesidades de los usuarios, las características esperadas del producto y los criterios de éxito del sistema.

El documento está dirigido a la gerencia de NODIEX DEL PERÚ S.A.C., al equipo de desarrollo y al docente evaluador del curso de Gestión de Proyectos de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Privada de Tacna.

## Alcance

El proyecto comprende el diseño, desarrollo e implementación de un sistema web denominado Sistema de Trazabilidad Logística y Modernización Digital para NODIEX DEL PERÚ S.A.C., que abarca los siguientes módulos funcionales:

* Módulo de Order Tracking: Portal público de seguimiento de despachos internacionales mediante códigos únicos opacos, sin requerir autenticación del cliente B2B.
* Módulo de Panel Administrativo: Interfaz de gestión interna para el registro y actualización de envíos, catálogo de productos, precios por contenedor y publicación de certificaciones oficiales.
* Módulo de Catálogo Multiidioma: Presentación del portafolio de productos agroexportadores en español, inglés y portugués, con precios en PEN, USD y EUR.
* Módulo de Certificaciones: Sección pública para la visualización de certificaciones vigentes (SENASA, BRC, ISO, BASC).
* Módulo de Seguridad: Autenticación basada en JSON Web Tokens (JWT) y cifrado bcrypt para el acceso al panel administrativo.

El sistema se desplegará en infraestructura Cloud (Vercel + servidor VPS) y no incluye en su alcance la integración directa con sistemas aduaneros ni el procesamiento de pagos en línea.

## Definiciones, Siglas y Abreviaturas

| **Término / Sigla** | **Definición** |
| --- | --- |
| B2B (Business-to-Business) | Modelo de negocio en el que las transacciones comerciales se realizan entre empresas, en este caso entre NODIEX y sus compradores internacionales. |
| JWT (JSON Web Token) | Estándar abierto (RFC 7519) para la transmisión segura de información entre partes como un objeto JSON firmado digitalmente. |
| API REST | Interfaz de programación de aplicaciones basada en el estilo arquitectónico REST, que utiliza el protocolo HTTP para el intercambio de datos. |
| CDN (Content Delivery Network) | Red de distribución de contenido que acelera la entrega de recursos web a usuarios de distintas ubicaciones geográficas. |
| VPS (Virtual Private Server) | Servidor virtual privado alojado en la nube que proporciona recursos dedicados para el despliegue de aplicaciones. |
| Next.js | Framework de React para aplicaciones web con renderizado del lado del servidor y generación de sitios estáticos. |
| PostgreSQL | Sistema de gestión de bases de datos relacional de código abierto, ampliamente utilizado en aplicaciones de producción. |
| SENASA | Servicio Nacional de Sanidad Agraria del Perú. Organismo que emite certificaciones fitosanitarias para productos de exportación. |
| BRC | British Retail Consortium. Certificación internacional de estándares de seguridad alimentaria. |
| BASC | Business Alliance for Secure Commerce. Certificación de seguridad en la cadena de suministro. |
| COK | Costo de Oportunidad del Capital. Tasa de descuento utilizada para actualizar los flujos de caja futuros del proyecto. |
| TIR | Tasa Interna de Retorno. Indicador financiero que mide la rentabilidad promedio anual de una inversión. |
| VAN | Valor Actual Neto. Indicador financiero que mide el valor presente de los flujos de caja netos del proyecto. |

## Referencias

| **N.°** | **Documento** | **Versión** | **Fecha** |
| --- | --- | --- | --- |
| 01 | FD01 - Informe de Factibilidad: Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C. | 1.0 | 15/05/2026 |
| 02 | FD06 - Propuesta de Proyecto: Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C. | 1.0 | 15/05/2026 |

## Visión General

El presente documento se organiza en nueve secciones principales. La Sección 1 contextualiza el proyecto. La Sección 2 analiza el posicionamiento estratégico y la definición del problema. La Sección 3 describe en detalle a los interesados y usuarios del sistema. La Sección 4 presenta la vista general del producto, incluyendo capacidades, costos y licenciamiento. La Sección 5 enumera las características funcionales del sistema. Las Secciones 6, 7 y 8 cubren restricciones, rangos de calidad y prioridades. Finalmente, la Sección 9 detalla otros requisitos del producto relativos a estándares legales, de comunicación, plataforma y seguridad.

# Posicionamiento

## Oportunidad de negocio

El mercado global de agroexportación se encuentra en constante expansión. Perú, como uno de los principales exportadores de productos agrícolas de América Latina, enfrenta una competencia creciente de proveedores que operan bajo ecosistemas digitales automatizados. En este contexto, NODIEX DEL PERÚ S.A.C., empresa agroexportadora ubicada en Tacna, cuenta con productos certificados de alta calidad (SENASA, BRC, ISO, BASC) pero carece de la infraestructura digital necesaria para comunicar ese valor a sus clientes internacionales B2B de forma eficiente.

La oportunidad identificada es doble:

* Captación de nuevos compradores B2B en mercados de habla inglesa y portuguesa, actualmente inaccesibles por la ausencia de contenido multiidioma en la plataforma web.
* Retención y fidelización de clientes existentes mediante la automatización del seguimiento logístico, eliminando el principal punto de fricción documentado: el tiempo de 45 minutos por consulta de estado de contenedor.

El desarrollo e implementación del sistema web representa una inversión controlada de S/ 10,700.00 con un retorno proyectado de S/ 18,100.00 anuales en beneficios tangibles, lo que equivale a una TIR del 139.14% y una relación Beneficio/Costo de 3.85, según el análisis financiero del Informe de Factibilidad FD01.

## Definición del problema

| **El problema** | **Afecta a** | **Cuyo impacto es** | **Una solución exitosa sería** |
| --- | --- | --- | --- |
| Sitio web incompleto y obsoleto (PHP estático, sin precios por contenedor, sin certificaciones públicas, sin versión en inglés ni portugués) | Gerencia de NODIEX y potenciales clientes B2B internacionales | Incapacidad de captar nuevos compradores internacionales; pérdida de competitividad frente a exportadores digitalizados | Un sistema web dinámico con catálogo multiidioma, precios por contenedor en divisas internacionales y sección pública de certificaciones |
| Gestión reactiva del seguimiento logístico mediante llamadas, mensajes y correos dispersos (45 minutos documentados por consulta) | Personal administrativo de NODIEX y clientes B2B internacionales | Saturación del equipo administrativo, demoras informativas, quejas formales registradas y riesgo de abandono de clientes | Un módulo de Order Tracking con código único opaco que permite la consulta instantánea del estado del despacho sin autenticación, en menos de 10 segundos |

# Descripción de los interesados y usuarios

## Resumen de los interesados

| **Nombre** | **Descripción** | **Responsabilidad** |
| --- | --- | --- |
| Gerencia General - NODIEX DEL PERÚ S.A.C. | Patrocinador principal del proyecto. Toma decisiones estratégicas y evalúa el retorno financiero. | Aprobar el proyecto, proveer acceso a información comercial, financiar la operación del sistema. |
| Personal Administrativo / Comercial | Equipo interno de la empresa que gestiona pedidos, actualiza el catálogo y alimenta el estado logístico. | Operar el panel administrativo, registrar envíos y mantener actualizada la información del sistema. |
| Clientes B2B Internacionales | Compradores extranjeros que adquieren productos de NODIEX en volúmenes de contenedores. | Consultar el estado de sus despachos y acceder al catálogo de productos y certificaciones. |
| Equipo Desarrollador (Consultores) | Estudiantes de Ingeniería de Sistemas de la UPT responsables del diseño, codificación e implementación. | Diseñar, desarrollar, documentar, desplegar y brindar mantenimiento anual del sistema. |

## Resumen de los usuarios

| **Nombre** | **Descripción** | **Interesado representativo** |
| --- | --- | --- |
| Administrador del Sistema | Usuario interno con acceso completo al panel administrativo. Registra envíos, gestiona el catálogo, actualiza precios y publica certificaciones. | Personal Administrativo / Comercial de NODIEX |
| Cliente B2B Internacional | Usuario externo que consulta el estado de su despacho mediante el portal público de tracking, sin necesidad de crear cuenta. | Compradores internacionales de NODIEX |
| Visitante Web | Usuario externo que navega el catálogo de productos, consulta precios y revisa certificaciones sin interacción transaccional. | Potenciales compradores internacionales y distribuidores |

## Entorno de usuario

El sistema será accedido desde dos entornos distintos: administrativo interno y cliente externo. El personal de NODIEX utilizará computadoras de escritorio o laptops con navegadores modernos y sesiones seguras JWT; los compradores B2B internacionales accederán desde cualquier dispositivo conectado a internet mediante un código de seguimiento único.

El sistema operará en horario 24/7 dado su carácter público para el tracking. El panel administrativo se utilizará principalmente en horario laboral de Tacna, Perú, GMT-5.

## Perfiles de los interesados

## Gerencia General - NODIEX DEL PERÚ S.A.C.

| **Campo** | **Detalle** |
| --- | --- |
| Representante | Gerente General de NODIEX DEL PERÚ S.A.C. |
| Descripción | Patrocinador y principal tomador de decisiones del proyecto. |
| Tipo | Patrocinador ejecutivo |
| Responsabilidades | Aprobar el presupuesto, facilitar el acceso a información comercial y validar los entregables. |
| Criterio de éxito | Incremento de clientes B2B internacionales y reducción de costos operativos. |
| Grado de participación | Alto. |

## Personal Administrativo / Comercial

| **Campo** | **Detalle** |
| --- | --- |
| Representante | Coordinador Comercial / Asistente Administrativo de NODIEX |
| Descripción | Equipo operativo que utiliza el panel diariamente. |
| Tipo | Usuario primario / Operador del sistema |
| Responsabilidades | Registrar envíos, actualizar catálogo, gestionar precios y publicar certificaciones. |
| Criterio de éxito | Reducción del tiempo de gestión de consultas de tracking. |
| Grado de participación | Alto. |

## Equipo DesarrolladorPerfiles de los Usuarios

| **Campo** | **Detalle** |
| --- | --- |
| Representante | Carbajal Vargas, Andre A. / Llanos Niño, Vincenzo R. / Yupa Gómez, Fátima S. / Zapana Murillo, Kiara H. |
| Descripción | Equipo consultor de la UPT responsable del ciclo completo de desarrollo. |
| Tipo | Equipo de desarrollo y mantenimiento |
| Responsabilidades | Entregar el sistema funcional en 10 semanas, documentar, capacitar y mantener. |
| Criterio de éxito | Sistema desplegado en producción y personal capacitado. |
| Grado de participación | Máximo. |

## Administrador del Sistema

| **Campo** | **Detalle** |
| --- | --- |
| Representante | Personal Administrativo / Comercial de NODIEX |
| Descripción | Usuario interno con credenciales de acceso al panel administrativo. |
| Tipo | Usuario primario / Operador |
| Responsabilidades | Registrar despachos, asignar códigos, actualizar catálogo, precios y certificaciones. |
| Criterios de éxito | Operar el sistema de forma autónoma desde el primer día. |
| Implicaciones | Requiere capacitación y manuales de usuario. |

## Cliente B2B Internacional

| **Campo** | **Detalle** |
| --- | --- |
| Representante | Importador internacional |
| Descripción | Usuario externo que consulta el estado de su contenedor. |
| Tipo | Usuario secundario / Cliente final |
| Responsabilidades | Ingresar el código de seguimiento único. |
| Criterios de éxito | Obtener información actualizada en menos de 10 segundos. |
| Implicaciones | Interfaz en inglés y portugués, acceso sin registro y compatible con móviles. |

## Visitante Web

| **Campo** | **Detalle** |
| --- | --- |
| Representante | Potencial comprador o distribuidor internacional |
| Descripción | Usuario externo que navega el catálogo público. |
| Tipo | Usuario terciario / Prospecto comercial |
| Responsabilidades | Solo lectura de información pública. |
| Criterios de éxito | Acceso claro a productos, precios y certificaciones. |
| Implicaciones | Interfaz multiidioma y carga rápida. |

## Necesidades de los interesados y usuarios

| **Necesidad** | **Prioridad** | **Preocupaciones** | **Solución actual** | **Solución propuesta** |
| --- | --- | --- | --- | --- |
| Seguimiento en tiempo real del estado de despachos internacionales | Alta | 45 min. por consulta, saturación y quejas | Correos, llamadas y mensajes | Portal de Order Tracking con código único opaco |
| Catálogo de productos con precios en divisas internacionales | Alta | Clientes no pueden evaluar costos sin contactar | Información por correo o PDF | Catálogo multimoneda en tres idiomas |
| Publicación pública de certificaciones de calidad | Media | Desconfianza del importador | Documentos físicos o adjuntos | Certificaciones descargables |
| Panel de administración autónomo | Alta | Dependencia del equipo técnico | Edición de PHP estático | Panel administrativo tipo CMS |
| Soporte multiidioma | Media | Pérdida de oportunidades comerciales | Solo español | Interfaz ES/EN/PT |

# Vista General del Producto

## Perspectiva del producto

El sistema web de NODIEX DEL PERÚ S.A.C. es un producto nuevo que reemplaza integralmente la infraestructura web estática actual basada en PHP. El sistema se concibe como una plataforma independiente desplegada en la nube, sin integración con ERP, aduanas o bancos en su versión inicial.

La arquitectura propuesta es Cloud-Native, utilizando Next.js 14+ / React 18, Route Handlers de Next.js, PostgreSQL 15+, Vercel y un servidor VPS gestionado por Elástika.

## Resumen de capacidades

| **Beneficio para el cliente** | **Características que lo soportan** |
| --- | --- |
| Reducción del tiempo de consulta de estado de despacho | Módulo de Order Tracking con códigos únicos opacos |
| Captación de nuevos compradores | Interfaz web multiidioma ES / EN / PT |
| Eliminación de la dependencia técnica | Panel administrativo tipo CMS |
| Confianza del importador | Sección pública de certificaciones descargables |
| Negociación comercial facilitada | Catálogo con precios por contenedor en PEN, USD y EUR |
| Protección de información corporativa | Autenticación JWT y cifrado bcrypt |
| Notificación automática | Integración con Nodemailer / Resend |

## Suposiciones y dependencias

NODIEX dispondrá del presupuesto anual para servicios cloud.

El personal administrativo participará en las sesiones de capacitación.

Los clientes B2B internacionales cuentan con acceso a internet.

Las certificaciones se proporcionarán en formato digital.

Los contenidos en inglés y portugués serán validados por la gerencia.

Se depende de Vercel, Elástika, Node.js, Next.js y servicios de correo.

## Costos y precios

| **Componente** | **Monto (S/)** |
| --- | --- |
| Inversión total de desarrollo (Año 0) | S/ 10,700.00 |
| Costos de personal | S/ 10,000.00 |
| Costos generales | S/ 350.00 |
| Costos del ambiente | S/ 350.00 |
| Egresos operativos anuales | S/ 1,810.00 / año |
| Servidor VPS Cloud | S/ 200.00 / año |
| Mantenimiento técnico | S/ 1,500.00 / año |
| Renovación de dominios | S/ 110.00 / año |
| Hosting frontend / CDN | S/ 0.00 |

## Licenciamiento e instalación

El equipo desarrollador conservará la propiedad intelectual y los derechos patrimoniales sobre el código fuente. A NODIEX DEL PERÚ S.A.C. se le otorgará una licencia de uso corporativa perpetua, no transferible.

La propiedad de las bases de datos, información de clientes, activos digitales y catálogo de productos pertenecerá exclusivamente a NODIEX DEL PERÚ S.A.C.

Frontend y API: despliegue automático en Vercel.

Base de datos: PostgreSQL en VPS de Elástika.

Dominio: DNS apuntando al CDN de Vercel.

# Características del producto

| **ID** | **Característica** | **Descripción** |
| --- | --- | --- |
| CAR-01 | Portal de Order Tracking Público | Consulta de estado y ubicación mediante código único opaco, sin registro ni autenticación. |
| CAR-02 | Generación de Códigos de Seguimiento | Generación automática de código único por despacho. |
| CAR-03 | Panel Administrativo CMS | Gestión de catálogo, precios, certificaciones y despachos. |
| CAR-04 | Catálogo Multiidioma | Portafolio en español, inglés y portugués. |
| CAR-05 | Precios Multimoneda por Contenedor | Precios en PEN, USD y EUR para contenedores de 20 y 40 pies. |
| CAR-06 | Sección de Certificaciones Públicas | Publicación y descarga de certificaciones oficiales. |
| CAR-07 | Autenticación JWT y Control de Acceso | JWT y bcrypt para proteger el panel administrativo. |
| CAR-08 | Notificaciones Automáticas de Tracking | Correos ante cambios de estado mediante Nodemailer / Resend. |
| CAR-09 | Interfaz Responsiva y Multiplataforma | Diseño responsive para móviles, tablets y computadoras. |
| CAR-10 | Gestión de Roles y Permisos | Roles diferenciados para administradores. |

# Restricciones

| **ID** | **Restricción** | **Descripción** |
| --- | --- | --- |
| RES-01 | Conectividad a Internet | Requiere conexión activa; no existe modo offline. |
| RES-02 | Compatibilidad de Navegadores | Soporta versiones actuales de Chrome, Firefox, Safari y Edge. |
| RES-03 | Sin Procesamiento de Pagos | No incluye pasarelas de pago en v1.0. |
| RES-04 | Sin Integración Aduanera | No se integra con SUNAT, aduanas ni navieras. |
| RES-05 | Marco Legal Peruano | Cumplimiento de Ley N.° 29733. |
| RES-06 | Plazo de Desarrollo | Duración máxima de 10 semanas. |
| RES-07 | Tecnología Definida | Next.js, React, PostgreSQL y Vercel. |

# Rangos de calidad

| **Atributo de calidad** | **Métrica** | **Rango aceptable** |
| --- | --- | --- |
| Disponibilidad | Tiempo en línea mensual | >= 99.5% |
| Rendimiento - Tracking | Tiempo de respuesta | < 10 segundos |
| Rendimiento - Panel | Tiempo de carga | < 2 segundos |
| Usabilidad | Aprendizaje del panel | Capacitación de 2 horas |
| Seguridad - Autenticación | Intentos fallidos | Bloqueo tras 5 intentos; JWT 8 horas |
| Seguridad - Tracking | Rate limiting | 30 consultas por IP cada 10 minutos |
| Escalabilidad | Usuarios concurrentes | Hasta 500 |
| Compatibilidad | Navegadores y dispositivos | Chrome, Firefox, Safari, Edge; responsive desde 320px |

# Precedencia y Prioridad

Las características del sistema han sido priorizadas en función de su impacto directo en los objetivos de negocio y la urgencia de las necesidades identificadas.

| **Prioridad** | **ID** | **Característica** | **Justificación** |
| --- | --- | --- | --- |
| 1 - Crítica | CAR-01 | Portal de Order Tracking Público | Resuelve el problema principal documentado. |
| 1 - Crítica | CAR-07 | Autenticación JWT y Control de Acceso | Requisito de seguridad base. |
| 2 - Alta | CAR-03 | Panel Administrativo CMS | Permite operación autónoma. |
| 2 - Alta | CAR-02 | Generación de Códigos de Seguimiento | Componente core del tracking. |
| 3 - Media | CAR-04 | Catálogo Multiidioma | Habilita nuevos mercados. |
| 3 - Media | CAR-05 | Precios Multimoneda | Facilita negociación internacional. |
| 3 - Media | CAR-06 | Certificaciones Públicas | Fortalece confianza. |
| 4 - Baja | CAR-08 | Notificaciones Automáticas | Mejora experiencia. |
| 4 - Baja | CAR-09 | Interfaz Responsiva | Amplía alcance móvil. |
| 4 - Baja | CAR-10 | Roles y Permisos | Escalabilidad de acceso. |

# Otros requerimientos del producto

# Estándares aplicables

| **Estándar / Criterio** | **Aplicación / Especificación** |
| --- | --- |
| ISO/IEC 25010:2011 | Marco de calidad del producto software. |
| OWASP Top 10 (2021) | Guía de buenas prácticas de seguridad web. |
| RFC 7519 - JSON Web Token | Estándar de autenticación y autorización. |
| WCAG 2.1 - Nivel AA | Pautas de accesibilidad web. |

## Estándares legales

| **Estándar / Criterio** | **Aplicación / Especificación** |
| --- | --- |
| Ley N.° 29733 | Protección de datos personales. |
| D.S. 003-2013-JUS | Reglamento de la Ley N.° 29733. |
| Ley N.° 27291 | Firma electrónica. |
| Ley N.° 28015 | Marco MYPE. |

## Estándares de comunicación

| **Estándar / Criterio** | **Aplicación / Especificación** |
| --- | --- |
| HTTPS / SSL-TLS 1.3 | Cifrado del tráfico. |
| REST | Comunicación frontend-backend. |
| JSON | Intercambio de datos. |
| SMTP | Notificaciones automáticas. |
| UTF-8 | Soporte multilingüe. |

## Estándares de cumplimiento de la plataforma

| **Estándar / Criterio** | **Aplicación / Especificación** |
| --- | --- |
| Node.js | v20.x LTS o superior. |
| Next.js | v14.x o superior. |
| React | v18.x o superior. |
| PostgreSQL | v15.x o superior. |
| Vercel | Plan Hobby o Pro. |
| Navegadores | Chrome 110+, Firefox 110+, Safari 16+, Edge 110+. |

## Estándares de calidad y seguridad

| **Estándar / Criterio** | **Aplicación / Especificación** |
| --- | --- |
| Gestión de contraseñas | Hash bcrypt con factor mínimo 10. |
| Endpoint de tracking | Rate limiting. |
| Validación de inputs | Validación y sanitización en cliente y servidor. |
| Manejo de errores | Logs internos sin trazas al usuario. |
| Cifrado en tránsito | HTTPS con TLS 1.3. |
| Expiración de sesiones | JWT de 8 horas. |
| Backups | Snapshots diarios. |
| Control de versiones | GitHub privado con ramas protegidas. |

# CONCLUSIONES

El Documento de Visión confirma que el proyecto responde a necesidades de negocio reales y documentadas.

El sistema propuesto aborda integralmente las problemáticas mediante diez características funcionales priorizadas.

La arquitectura Cloud-Native garantiza escalabilidad, disponibilidad, seguridad y costos controlados.

La definición de perfiles de usuario permite priorizar correctamente el backlog.

El cumplimiento legal y de seguridad asegura operación bajo buenas prácticas.

# RECOMENDACIONES

Designar un responsable interno desde el inicio del proyecto.

Priorizar la traducción al inglés del catálogo.

Actualizar el estado de despachos con frecuencia mínima diaria.

Realizar una auditoría de seguridad básica antes del lanzamiento.

Evaluar integración con APIs de navieras para una futura versión 2.0.

Establecer métricas de seguimiento post-implementación.

# BIBLIOGRAFÍA

IBM Corporation. (2004). Rational Unified Process: Plantilla de Documento de Visión, versión 1.0. IBM Rational.

Sommerville, I. (2016). Software Engineering (10.ª ed.). Pearson Education.

Pressman, R. S., & Maxim, B. R. (2015). Ingeniería del Software: Un Enfoque Práctico (8.ª ed.). McGraw-Hill Education.

Congreso de la República del Perú. (2011). Ley N.° 29733 - Ley de Protección de Datos Personales. Diario Oficial El Peruano.

Ministerio de Justicia y Derechos Humanos. (2013). D.S. N.° 003-2013-JUS - Reglamento de la Ley N.° 29733. Diario Oficial El Peruano.

OWASP Foundation. (2021). OWASP Top 10:2021 - Top 10 Web Application Security Risks. OWASP.

Jones, E., & Matelli, C. (2019). PostgreSQL: Up and Running (3.ª ed.). O'Reilly Media.

# WEBGRAFÍA

Vercel Inc. (2024). Vercel Documentation - Edge Network & Deployment. https://vercel.com/docs

Next.js by Vercel. (2024). Next.js 14 Documentation - App Router. https://nextjs.org/docs

The PostgreSQL Global Development Group. (2024). PostgreSQL 15 Documentation. https://www.postgresql.org/docs/15/

OWASP Foundation. (2021). OWASP Top 10 - 2021. https://owasp.org/Top10/

Jones, M. B., Bradley, J., & Sakimura, N. (2015). RFC 7519 - JSON Web Token (JWT). https://datatracker.ietf.org/doc/html/rfc7519

World Wide Web Consortium (W3C). (2018). Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/

Ministerio de Justicia y Derechos Humanos del Perú. (2023). Autoridad Nacional de Protección de Datos Personales. https://www.minjus.gob.pe/privacidad/

SENASA. (2024). Servicio Nacional de Sanidad Agraria - Certificaciones de Exportación. https://www.senasa.gob.pe