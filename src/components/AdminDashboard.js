"use client";

import {
  Activity, Award, Boxes, FileClock, Ship, ShieldCheck, Users
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import Pagination from "@/components/Pagination";
import { validateShipmentFields, validateProductFields, validateCertificateFields } from "@/lib/validators";

const initialShipment = { client: "", destination: "", product: "", emailCliente: "", idiomaPreferido: "es", currentStatus: "registrado" };
const initialProduct = {
  name: "",
  description: "",
  publish: false,
  imageUrl: "",
  previewUrl: "",
  presentations: [{ unit: "TM", prices: [{ currency: "USD", amount: "" }] }]
};
const initialCertificate = { certType: "SENASA", validUntil: "2026-12-31", evidence: "", publish: true, imageUrl: "" };

function EditModal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="edit-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-heading">
          <h2>{title}</h2>
          <button type="button" className="ghost-button small" onClick={onClose}>Cerrar</button>
        </div>
        {children}
      </section>
    </div>
  );
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) {
    return {
      ok: false,
      message: response.ok ? "Operacion completada sin respuesta del servidor." : "El servidor no devolvio detalles del error."
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      ok: false,
      message: response.ok ? "Respuesta inesperada del servidor." : text
    };
  }
}

export default function AdminDashboard({ user, data, token, onLogout, load }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(null);
  const [shipment, setShipment] = useState(initialShipment);
  const [editShipment, setEditShipment] = useState(initialShipment);
  const [product, setProduct] = useState(initialProduct);
  const [editProduct, setEditProduct] = useState(initialProduct);
  const [certificate, setCertificate] = useState(initialCertificate);
  const [editCertificate, setEditCertificate] = useState(initialCertificate);
  const [usuario, setUsuario] = useState({ username: "", password: "", role: "" });
  const [shipmentErrors, setShipmentErrors] = useState(null);
  const [productErrors, setProductErrors] = useState(null);
  const [certErrors, setCertErrors] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingCertId, setEditingCertId] = useState(null);
  const [productPage, setProductPage] = useState(1);
  const [productSearch, setProductSearch] = useState("");
  const [productStatus, setProductStatus] = useState("");

  function productParams(nextPage = productPage) {
    return {
      productPage: nextPage,
      productPageSize: 8,
      productSearch,
      productStatus
    };
  }

  function resetShipmentForm() {
    setShipment(initialShipment);
    setShipmentErrors(null);
  }

  function closeShipmentModal() {
    setEditShipment(initialShipment);
    setShipmentErrors(null);
    setEditingId(null);
  }

  function resetProductForm() {
    setProduct(initialProduct);
    setProductErrors(null);
  }

  function closeProductModal() {
    setEditProduct(initialProduct);
    setProductErrors(null);
    setEditingProductId(null);
  }

  function resetCertificateForm() {
    setCertificate(initialCertificate);
    setCertErrors(null);
  }

  function closeCertificateModal() {
    setEditCertificate(initialCertificate);
    setCertErrors(null);
    setEditingCertId(null);
  }

  const stats = useMemo(() => [
    { label: "Despachos", value: data.totalShipments || data.shipments.length, icon: Ship, section: "shipments" },
    { label: "Productos", value: data.totalProducts || data.products.length, icon: Boxes, section: "catalog" },
    { label: "Certificaciones", value: data.certificates.length, icon: Award, section: "certifications" },
    { label: "Eventos auditoria", value: data.audit.length, icon: Activity, section: "audit" }
  ], [data]);

  const sections = useMemo(() => [
    {
      id: "dashboard",
      label: "Dashboard",
      title: "Dashboard operativo",
      description: "Resumen general de operaciones comerciales y trazabilidad.",
      icon: ShieldCheck
    },
    {
      id: "shipments",
      label: "Despachos",
      title: "Gestion de despachos",
      description: "Crea despachos, filtra estados y actualiza el avance logistico.",
      icon: Ship
    },
    {
      id: "catalog",
      label: "Catalogo",
      title: "Catalogo y precios",
      description: "Administra productos publicados, unidades comerciales y precios.",
      icon: Boxes
    },
    {
      id: "certifications",
      label: "Certificaciones",
      title: "Certificaciones",
      description: "Registra vigencias, evidencias y controles documentarios.",
      icon: Award
    },
    ...(user?.canReadAudit ? [{
      id: "audit",
      label: "Auditoria",
      title: "Bitacora gerencial",
      description: "Consulta operaciones recientes y exporta evidencias de auditoria.",
      icon: FileClock
    }] : []),
    ...(user?.role === "superadmin" ? [{
      id: "users",
      label: "Usuarios",
      title: "Gestion de usuarios",
      description: "Crea accesos administrativos segun los roles del equipo.",
      icon: Users
    }] : [])
  ], [user]);

  const currentSection = sections.find((section) => section.id === activeSection) || sections[0];

  useEffect(() => {
    function syncSectionFromHash() {
      const hashSection = window.location.hash.replace("#", "");
      if (hashSection && sections.some((section) => section.id === hashSection)) {
        setActiveSection(hashSection);
        return;
      }
      if (!sections.some((section) => section.id === activeSection)) {
        setActiveSection("dashboard");
      }
    }

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);
    return () => window.removeEventListener("hashchange", syncSectionFromHash);
  }, [activeSection, sections]);

  function changeSection(sectionId) {
    setActiveSection(sectionId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  }

  async function post(body) {
    const productPayload = body.productPayload || product;
    const certificatePayload = body.certificatePayload || certificate;
    const shipmentPayload = body.shipmentPayload || shipment;
    const requestBody = { ...body };
    delete requestBody.productPayload;
    delete requestBody.certificatePayload;
    delete requestBody.shipmentPayload;
    const actualBody = {
      ...requestBody,
      ...(body.type === "shipment" || body.type === "shipmentEdit" ? { client: shipmentPayload.client, destination: shipmentPayload.destination, product: shipmentPayload.product, emailCliente: shipmentPayload.emailCliente, idiomaPreferido: shipmentPayload.idiomaPreferido, currentStatus: shipmentPayload.currentStatus } : {}),
      ...(body.type === "product" || body.type === "productEdit" ? productPayload : {}),
      ...(body.type === "certificate" || body.type === "certificateEdit" ? certificatePayload : {}),
      ...(body.type === "user" ? usuario : {})
    };

    if (body.type === "shipment" || body.type === "shipmentEdit") {
      const { valid, errors } = validateShipmentFields({ client: shipmentPayload.client, destination: shipmentPayload.destination, product: shipmentPayload.product });
      if (!valid) { setShipmentErrors(errors); return; }
      setShipmentErrors(null);
    }
    if (body.type === "product" || body.type === "productEdit") {
      const { valid, errors } = validateProductFields(productPayload);
      if (!valid) { setProductErrors(errors); return; }
      setProductErrors(null);
    }
    if (body.type === "certificate" || body.type === "certificateEdit") {
      const { valid, errors } = validateCertificateFields(certificatePayload);
      if (!valid) { setCertErrors(errors); return; }
      setCertErrors(null);
    }

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(actualBody)
    });
    const json = await readJsonResponse(res);
    setMessage(json.message || (res.ok ? "Operacion registrada en bitacora." : "Operacion rechazada."));
    setToast({ message: json.message || (res.ok ? "Operacion exitosa" : "Error"), variant: res.ok ? "success" : "error" });
    if (res.ok) {
      if (body.type === "shipment") {
        resetShipmentForm();
      }
      if (body.type === "shipmentEdit") {
        closeShipmentModal();
      }
      if (body.type === "product") {
        resetProductForm();
      }
      if (body.type === "productEdit") {
        closeProductModal();
      }
      if (body.type === "certificate") {
        resetCertificateForm();
      }
      if (body.type === "certificateEdit") {
        closeCertificateModal();
      }
      if (body.type === "user") {
        setUsuario({ username: "", password: "", role: "" });
      }
    }
    await load(token, activeSection === "catalog" ? productParams() : {});
  }

  useEffect(() => {
    if (activeSection === "catalog" && token) {
      load(token, {
        productPage,
        productPageSize: 8,
        productSearch,
        productStatus
      });
    }
  }, [activeSection, load, productPage, productSearch, productStatus, token]);

  function startEdit(despacho) {
    setEditingId(despacho.id);
    changeSection("shipments");
    setEditShipment({
      client: despacho.client,
      destination: despacho.destination,
      product: despacho.product,
      emailCliente: despacho.emailCliente || "",
      idiomaPreferido: despacho.idiomaPreferido || "es",
      currentStatus: despacho.currentStatus || "registrado"
    });
  }

  function startProductEdit(item) {
    setEditingProductId(item.id);
    changeSection("catalog");
    setEditProduct({
      name: item.name || "",
      description: item.description || "",
      publish: item.published,
      imageUrl: item.imageUrl || "",
      previewUrl: item.imageUrl || "",
      presentations: item.presentations?.length
        ? item.presentations.map((presentation) => ({
          unit: presentation.unit || "TM",
          prices: Object.entries(presentation.prices || {}).map(([currency, amount]) => ({
            currency,
            amount: String(amount)
          }))
        }))
        : initialProduct.presentations
    });
  }

  function toggleProduct(item) {
    const nextProduct = {
      name: item.name || "",
      description: item.description || "",
      publish: !item.published,
      active: true,
      imageUrl: item.imageUrl || "",
      presentations: item.presentations?.map((presentation) => ({
        unit: presentation.unit || "TM",
        prices: Object.entries(presentation.prices || {}).map(([currency, amount]) => ({
          currency,
          amount: String(amount)
        }))
      })) || initialProduct.presentations
    };
    post({ type: "productEdit", id: item.id, productPayload: nextProduct });
  }

  function deleteProductItem(item) {
    if (window.confirm(`Retirar "${item.name}" del catalogo?`)) {
      post({ type: "productDelete", id: item.id });
    }
  }

  function startCertEdit(item) {
    setEditingCertId(item.id);
    changeSection("certifications");
    setEditCertificate({
      certType: item.type || "SENASA",
      validUntil: item.validUntil || "2026-12-31",
      evidence: item.evidence || "",
      publish: item.published,
      imageUrl: item.imageUrl || ""
    });
  }

  function toggleCert(item) {
    const nextCertificate = {
      certType: item.type || "SENASA",
      validUntil: item.validUntil || "2026-12-31",
      evidence: item.evidence || "Evidencia documental",
      publish: !item.published,
      imageUrl: item.imageUrl || ""
    };
    post({ type: "certificateEdit", id: item.id, certificatePayload: nextCertificate });
  }

  function deleteCertItem(item) {
    if (window.confirm(`Retirar certificacion ${item.type}?`)) {
      post({ type: "certificateDelete", id: item.id });
    }
  }

  function renderDashboard() {
    const latestAudit = data.audit.slice(0, 4);

    return (
      <>
        <div className="admin-stats">
          {stats
            .filter((item) => item.section !== "audit" || user?.canReadAudit)
            .map((item) => {
              const Icon = item.icon;
              return (
                <button className="stat-card" type="button" key={item.label} onClick={() => changeSection(item.section)}>
                  <Icon />
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </button>
              );
            })}
        </div>

        <section className="admin-panel dashboard-panel">
          <div className="panel-heading"><ShieldCheck /><h2>Vista general</h2></div>

          {latestAudit.length > 0 && (
            <div className="dashboard-feed">
              <h3>Ultima actividad</h3>
              <div className="audit-list compact">
                {latestAudit.map((event) => (
                  <article key={event.id}>
                    <strong>{event.operation}</strong>
                    <span>{event.user} - {event.entity} - {new Date(event.createdAt).toLocaleString("es-PE")}</span>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  function renderSection() {
    if (activeSection === "dashboard") return renderDashboard();

    if (activeSection === "shipments") {
      return (
        <section className="admin-panel">
          <div className="panel-heading"><Ship /><h2>Gestion de despachos</h2></div>
          <DespachoForm
            shipment={shipment}
            setShipment={setShipment}
            onPost={post}
            errors={shipmentErrors}
            productOptions={data.productOptions || []}
          />
          <DespachosList shipments={data.shipments} onPost={post} onEdit={startEdit} />
          {editingId && (
            <EditModal title="Editar despacho" onClose={closeShipmentModal}>
              <DespachoForm
                shipment={editShipment}
                setShipment={setEditShipment}
                onEdit={(body) => post({ ...body, shipmentPayload: editShipment })}
                editingId={editingId}
                onCancel={closeShipmentModal}
                errors={shipmentErrors}
                productOptions={data.productOptions || []}
              />
            </EditModal>
          )}
        </section>
      );
    }

    if (activeSection === "catalog") {
      return (
        <section className="admin-panel">
          <div className="panel-heading"><Boxes /><h2>Catalogo y precios</h2></div>
          <ProductoForm
            product={product}
            setProduct={setProduct}
            onPost={post}
            errors={productErrors}
            token={token}
          />
          <div className="admin-filters">
            <label>
              Buscar producto
              <input
                placeholder="Nombre del producto"
                value={productSearch}
                onChange={(event) => {
                  setProductSearch(event.target.value);
                  setProductPage(1);
                }}
              />
            </label>
            <label>
              Estado
              <select
                value={productStatus}
                onChange={(event) => {
                  setProductStatus(event.target.value);
                  setProductPage(1);
                }}
              >
                <option value="">Todos activos</option>
                <option value="publicado">Publicado</option>
                <option value="borrador">Borrador</option>
                <option value="retirado">Retirado</option>
              </select>
            </label>
          </div>
          <ProductosList
            products={data.products}
            onEdit={startProductEdit}
            onDelete={deleteProductItem}
            onToggle={toggleProduct}
          />
          <Pagination
            page={productPage}
            totalPages={Math.max(1, Math.ceil((data.totalProducts || data.products.length) / 8))}
            onPageChange={setProductPage}
          />
          {editingProductId && (
            <EditModal title="Editar producto" onClose={closeProductModal}>
              <ProductoForm
                product={editProduct}
                setProduct={setEditProduct}
                onEdit={(body) => post({ ...body, productPayload: editProduct })}
                editingId={editingProductId}
                onCancel={closeProductModal}
                errors={productErrors}
                token={token}
              />
            </EditModal>
          )}
        </section>
      );
    }

    if (activeSection === "certifications") {
      return (
        <section className="admin-panel">
          <div className="panel-heading"><Award /><h2>Certificaciones</h2></div>
          <CertificacionForm
            certificate={certificate}
            setCertificate={setCertificate}
            onPost={post}
            errors={certErrors}
          />
          <CertificacionesList
            certificates={data.certificates}
            onEdit={startCertEdit}
            onDelete={deleteCertItem}
            onToggle={toggleCert}
          />
          {editingCertId && (
            <EditModal title="Editar certificacion" onClose={closeCertificateModal}>
              <CertificacionForm
                certificate={editCertificate}
                setCertificate={setEditCertificate}
                onEdit={(body) => post({ ...body, certificatePayload: editCertificate })}
                editingId={editingCertId}
                onCancel={closeCertificateModal}
                errors={certErrors}
              />
            </EditModal>
          )}
        </section>
      );
    }

    if (activeSection === "audit" && user?.canReadAudit) {
      return (
        <section className="admin-panel">
          <div className="panel-heading"><FileClock /><h2>Bitacora gerencial</h2></div>
          <BitacoraView events={data.audit} />
        </section>
      );
    }

    if (activeSection === "users" && user?.role === "superadmin") {
      return (
        <section className="admin-panel">
          <div className="panel-heading"><Users /><h2>Gestion de usuarios</h2></div>
          <UsuarioForm usuario={usuario} setUsuario={setUsuario} onPost={post} />
          <UsuariosList usuarios={data.users || []} />
        </section>
      );
    }

    return renderDashboard();
  }

  return (
    <main className="admin-shell">
      <AdminSidebar
        sections={sections}
        activeSection={currentSection.id}
        onSectionChange={changeSection}
        onLogout={onLogout}
      />
      <section className="admin-content">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Rol: {user?.role}</p>
            <h1>{currentSection.title}</h1>
            <p>{currentSection.description}</p>
          </div>
          <span>{user?.username}</span>
        </header>
        {(message || toast) && <p className="notice">{message}</p>}
        {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} duration={3000} />}
        {renderSection()}
      </section>
    </main>
  );
}
