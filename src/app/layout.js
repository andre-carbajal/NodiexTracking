import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "NODIEX | Trazabilidad logística",
  description: "Sistema web multiidioma para catálogo exportador, certificaciones y tracking logístico de NODIEX DEL PERU S.A.C."
};

import Header from "@/components/Header";
import { I18nProvider } from "@/components/I18nProvider";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("nodiex_lang")?.value || "es";

  return (
    <html lang={lang}>
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          .cursive-green { font-family: ${caveat.style.fontFamily}, cursive !important; }
        `}} />
      </head>
      <body className={inter.className}>
        <I18nProvider initialLang={lang}>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
