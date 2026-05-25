import "./globals.css";

export const metadata = {
  title: "NODIEX | Trazabilidad logística",
  description: "Sistema web multiidioma para catálogo exportador, certificaciones y tracking logístico de NODIEX DEL PERU S.A.C."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
