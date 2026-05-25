"use client";

import { LockKeyhole, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <strong>NODIEX</strong>
          <span>DEL PERU</span>
          <small>Agroexportacion con calidad y confianza</small>
        </div>
        <div>
          <h3>Contacto</h3>
          <p><MapPin size={16} />Parque Industrial, Tacna - Peru</p>
          <p><Mail size={16} />comercial@nodiex.com.pe</p>
          <p><Phone size={16} />+51 952 341 231</p>
        </div>
        <div>
          <h3>Acceso seguro</h3>
          <p>Ingreso exclusivo para usuarios autorizados.</p>
          <Link className="admin-access" href="/admin"><LockKeyhole size={16} />Ingresar al Administrador</Link>
        </div>
      </div>
    </footer>
  );
}
