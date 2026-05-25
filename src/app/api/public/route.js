import { NextResponse } from "next/server";
import { getVisibleCertificates, getVisibleProducts } from "@/lib/store";

export async function GET(request) {
  const lang = new URL(request.url).searchParams.get("lang") || "es";
  return NextResponse.json({
    products: getVisibleProducts(lang),
    certificates: getVisibleCertificates()
  });
}
