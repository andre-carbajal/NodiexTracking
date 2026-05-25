"use client";

import { AlertTriangle, CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle
};

const variants = {
  success: "toast-success",
  error: "toast-error",
  warning: "toast-warning"
};

export default function Toast({ message, variant = "success", duration = 5000, onClose }) {
  const [visible, setVisible] = useState(true);
  const Icon = icons[variant] || CheckCircle2;

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div className={`toast ${variants[variant] || "toast-success"}`} role="alert">
      <Icon size={20} />
      <span>{message}</span>
      <button
        className="toast-close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        aria-label="Cerrar notificacion"
      >
        <X size={16} />
      </button>
    </div>
  );
}
