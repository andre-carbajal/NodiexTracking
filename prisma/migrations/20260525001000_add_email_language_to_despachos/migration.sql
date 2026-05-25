ALTER TABLE "despachos" ADD COLUMN IF NOT EXISTS "email_cliente" TEXT;
ALTER TABLE "despachos" ADD COLUMN IF NOT EXISTS "idioma_preferido" TEXT NOT NULL DEFAULT 'es';
