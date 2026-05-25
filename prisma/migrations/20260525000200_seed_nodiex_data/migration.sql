INSERT INTO "roles" ("id", "nombre_rol", "descripcion") VALUES
  ('role-superadmin', 'superadmin', 'Usuario superadministrador designado por gerencia.'),
  ('role-operativo', 'operativo', 'Administrador operativo para despachos y tracking.'),
  ('role-comercial', 'comercial', 'Administrador comercial para catalogo, precios, certificaciones y traducciones.'),
  ('role-gerencia', 'gerencia', 'Gerencia general con supervision y auditoria.'),
  ('role-cliente-b2b-publico', 'cliente_b2b_publico', 'Cliente B2B internacional con acceso publico sin autenticacion.');

INSERT INTO "permisos" ("id", "rol_id", "recurso", "accion") VALUES
  ('perm-superadmin-shipments-write', 'role-superadmin', 'shipments', 'write'),
  ('perm-superadmin-catalog-write', 'role-superadmin', 'catalog', 'write'),
  ('perm-superadmin-certificates-write', 'role-superadmin', 'certificates', 'write'),
  ('perm-superadmin-content-write', 'role-superadmin', 'content', 'write'),
  ('perm-superadmin-audit-read', 'role-superadmin', 'audit', 'read'),
  ('perm-superadmin-roles-manage', 'role-superadmin', 'roles', 'manage'),
  ('perm-operativo-shipments-write', 'role-operativo', 'shipments', 'write'),
  ('perm-operativo-audit-read', 'role-operativo', 'audit', 'read'),
  ('perm-comercial-catalog-write', 'role-comercial', 'catalog', 'write'),
  ('perm-comercial-certificates-write', 'role-comercial', 'certificates', 'write'),
  ('perm-comercial-content-write', 'role-comercial', 'content', 'write'),
  ('perm-gerencia-audit-read', 'role-gerencia', 'audit', 'read'),
  ('perm-cliente-b2b-publico-tracking-read', 'role-cliente-b2b-publico', 'tracking', 'read'),
  ('perm-cliente-b2b-publico-catalog-read', 'role-cliente-b2b-publico', 'catalog', 'read'),
  ('perm-cliente-b2b-publico-certificates-read', 'role-cliente-b2b-publico', 'certificates', 'read');

INSERT INTO "usuarios" ("id", "username", "hash_password") VALUES
  ('u-admin', 'admin', '$2a$10$PkORVndm2Ym3yNdgCMXMB.f5SCsprBGMkMJKoLG7nlCkncN1YkwGq'),
  ('u-operativo', 'operativo', '$2a$10$PkORVndm2Ym3yNdgCMXMB.f5SCsprBGMkMJKoLG7nlCkncN1YkwGq'),
  ('u-comercial', 'comercial', '$2a$10$PkORVndm2Ym3yNdgCMXMB.f5SCsprBGMkMJKoLG7nlCkncN1YkwGq'),
  ('u-gerencia', 'gerencia', '$2a$10$PkORVndm2Ym3yNdgCMXMB.f5SCsprBGMkMJKoLG7nlCkncN1YkwGq');

INSERT INTO "usuarios_roles" ("usuario_id", "rol_id") VALUES
  ('u-admin', 'role-superadmin'),
  ('u-operativo', 'role-operativo'),
  ('u-comercial', 'role-comercial'),
  ('u-gerencia', 'role-gerencia');

INSERT INTO "productos" ("id", "activo", "estado_publicacion", "created_at", "updated_at") VALUES
  ('prod-olive', true, 'publicado', '2026-05-01T00:00:00.000Z', '2026-05-01T00:00:00.000Z'),
  ('prod-oregano', true, 'publicado', '2026-05-01T00:00:00.000Z', '2026-05-01T00:00:00.000Z');

INSERT INTO "traducciones" ("id", "producto_id", "idioma", "titulo", "cuerpo", "estado") VALUES
  ('tr-prod-olive-es', 'prod-olive', 'es', 'Aceituna de mesa', 'Producto seleccionado para exportación, calibrado y preparado para compradores internacionales.', 'publicado'),
  ('tr-prod-olive-en', 'prod-olive', 'en', 'Table olives', 'Selected export-ready product, graded and prepared for international buyers.', 'publicado'),
  ('tr-prod-olive-pt', 'prod-olive', 'pt', 'Azeitona de mesa', 'Produto selecionado para exportação, calibrado e preparado para compradores internacionais.', 'publicado'),
  ('tr-prod-oregano-es', 'prod-oregano', 'es', 'Orégano seco', 'Lote agroexportable con control de calidad y documentación comercial disponible.', 'publicado'),
  ('tr-prod-oregano-en', 'prod-oregano', 'en', 'Dried oregano', 'Exportable agricultural lot with quality control and commercial documentation available.', 'publicado');

