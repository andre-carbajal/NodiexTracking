import { NextResponse } from "next/server";
import { getVisibleProducts } from "@/lib/store";

export async function GET(request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "es";
  const search = url.searchParams.get("search") || "";

  return NextResponse.json({
    products: await getVisibleProducts(lang, { search })
  });
}
