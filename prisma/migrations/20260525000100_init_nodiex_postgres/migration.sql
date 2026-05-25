CREATE TABLE "usuarios" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "hash_password" TEXT NOT NULL,
  "estado" TEXT NOT NULL DEFAULT 'activo',
  "failed_attempts" INTEGER NOT NULL DEFAULT 0,
  "locked_until" TIMESTAMP(3),
  "ultimo_acceso" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "roles" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "nombre_rol" TEXT NOT NULL UNIQUE,
  "descripcion" TEXT
);

CREATE TABLE "usuarios_roles" (
  "usuario_id" TEXT NOT NULL,
  "rol_id" TEXT NOT NULL,
  PRIMARY KEY ("usuario_id", "rol_id"),
  CONSTRAINT "usuarios_roles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "usuarios_roles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "permisos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "recurso" TEXT NOT NULL,
  "accion" TEXT NOT NULL,
  "rol_id" TEXT NOT NULL,
  CONSTRAINT "permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "permisos_rol_id_recurso_accion_key" ON "permisos"("rol_id", "recurso", "accion");

CREATE TABLE "sesiones" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "token_jwt" TEXT NOT NULL,
  "fecha_expiracion" TIMESTAMP(3) NOT NULL,
  "ip_origen" TEXT,
  "usuario_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sesiones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "despachos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "codigo_tracking" TEXT NOT NULL UNIQUE,
  "cliente" TEXT NOT NULL,
  "destino" TEXT NOT NULL,
  "producto" TEXT NOT NULL,
  "estado_actual" TEXT NOT NULL,
  "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "activo" BOOLEAN NOT NULL DEFAULT true,
  "usuario_id" TEXT,
  CONSTRAINT "despachos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "estados_despacho" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "estado" TEXT NOT NULL,
  "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "observacion" TEXT,
  "responsable" TEXT NOT NULL,
  "despacho_id" TEXT NOT NULL,
  CONSTRAINT "estados_despacho_despacho_id_fkey" FOREIGN KEY ("despacho_id") REFERENCES "despachos"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "productos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "activo" BOOLEAN NOT NULL DEFAULT true,
  "estado_publicacion" TEXT NOT NULL DEFAULT 'borrador',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "presentaciones_logisticas" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "tipo_unidad" TEXT NOT NULL,
  "capacidad" TEXT,
  "producto_id" TEXT NOT NULL,
  CONSTRAINT "presentaciones_logisticas_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "precios" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "moneda" TEXT NOT NULL,
  "monto" DECIMAL(12,2) NOT NULL,
  "vigencia" TIMESTAMP(3),
  "presentacion_id" TEXT NOT NULL,
  CONSTRAINT "precios_presentacion_id_fkey" FOREIGN KEY ("presentacion_id") REFERENCES "presentaciones_logisticas"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "precios_presentacion_id_moneda_key" ON "precios"("presentacion_id", "moneda");

CREATE TABLE "certificaciones" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "tipo" TEXT NOT NULL,
  "fecha_emision" TIMESTAMP(3),
  "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
  "url_evidencia" TEXT,
  "evidencia" TEXT,
  "estado_vigencia" TEXT NOT NULL,
  "publicado" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "contenidos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "seccion" TEXT NOT NULL,
  "estado_publicacion" TEXT NOT NULL DEFAULT 'borrador',
  "fecha_actualizacion" TIMESTAMP(3) NOT NULL
);

CREATE TABLE "traducciones" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "idioma" TEXT NOT NULL,
  "titulo" TEXT,
  "cuerpo" TEXT,
  "estado" TEXT NOT NULL DEFAULT 'borrador',
  "contenido_id" TEXT,
  "producto_id" TEXT,
  CONSTRAINT "traducciones_contenido_id_fkey" FOREIGN KEY ("contenido_id") REFERENCES "contenidos"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "traducciones_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "traducciones_producto_id_idioma_key" ON "traducciones"("producto_id", "idioma");
CREATE UNIQUE INDEX "traducciones_contenido_id_idioma_key" ON "traducciones"("contenido_id", "idioma");

CREATE TABLE "bitacora_eventos" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "entidad" TEXT NOT NULL,
  "accion" TEXT NOT NULL,
  "fecha_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "usuario_id" TEXT,
  "usuario_nombre" TEXT,
  "detalle" JSONB NOT NULL,
  CONSTRAINT "bitacora_eventos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "bitacora_eventos_entidad_accion_fecha_hora_idx" ON "bitacora_eventos"("entidad", "accion", "fecha_hora");
