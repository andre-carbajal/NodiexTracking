**![C:\Users\EPIS\Documents\upt.png](data:image/png;base64...)**

**UNIVERSIDAD PRIVADA DE TACNA**

**FACULTAD DE INGENIERÍA**

**Escuela Profesional de Ingeniería de Sistemas**

**Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C.**

Curso: Gestión de Proyectos

Docente: Ing. Matha Paredes Vignola

Integrantes:

**Carbajal Vargas, Andre Alejandro (2023077287)**

**Llanos Niño, Vincenzo Rafael (2023076797)**

**Yupa Gomez, Fatima Sofia (2023076618)**

**Zapana Murillo, Kiara Holly (2023077087)**

**Tacna – Perú**

**2026**

Proyecto

Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C., Tacna-Perú, 2026

Presentado por:

Carbajal Vargas, Andre Alejandro

Llanos Niño, Vincenzo Rafael

Yupa Gomez, Fatima Sofia

Zapana Murillo, Kiara Holly

Equipo Desarrollador — Nextrack S.A.C.

14 de mayo de 2026

| CONTROL DE VERSIONES | | | | | |
| --- | --- | --- | --- | --- | --- |
| Versión | Hecha por | Revisada por | Aprobada por | Fecha | Motivo |
| 1.0 | KHZM / FSYP | VRLN / AACV | KHZM / AACV | 14/05/2026 | V1.0 |

**Tabla de contenido**

