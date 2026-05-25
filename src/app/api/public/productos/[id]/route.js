import { NextResponse } from "next/server";
import { getPublicProduct } from "@/lib/store";

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const { id } = await params;
  const product = await getPublicProduct(id, url.searchParams.get("lang") || "es");

  if (!product) {
    return NextResponse.json({ ok: false, message: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, product });
}
