import { NextResponse } from "next/server";
import { getVisibleCertificates, getVisibleProducts, getVisibleContent } from "@/lib/store";

export async function GET(request) {
  const lang = new URL(request.url).searchParams.get("lang") || "es";
  return NextResponse.json({
    products: await getVisibleProducts(lang),
    certificates: await getVisibleCertificates(),
    content: await getVisibleContent(lang)
  });
}
