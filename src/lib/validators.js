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
  const raw = String(price ?? "").trim();
  const num = Number(raw);
  return /^\d+(\.\d{1,2})?$/.test(raw) && num > 0 && Number.isFinite(num);
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
  const presentations = Array.isArray(body.presentations) ? body.presentations : [];
  const hasValidPrice = presentations.some((presentation) => (
    isValidUnit(presentation.unit)
    && Array.isArray(presentation.prices)
    && presentation.prices.some((price) => isValidCurrency(price.currency) && isValidPrice(price.amount))
  ));

  presentations.forEach((presentation, presentationIndex) => {
    if (!isValidUnit(presentation.unit)) errors[`presentation-${presentationIndex}`] = "Unidad no valida";
    const prices = Array.isArray(presentation.prices) ? presentation.prices : [];
    const currencies = new Set();
    prices.forEach((price, priceIndex) => {
      if (!isValidCurrency(price.currency)) errors[`price-currency-${presentationIndex}-${priceIndex}`] = "Moneda no valida";
      if (currencies.has(price.currency)) errors[`price-currency-${presentationIndex}-${priceIndex}`] = "Moneda duplicada en la presentacion";
      currencies.add(price.currency);
      if (price.amount !== "" && !isValidPrice(price.amount)) errors[`price-amount-${presentationIndex}-${priceIndex}`] = "Monto > 0 con maximo 2 decimales";
    });
  });

  if (body.publish && !hasValidPrice) {
    errors.presentations = "Para publicar agrega al menos una presentacion con precio valido";
  }
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
