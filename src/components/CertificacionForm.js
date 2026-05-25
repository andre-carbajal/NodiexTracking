"use client";

import { Award, Plus } from "lucide-react";
import { validateCertificateFields } from "@/lib/validators";

export default function CertificacionForm({ certificate, setCertificate, onPost, errors }) {
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
      <button className="button primary" onClick={() => onPost({ type: "certificate" })}><Plus size={18} />Registrar certificacion</button>
    </div>
  );
}
