export function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidTrackingCode(code) {
  return /^NDX-[A-Z0-9]{4}-20\d{2}$/.test(String(code).trim().toUpperCase());
}

export function isValidCurrency(currency) {
  return ["PEN", "USD", "EUR"].includes(currency);
}

export function isValidUnit(unit) {
  return ["TM", "Contenedor 20'", "Contenedor 40'"].includes(unit);
}

export function isValidPrice(price) {
  const num = Number(price);
  return num > 0 && Number.isFinite(num);
}

export function isValidCertType(type) {
  return ["SENASA", "BRC", "ISO", "BASC"].includes(type);
}

export function validateShipmentFields(body) {
  const errors = {};
  if (!sanitize(body.client)) errors.client = "Cliente es obligatorio";
  if (!sanitize(body.destination)) errors.destination = "Destino es obligatorio";
  if (!sanitize(body.product)) errors.product = "Producto es obligatorio";
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateProductFields(body) {
  const errors = {};
  if (!sanitize(body.name)) errors.name = "Nombre es obligatorio";
  if (!sanitize(body.description)) errors.description = "Descripcion es obligatoria";
  if (!isValidUnit(body.unit)) errors.unit = "Unidad no valida (TM, Contenedor 20', Contenedor 40')";
  if (!isValidCurrency(body.currency)) errors.currency = "Moneda no valida (PEN, USD, EUR)";
  if (!isValidPrice(body.price)) errors.price = "Precio debe ser > 0";
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateCertificateFields(body) {
  const errors = {};
  if (!isValidCertType(body.certType)) errors.certType = "Tipo de certificacion no valido";
  if (!body.validUntil) errors.validUntil = "Fecha de vencimiento es obligatoria";
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateContactFields(body) {
  const errors = {};
  if (!sanitize(body.name)) errors.name = "Nombre es obligatorio";
  if (!isValidEmail(body.email)) errors.email = "Correo no valido";
  if (!sanitize(body.message)) errors.message = "Mensaje es obligatorio";
  return { valid: Object.keys(errors).length === 0, errors };
}
