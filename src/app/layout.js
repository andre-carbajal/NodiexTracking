import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "NODIEX | Trazabilidad logística",
  description: "Sistema web multiidioma para catálogo exportador, certificaciones y tracking logístico de NODIEX DEL PERU S.A.C."
};

import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          .cursive-green { font-family: ${caveat.style.fontFamily}, cursive !important; }
        `}} />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
