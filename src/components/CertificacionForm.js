"use client";

import { Plus, ImageUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CertificacionForm({ certificate, setCertificate, onPost, onEdit, editingId, onCancel, errors, token }) {
  const [uploadState, setUploadState] = useState("");

  async function uploadImage(file) {
    if (!file) return;
    setUploadState("Subiendo...");

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setUploadState(json.message || "No se pudo subir");
      return;
    }
    setCertificate({ ...certificate, imageUrl: json.url });
    setUploadState("Cargada");
  }

  return (
    <div className="form-grid">
      <div>
        <select value={certificate.certType} onChange={(e) => setCertificate({ ...certificate, certType: e.target.value })} className={errors?.certType ? "input-error" : ""}>
          <option>SENASA</option>
          <option>BRC</option>
          <option>ISO</option>
          <option>BASC</option>
        </select>
        {errors?.certType && <span className="field-error">{errors.certType}</span>}
      </div>
      <div>
        <input type="date" value={certificate.validUntil} onChange={(e) => setCertificate({ ...certificate, validUntil: e.target.value })} className={errors?.validUntil ? "input-error" : ""} />
        {errors?.validUntil && <span className="field-error">{errors.validUntil}</span>}
      </div>
      <div>
        <input placeholder="Evidencia documental" value={certificate.evidence} onChange={(e) => setCertificate({ ...certificate, evidence: e.target.value })} className={errors?.evidence ? "input-error" : ""} />
        {errors?.evidence && <span className="field-error">{errors.evidence}</span>}
      </div>
      <label className="check-row">
        <input
          type="checkbox"
          checked={certificate.publish}
          onChange={(e) => setCertificate({ ...certificate, publish: e.target.checked })}
        />
        Publicada
      </label>
      <div className="product-media-row" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <label className="file-field">
          Imagen o respaldo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files?.[0])}
          />
        </label>
        {uploadState && <span className="upload-status" style={{ fontSize: "0.85rem", color: "#666" }}><ImageUp size={14} /> {uploadState}</span>}
      </div>
      {certificate.imageUrl && (
        <div className="image-preview">
          <Image unoptimized src={certificate.imageUrl} alt="Vista previa certificacion" width={84} height={64} />
          <button type="button" className="ghost-button small danger" onClick={() => setCertificate({ ...certificate, imageUrl: "" })}>
            Quitar
          </button>
        </div>
      )}
      {editingId ? (
        <div className="inline-actions">
          <button className="button primary" onClick={() => onEdit({ type: "certificateEdit", id: editingId })}>
            Guardar cambios
          </button>
          <button className="button secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="button primary" onClick={() => onPost({ type: "certificate" })}><Plus size={18} />Registrar certificacion</button>
      )}
    </div>
  );
}
