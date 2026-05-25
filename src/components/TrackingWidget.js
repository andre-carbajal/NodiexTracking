"use client";

import { CheckCircle2, ClipboardCheck, PackageSearch, Search, Truck } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { isValidTrackingCode } from "@/lib/validators";
import { useState } from "react";

export default function TrackingWidget({ t, trackingCode, setTrackingCode, loading, trackingError, submitTracking }) {
  const [localError, setLocalError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");
    const code = String(trackingCode).trim();
    if (!code) {
      setLocalError("Ingrese un codigo de seguimiento.");
      return;
    }
    if (!isValidTrackingCode(code)) {
      setLocalError("Formato de codigo invalido. Ejemplo: NDX-8Q4M-2026");
      return;
    }
    submitTracking(e);
  }

  return (
    <form className="tracking-widget" id="tracking" onSubmit={handleSubmit}>
      <div className="widget-title">
        <span><PackageSearch size={23} /></span>
        <div>
          <strong>{t.trackingTitle || "Order Tracking"}</strong>
          <small>{t.trackingHelp || "Consulta publica y segura"}</small>
        </div>
      </div>
      <label>
        {t.trackingHelp || "Ingrese su codigo de seguimiento"}
        <div className="tracking-input-row">
          <input
            value={trackingCode}
            onChange={(event) => setTrackingCode(event.target.value)}
            placeholder={t.trackingPlaceholder}
            className={localError ? "input-error" : ""}
          />
          <button className="icon-button" disabled={loading} aria-label="Consultar tracking">
            {loading ? (
              <span className="spinner-small" />
            ) : (
              <Search size={22} />
            )}
          </button>
        </div>
      </label>
      <div className="mini-status">
        <span className="complete"><ClipboardCheck size={18} />Registrado</span>
        <span className="active"><Truck size={18} />En transito</span>
        <span><CheckCircle2 size={18} />Entregado</span>
      </div>
      {(localError || trackingError) && <p className="form-error">{localError || trackingError}</p>}
      {loading && <LoadingSkeleton variant="timeline" />}
    </form>
  );
}