INSERT INTO "presentaciones_logisticas" ("id", "producto_id", "tipo_unidad") VALUES
  ('pres-prod-olive-1', 'prod-olive', 'TM'),
  ('pres-prod-olive-2', 'prod-olive', 'Contenedor 20'''),
  ('pres-prod-oregano-1', 'prod-oregano', 'TM'),
  ('pres-prod-oregano-2', 'prod-oregano', 'Contenedor 40''');

INSERT INTO "precios" ("id", "presentacion_id", "moneda", "monto") VALUES
  ('price-prod-olive-1-PEN', 'pres-prod-olive-1', 'PEN', 4200),
  ('price-prod-olive-1-USD', 'pres-prod-olive-1', 'USD', 1125),
  ('price-prod-olive-1-EUR', 'pres-prod-olive-1', 'EUR', 1035),
  ('price-prod-olive-2-USD', 'pres-prod-olive-2', 'USD', 21400),
  ('price-prod-olive-2-EUR', 'pres-prod-olive-2', 'EUR', 19600),
  ('price-prod-oregano-1-PEN', 'pres-prod-oregano-1', 'PEN', 8800),
  ('price-prod-oregano-1-USD', 'pres-prod-oregano-1', 'USD', 2350),
  ('price-prod-oregano-1-EUR', 'pres-prod-oregano-1', 'EUR', 2160),
  ('price-prod-oregano-2-USD', 'pres-prod-oregano-2', 'USD', 46800);

INSERT INTO "certificaciones" ("id", "tipo", "fecha_vencimiento", "evidencia", "estado_vigencia", "publicado") VALUES
  ('cert-senasa', 'SENASA', '2026-12-31T00:00:00.000Z', 'Certificado fitosanitario vigente', 'vigente', true),
  ('cert-brc', 'BRC', '2026-10-15T00:00:00.000Z', 'Evidencia de inocuidad alimentaria', 'vigente', true),
  ('cert-iso', 'ISO', '2027-02-20T00:00:00.000Z', 'Sistema de gestion de calidad', 'vigente', true),
  ('cert-basc-old', 'BASC', '2024-09-01T00:00:00.000Z', 'Registro historico conservado', 'vencida', false);

INSERT INTO "despachos" ("id", "codigo_tracking", "cliente", "destino", "producto", "estado_actual", "fecha_registro", "fecha_actualizacion", "activo") VALUES
  ('ship-001', 'NDX-8Q4M-2026', 'Andes Import LLC', 'Miami, Estados Unidos', 'Aceituna de mesa', 'en tránsito', '2026-05-01T09:15:00.000Z', '2026-05-23T15:20:00.000Z', true),
  ('ship-002', 'NDX-P7K2-2026', 'Lusitana Foods', 'Lisboa, Portugal', 'Orégano seco', 'entregado/cerrado', '2026-04-20T11:40:00.000Z', '2026-05-18T18:05:00.000Z', true);

INSERT INTO "estados_despacho" ("id", "despacho_id", "estado", "fecha_hora", "responsable", "observacion") VALUES
  ('state-ship-001-1', 'ship-001', 'registrado', '2026-05-01T09:15:00.000Z', 'Admin Operativo', 'Despacho registrado en NODIEX.'),
  ('state-ship-001-2', 'ship-001', 'en tránsito', '2026-05-23T15:20:00.000Z', 'Admin Operativo', 'Contenedor en ruta internacional.'),
  ('state-ship-002-1', 'ship-002', 'registrado', '2026-04-20T11:40:00.000Z', 'Admin Operativo', 'Codigo generado.'),
  ('state-ship-002-2', 'ship-002', 'en tránsito', '2026-04-30T08:00:00.000Z', 'Admin Operativo', 'Salida confirmada.'),
  ('state-ship-002-3', 'ship-002', 'entregado/cerrado', '2026-05-18T18:05:00.000Z', 'Admin Operativo', 'Entrega cerrada.');

INSERT INTO "bitacora_eventos" ("id", "usuario_nombre", "accion", "entidad", "detalle") VALUES
  ('audit-seed', 'sistema', 'seed', 'sistema', '{"detail":"Datos iniciales cargados desde migracion Prisma."}'::jsonb);
