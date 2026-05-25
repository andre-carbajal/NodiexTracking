"use client";

import ErrorBoundary from "@/components/ErrorBoundary";

export default function Error({ error, reset }) {
  return (
    <ErrorBoundary>
      <div className="error-boundary">
        <h2>Error al cargar la pagina</h2>
        <p>{error?.message || "Ocurrio un error inesperado."}</p>
        <button className="button primary" onClick={reset}>Reintentar</button>
      </div>
    </ErrorBoundary>
  );
}
