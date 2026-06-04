"use client";

import { CheckCircle2, ClipboardCheck, PackageSearch, Search, Truck } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { isValidEmail, isValidTrackingCode } from "@/lib/validators";
import { useState } from "react";

export default function TrackingWidget({
  t,
  trackingCode,
  setTrackingCode,
  trackingEmail,
  setTrackingEmail,
  trackingStep,
  loading,
  trackingError,
  submitTracking
}) {
  const [localError, setLocalError] = useState("");
  const isEmailStep = trackingStep === "email";

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
    if (isEmailStep && !isValidEmail(String(trackingEmail || "").trim())) {
      setLocalError("Ingrese el correo registrado para este pedido.");
      return;
    }
    submitTracking({ step: isEmailStep ? "email" : "code" });
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
        {isEmailStep ? "Ingrese el correo registrado para verificar el pedido" : (t.trackingHelp || "Ingrese su codigo de seguimiento")}
        <div className="tracking-input-row">
          <input
            value={isEmailStep ? trackingEmail : trackingCode}
            onChange={(event) => (isEmailStep ? setTrackingEmail(event.target.value) : setTrackingCode(event.target.value))}
            placeholder={isEmailStep ? "correo@empresa.com" : t.trackingPlaceholder}
            type={isEmailStep ? "email" : "text"}
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
      {isEmailStep && (
        <p className="tracking-step-note">
          Codigo validado: {String(trackingCode || "").trim().toUpperCase()}
        </p>
      )}
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
