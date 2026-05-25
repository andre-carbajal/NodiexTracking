"use client";

import {
  Activity, Award, Boxes, FileClock, Ship, ShieldCheck, Users
} from "lucide-react";
import { useMemo, useState } from "react";
import Toast from "@/components/Toast";
import AdminSidebar from "@/components/AdminSidebar";
import DespachosList from "@/components/DespachosList";
import DespachoForm from "@/components/DespachoForm";
import ProductosList from "@/components/ProductosList";
import ProductoForm from "@/components/ProductoForm";
import CertificacionesList from "@/components/CertificacionesList";
import CertificacionForm from "@/components/CertificacionForm";
import BitacoraView from "@/components/BitacoraView";
import UsuariosList from "@/components/UsuariosList";
import UsuarioForm from "@/components/UsuarioForm";
import { validateShipmentFields, validateProductFields, validateCertificateFields } from "@/lib/validators";

export default function AdminDashboard({ user, data, token, onLogout, load }) {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(null);
  const [shipment, setShipment] = useState({ client: "", destination: "", product: "" });
  const [product, setProduct] = useState({ name: "", description: "", unit: "TM", currency: "USD", price: "", publish: true });
  const [certificate, setCertificate] = useState({ certType: "SENASA", validUntil: "2026-12-31", evidence: "" });
  const [usuario, setUsuario] = useState({ username: "", password: "", role: "" });
  const [shipmentErrors, setShipmentErrors] = useState(null);
  const [productErrors, setProductErrors] = useState(null);
  const [certErrors, setCertErrors] = useState(null);

  const stats = useMemo(() => [
    { label: "Despachos", value: data.shipments.length, icon: Ship },
    { label: "Productos", value: data.products.length, icon: Boxes },
    { label: "Certificaciones", value: data.certificates.length, icon: Award },
    { label: "Eventos auditoria", value: data.audit.length, icon: Activity }
  ], [data]);

  async function post(body) {
    if (body.type === "shipment") {
      const { valid, errors } = validateShipmentFields({ client: shipment.client, destination: shipment.destination, product: shipment.product });
      if (!valid) { setShipmentErrors(errors); return; }
      setShipmentErrors(null);
    }
    if (body.type === "product") {
      const { valid, errors } = validateProductFields(product);
      if (!valid) { setProductErrors(errors); return; }
      setProductErrors(null);
    }
    if (body.type === "certificate") {
      const { valid, errors } = validateCertificateFields(certificate);
      if (!valid) { setCertErrors(errors); return; }
      setCertErrors(null);
    }

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...body,
        ...(body.type === "shipment" ? { client: shipment.client, destination: shipment.destination, product: shipment.product } : {}),
        ...(body.type === "product" ? product : {}),
        ...(body.type === "certificate" ? certificate : {}),
        ...(body.type === "user" ? usuario : {})
      })
    });
    const json = await res.json();
    setMessage(json.message || (res.ok ? "Operacion registrada en bitacora." : "Operacion rechazada."));
    setToast({ message: json.message || (res.ok ? "Operacion exitosa" : "Error"), variant: res.ok ? "success" : "error" });
    if (res.ok) {
      setShipment({ client: "", destination: "", product: "" });
    }
    await load();
  }

  return (
    <main className="admin-shell">
      <AdminSidebar user={user} onLogout={onLogout} />
      <section className="admin-content">
        <header className="admin-topbar" id="dashboard">
          <div>
            <p className="eyebrow">Rol: {user?.role}</p>
            <h1>Operacion comercial y trazabilidad</h1>
          </div>
          <span>{user?.username}</span>
        </header>
        {(message || toast) && <p className="notice">{message}</p>}
        {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} duration={3000} />}

        <div className="admin-stats">
          {stats.map((item) => {
            const Icon = item.icon;
            return <article key={item.label}><Icon /><strong>{item.value}</strong><span>{item.label}</span></article>;
          })}
        </div>

        <section className="admin-panel" id="shipments">
          <div className="panel-heading"><Ship /><h2>Gestion de despachos</h2></div>
          <DespachoForm shipment={shipment} setShipment={setShipment} onPost={post} errors={shipmentErrors} />
          <DespachosList shipments={data.shipments} onPost={post} />
        </section>

        <section className="admin-panel" id="catalog-admin">
          <div className="panel-heading"><Boxes /><h2>Catalogo y precios</h2></div>
          <ProductoForm product={product} setProduct={setProduct} onPost={post} errors={productErrors} />
          <ProductosList products={data.products} />
        </section>

        <section className="admin-panel" id="cert-admin">
          <div className="panel-heading"><Award /><h2>Certificaciones</h2></div>
          <CertificacionForm certificate={certificate} setCertificate={setCertificate} onPost={post} errors={certErrors} />
          <CertificacionesList certificates={data.certificates} />
        </section>

        {user?.canReadAudit && (
          <section className="admin-panel" id="audit">
            <div className="panel-heading"><FileClock /><h2>Bitacora gerencial</h2></div>
            <BitacoraView events={data.audit} />
          </section>
        )}

        {user?.role === "superadmin" && (
          <section className="admin-panel" id="users">
            <div className="panel-heading"><Users /><h2>Gestion de usuarios</h2></div>
            <UsuarioForm usuario={usuario} setUsuario={setUsuario} onPost={post} />
            <UsuariosList usuarios={[]} />
          </section>
        )}
      </section>
    </main>
  );
}
