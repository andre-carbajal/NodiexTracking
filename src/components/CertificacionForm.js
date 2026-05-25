"use client";

import { Plus } from "lucide-react";
import Image from "next/image";

function imageToDataUrl(file, onReady) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => onReady(String(reader.result || ""));
  reader.readAsDataURL(file);
}

export default function CertificacionForm({ certificate, setCertificate, onPost, onEdit, editingId, onCancel, errors }) {
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
      <input placeholder="Evidencia documental" value={certificate.evidence} onChange={(e) => setCertificate({ ...certificate, evidence: e.target.value })} />
      <label className="check-row">
        <input
          type="checkbox"
          checked={certificate.publish}
          onChange={(e) => setCertificate({ ...certificate, publish: e.target.checked })}
        />
        Publicada
      </label>
      <label className="file-field">
        Imagen o respaldo
        <input
          type="file"
          accept="image/*"
          onChange={(e) => imageToDataUrl(e.target.files?.[0], (imageUrl) => setCertificate({ ...certificate, imageUrl }))}
        />
      </label>
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