[I. PROPUESTA NARRATIVA 5](#_heading=)

[a. Planteamiento del Problema 5](#_heading=)

[b. Justificación del proyecto 5](#_heading=)

[c. Objetivo general 5](#_heading=)

[d. Beneficios 6](#_heading=)

[e. Alcance 6](#_heading=)

[f. Requerimientos del sistema 7](#_heading=)

[g. Restricciones 7](#_heading=)

[h. Supuestos 7](#_heading=)

[i. Resultados esperados 7](#_heading=)

[j. Metodología de implementación 8](#_heading=)

[k. Actores claves 8](#_heading=)

[l. Papel y responsabilidades del personal 9](#_heading=)

[m. Plan de monitoreo y evaluación 10](#_heading=)

[n. Cronograma del proyecto 11](#_heading=)

[o. Hitos de entregables 12](#_heading=)

[**II. PRESUPUESTO 12**](#_heading=h.e1n2pm8e6c0y)

[a. Planteamiento de aplicación del presupuesto 12](#_heading=)

[b. Presupuesto 13](#_heading=)

[c. Análisis de Factibilidad 14](#_heading=)

[d. Evaluación Financiera 14](#_heading=)

**RESUMEN EJECUTIVO**

| **Campo** | **Descripción** |
| --- | --- |
| Nombre del Proyecto propuesto | Sistema Web para la Modernización Digital y Trazabilidad Logística de Exportaciones en Nodiex del Perú S.A.C., Tacna - Perú, 2026 |
| Propósito del Proyecto y Resultados esperados | Modernizar la presencia digital y la trazabilidad logística de NODIEX DEL PERÚ S.A.C. mediante una plataforma web dinámica, multilingüe y segura. Se espera reducir el tiempo de consulta de pedidos, centralizar el catálogo exportador, publicar certificaciones y fortalecer la relación comercial B2B internacional. |
| Población Objetivo | Gerencia general, personal administrativo/comercial de NODIEX, clientes B2B internacionales e interesados en la oferta agroexportadora de la empresa. |
| Monto de Inversión | S/ 10,700.00 |
| Duración del Proyecto | Aproximadamente 2.5 meses (10 semanas), del 09 de abril al 24 de junio de 2026. |

El proyecto propone una solución web cloud-native desarrollada con Next.js, React, PostgreSQL y servicios de despliegue en la nube. Su valor principal es transformar un sitio estático y procesos manuales de seguimiento en un sistema administrable, escalable y orientado al comprador internacional.

# PROPUESTA NARRATIVA

# Planteamiento del Problema

# NODIEX DEL PERÚ S.A.C. enfrenta una brecha tecnológica que limita su competitividad internacional. Su presencia web actual se apoya en archivos PHP estáticos, con información incompleta, baja capacidad de actualización y ausencia de funciones críticas para compradores extranjeros, como catálogo con precios por contenedor, certificaciones visibles, soporte multilingüe y trazabilidad logística.

El seguimiento de cargamentos se gestiona de forma reactiva mediante llamadas, mensajes y correos dispersos. Esta dinámica genera saturación administrativa, tiempos de respuesta cercanos a 45 minutos por consulta y pérdida de confianza en clientes B2B que requieren información inmediata sobre el estado de sus despachos.

## Justificación del proyecto

La implementación del sistema se justifica por la necesidad de alinear la operación comercial de NODIEX con estándares actuales de agroexportación. Una plataforma web moderna permitirá proyectar una imagen corporativa competitiva, reducir fricciones operativas y entregar información verificable a clientes internacionales.

El proyecto también reduce costos indirectos asociados a atención manual, impresión de catálogos y coordinación repetitiva. Al usar tecnologías open-source y servicios cloud, la inversión inicial se mantiene controlada sin comprometer escalabilidad, seguridad ni continuidad operativa.

## Objetivo general

Implementar un sistema web de trazabilidad logística y modernización digital para optimizar la eficiencia operativa, agilizar los tiempos de distribución y fortalecer las relaciones comerciales electrónicas B2B de NODIEX DEL PERÚ S.A.C. en el mercado internacional.

* 1. **Objetivos específicos:**
* Desarrollar un módulo de tracking logístico con códigos únicos y opacos para consulta pública segura del estado de despachos.
* Implementar un panel administrativo para gestionar productos, precios por contenedor, certificaciones y contenido multilingüe.
* Adaptar la información comercial a unidades y monedas usadas en exportación internacional: toneladas métricas, contenedores de 20 y 40 pies, PEN, USD y EUR.
* Diseñar controles de autenticación, roles y permisos mediante JWT, cifrado de credenciales y políticas de protección de datos.

## Beneficios

* 1. **Beneficios tangibles:**
* Ahorro operativo anual estimado de S/ 2,600.00 por reducción del tiempo empleado en consultas de tracking.
* Incremento neto anual conservador de S/ 15,000.00 por mayor captación de compradores internacionales mediante canal multilingüe.
* Ahorro anual de S/ 500.00 al reemplazar catálogos y materiales impresos por información digital actualizable.
  1. **Beneficios intangibles:**
* Mejora de reputación e imagen corporativa ante clientes extranjeros.
* Mayor transparencia comercial al publicar certificaciones oficiales y estados logísticos verificables.
* Centralización de información histórica para apoyar decisiones gerenciales.

## Alcance

El alcance comprende el análisis, diseño, construcción, pruebas, despliegue y capacitación de un sistema web para NODIEX. La solución incluirá un portal público, módulo de tracking logístico, catálogo administrable, sección de certificaciones, contenido en español, inglés y portugués, panel administrativo y base de datos relacional.

No se incluye la automatización completa de negociaciones comerciales externas ni la integración obligatoria con sistemas de navieras o aduanas; esas integraciones podrán evaluarse como evolución posterior del producto.

## Requerimientos del sistema

En el anexo 01 se presenta el listado de los requerimientos del usuario que serán implementados en los nuevos módulos del sistema web de trazabilidad logística y modernización digital de Nodiex del Perú S.A.C.

## Restricciones

* El cronograma se limita a 10 semanas, por lo que la priorización de módulos críticos será obligatoria.
* La carga inicial de traducciones dependerá de la validación comercial de NODIEX.
* El presupuesto evita adquisición de servidores físicos; el despliegue dependerá de servicios cloud contratados.
* La información logística deberá ser registrada o actualizada por personal autorizado de la empresa.

## Supuestos

* NODIEX facilitará información de productos, certificaciones, estados logísticos y criterios comerciales necesarios.
* La gerencia mantendrá disponibilidad presupuestaria para dominio, VPS y mantenimiento anual.
* El personal administrativo participará en sesiones de validación y capacitación.
* Los clientes B2B contarán con acceso a internet para consultar el portal de tracking.

## Resultados esperados

* Sistema web desplegado y accesible en entorno productivo.
* Panel administrativo operativo para catálogo, certificaciones y pedidos.
* Módulo de tracking capaz de reducir consultas manuales de 45 minutos a menos de 10 segundos.
* Documentación técnica, manual de usuario y capacitación básica al personal administrativo.
* Indicadores financieros favorables: VAN de S/ 30,534.88, TIR de 139.14% y B/C de 3.85.

## Metodología de implementación

Se aplicará una metodología híbrida basada en RUP para ordenar concepción, elaboración, construcción y transición, complementada con prácticas Scrum para planificar entregables semanales, revisar avances y ajustar prioridades con la empresa.

| **Fase** | **Actividades principales** | **Producto esperado** |
| --- | --- | --- |
| Concepción | Levantamiento de información, delimitación del problema, riesgos y alcance. | Documento base y backlog inicial. |
| Elaboración | Diseño de arquitectura, modelo de datos, prototipos y criterios de seguridad. | Diseño funcional y técnico validado. |
| Construcción | Desarrollo iterativo del portal, panel, catálogo, certificaciones y tracking. | Incrementos funcionales probados. |
| Transición | Pruebas de aceptación, despliegue cloud, capacitación y documentación. | Sistema operativo y acta de conformidad. |

## Actores claves

| **Actor** | **Descripción** | **Responsabilidades** |
| --- | --- | --- |
| Gerencia General de NODIEX | Patrocinador y responsable de la decisión de inversión. | Validar alcance, presupuesto, prioridades y retorno esperado. |
| Personal Administrativo / Comercial | Usuarios directos del panel de administración. | Actualizar productos, certificaciones y estados logísticos. |
| Clientes B2B Internacionales | Compradores o interesados ubicados en mercados externos. | Consultar catálogo, certificaciones y seguimiento de pedidos. |
| Equipo Consultor / Desarrollador | Estudiantes responsables del análisis, diseño, desarrollo y despliegue. | Construir, probar, documentar y capacitar sobre la solución. |

## Papel y responsabilidades del personal

| **Rol** | **Responsable** | **Dedicación** | **Responsabilidades** |
| --- | --- | --- | --- |
| Desarrollador Full-Stack | Andre Alejandro Carbajal Vargas | Tiempo parcial durante el proyecto | Construcción de módulos principales, integración frontend/backend y soporte de despliegue. |
| Desarrolladora Frontend | Kiara Holly Zapana Murillo | Tiempo parcial durante el proyecto | Diseño de interfaces responsivas, portal público y experiencia de usuario. |
| Desarrollador Backend / QA | Vincenzo Rafael Llanos Niño | Tiempo parcial durante el proyecto | Endpoints, lógica de tracking, pruebas funcionales y control de calidad. |
| Especialista en BD y Documentación | Fátima Sofía Yupa Gómez | Tiempo parcial durante el proyecto | Modelo de datos, documentación técnica, manuales y apoyo en validación. |
| Patrocinador del proyecto | NODIEX DEL PERÚ S.A.C. | Según hitos de validación | Aprobar entregables, proveer información y facilitar capacitación interna. |

## Plan de monitoreo y evaluación

El monitoreo se realizará mediante revisiones semanales de avance, control de entregables y pruebas funcionales por módulo. Cada incremento deberá contar con evidencia de prueba, observaciones registradas y validación de los usuarios responsables antes de pasar al siguiente bloque de trabajo.

| **Indicador** | **Meta** | **Frecuencia** | **Responsable** |
| --- | --- | --- | --- |
| Avance de funcionalidades priorizadas | Cumplimiento semanal del backlog planificado. | Semanal | Equipo desarrollador |
| Tiempo de consulta de tracking | Consulta menor a 10 segundos desde el portal. | Por prueba de aceptación | Backend / QA |
| Disponibilidad de información de catálogo | Productos y certificaciones cargados y validados. | Por hito | Administración NODIEX |
| Corrección de observaciones | Observaciones críticas resueltas antes del despliegue. | Semanal | Equipo desarrollador |

* 1. **Principales riesgos y acciones de mitigación:**

| **Riesgo** | **Impacto** | **Mitigación** |
| --- | --- | --- |
| Resistencia al cambio | Demora en adopción del panel administrativo. | Capacitación guiada, manuales y acompañamiento inicial. |
| Retraso en traducciones | Publicación incompleta del canal multilingüe. | Carga inicial en español y liberación progresiva de inglés/portugués. |
| Ataques por fuerza bruta al tracking | Exposición no autorizada de información. | Códigos opacos, rate limiting y monitoreo de peticiones. |
| Errores en precios o divisas | Confusión comercial del comprador internacional. | Validaciones de interfaz y revisión antes de publicar. |

## Cronograma del proyecto

El proyecto se desarrollará en 10 semanas, iniciando el 09 de abril de 2026 y concluyendo el 24 de junio de 2026.

| **Actividad / Fase** | **Sem. 1-2** | **Sem. 3-4** | **Sem. 5-6** | **Sem. 7-8** | **Sem. 9-10** |
| --- | --- | --- | --- | --- | --- |
| Levantamiento, alcance y backlog | X | X |  |  |  |
| Diseño de arquitectura y base de datos |  | X |  |  |  |
| Portal público y catálogo |  | X | X |  |  |
| Panel administrativo |  |  | X | X |  |
| Tracking logístico y seguridad |  |  |  | X | X |
| Certificaciones y contenido multilingüe |  |  | X |  |  |
| Pruebas, ajustes |  |  |  | X | X |
| Capacitación y despliegue |  |  |  |  | X |
| Documentación | X | X | X | X | X |

## Hitos de entregables

| **Hito** | **Entregable** | **Fecha estimada** |
| --- | --- | --- |
| H1 | Documento de alcance, requerimientos y backlog priorizado. | Semana 2 |
| H2 | Arquitectura, modelo de datos y prototipo validado. | Semana 4 |
| H3 | Portal público, catálogo y módulo de certificaciones. | Semana 6 |
| H4 | Panel administrativo y módulo de tracking funcional. | Semana 8 |
| H5 | Pruebas de aceptación, manuales, capacitación y despliegue. | Semana 10 |

# PRESUPUESTO

## Planteamiento de aplicación del presupuesto

El presupuesto se orienta principalmente al talento humano y a la configuración del ambiente cloud. No se considera compra de servidores físicos, debido a que el sistema será desplegado en infraestructura en la nube, reduciendo costos iniciales y complejidad de mantenimiento.

La ejecución económica se controlará por hitos: levantamiento y diseño, construcción de módulos, pruebas, despliegue y documentación. Los pagos y asignaciones estarán vinculados al cumplimiento de entregables verificables.

## Presupuesto

| **Componente de inversión** | **Monto** |
| --- | --- |
| Costos generales: conectividad, útiles de oficina y energía eléctrica | S/ 350.00 |
| Costos operativos durante el desarrollo | S/ 0.00 |
| Costos del ambiente: configuración cloud y pipelines | S/ 350.00 |
| Costos de personal del equipo de desarrollo | S/ 10,000.00 |
| Inversión total de desarrollo (Año 0) | S/ 10,700.00 |

| **Origen del beneficio tangible** | **Tipo de impacto** | **Valor anual** |
| --- | --- | --- |
| Automatización del tracking comercial | Ahorro en planilla | S/ 2,600.00 |
| Penetración de mercado internacional | Incremento neto en ventas | S/ 15,000.00 |
| Digitalización de catálogos e información | Eliminación de impresiones | S/ 500.00 |
| Total de ingresos operativos anuales |  | S/ 18,100.00 |

| **Egreso operativo anual** | **Frecuencia** | **Costo anual** |
| --- | --- | --- |
| Servidor VPS Cloud | Anual | S/ 200.00 |
| Mantenimiento técnico preventivo y parches | Anual | S/ 1,500.00 |
| Hosting frontend y CDN global | Anual | S/ 0.00 |
| Renovación de dominios corporativos | Anual | S/ 110.00 |
| Total de egresos operativos anuales |  | S/ 1,810.00 |

## Análisis de Factibilidad

Factibilidad técnica: El proyecto es viable porque utiliza tecnologías de libre distribución y ampliamente documentadas, como Next.js, React, Node.js y PostgreSQL. La infraestructura cloud elimina la necesidad de servidores locales y facilita el despliegue escalable.

Factibilidad económica: La inversión total asciende a S/ 10,700.00, concentrada en personal y configuración técnica. Los beneficios tangibles anuales estimados alcanzan S/ 18,100.00, frente a egresos operativos anuales de S/ 1,810.00.

Factibilidad operativa: El panel administrativo reemplaza la edición manual de archivos y permite que el personal de NODIEX gestione catálogo, certificaciones y despachos sin conocimientos avanzados de programación.

Factibilidad legal: El sistema se alinea con la Ley N.° 29733 de Protección de Datos Personales, aplicando controles de acceso, cifrado de credenciales y manejo responsable de información comercial.

Factibilidad social y ambiental: La solución mejora la confianza del comprador internacional, profesionaliza la comunicación de una empresa agroexportadora regional y reduce el uso de papel mediante catálogos y documentación digital.

## Evaluación Financiera

La evaluación financiera considera una inversión inicial de S/ 10,700.00, ingresos operativos anuales de S/ 18,100.00, egresos anuales de S/ 1,810.00 y un flujo neto anual de S/ 16,290.00. Se usa un Costo de Oportunidad del Capital (COK) de 9%.

| **Estructura financiera** | **Periodo 0** | **Año 1** | **Año 2** | **Año 3** |
| --- | --- | --- | --- | --- |
| Ingresos totales | S/ 0.00 | S/ 18,100.00 | S/ 18,100.00 | S/ 18,100.00 |
| Egresos totales | (S/ 10,700.00) | (S/ 1,810.00) | (S/ 1,810.00) | (S/ 1,810.00) |
| Flujo neto de efectivo | (S/ 10,700.00) | S/ 16,290.00 | S/ 16,290.00 | S/ 16,290.00 |
| Flujo actualizado | (S/ 10,700.00) | S/ 14,944.44 | S/ 13,711.30 | S/ 12,579.14 |

* Valor Actual Neto (VAN): S/ 30,534.88. Al ser positivo, el proyecto genera valor económico para la empresa.
* Tasa Interna de Retorno (TIR): 139.14%. Supera ampliamente el COK de 9%, por lo que la inversión es financieramente atractiva.
* Relación Beneficio/Costo (B/C): 3.85. Por cada sol invertido, NODIEX recupera la inversión y obtiene un beneficio adicional estimado de S/ 2.85.

Con estos indicadores, el proyecto se acepta y se recomienda su implementación, debido a que mejora la eficiencia operativa, fortalece la competitividad internacional y presenta un retorno financiero favorable.