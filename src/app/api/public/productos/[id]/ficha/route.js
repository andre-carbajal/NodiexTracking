import { NextResponse } from "next/server";
import { getPublicProduct } from "@/lib/store";

function ascii(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdf(value) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function makePdf(product) {
  const lines = [
    "NODIEX DEL PERU S.A.C.",
    `Ficha tecnica - ${product.name}`,
    "",
    product.description,
    "",
    "Presentaciones y precios:"
  ];

  product.presentations.forEach((presentation) => {
    const prices = Object.entries(presentation.prices)
      .map(([currency, amount]) => `${currency} ${Number(amount).toFixed(2)}`)
      .join(" / ");
    lines.push(`- ${presentation.unit}: ${prices}`);
  });

  lines.push("", "Documento generado desde el catalogo publico Nodiex.");

  const text = lines.map((line, index) => {
    const fontSize = index === 0 ? 18 : index === 1 ? 15 : 11;
    const y = 770 - (index * 22);
    return `BT /F1 ${fontSize} Tf 54 ${y} Td (${escapePdf(line)}) Tj ET`;
  }).join("\n");

  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj\n",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
    `5 0 obj << /Length ${Buffer.byteLength(text, "latin1")} >> stream\n${text}\nendstream endobj\n`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += object;
  });
  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const { id } = await params;
  const product = await getPublicProduct(id, url.searchParams.get("lang") || "es");

  if (!product) {
    return NextResponse.json({ ok: false, message: "Producto no encontrado" }, { status: 404 });
  }

  const pdf = makePdf(product);
  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="ficha-${product.id}.pdf"`
    }
  });
}
