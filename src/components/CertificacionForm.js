"use client";

import { FileImage, ImageUp, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function readFileAsDataUrl(file, onReady) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => onReady(String(reader.result || ""));
  reader.readAsDataURL(file);
}

async function pdfFirstPageToImage(file) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.7 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("No se pudo generar la imagen del PDF"));
        return;
      }
      resolve(new File([blob], `${file.name.replace(/\.pdf$/i, "")}-pagina-1.png`, { type: "image/png" }));
    }, "image/png", 0.92);
  });
}

export default function CertificacionForm({ certificate, setCertificate, onPost, onEdit, editingId, onCancel, errors, token }) {
  const [uploadState, setUploadState] = useState({ message: "", variant: "success" });
  const [uploadBusy, setUploadBusy] = useState(false);
  const uploadBlocked = Boolean(uploadBusy || certificate.fileError || certificate.filePending);
  const uploadMessage = certificate.fileError || errors?.file || uploadState.message;

  function updateCertificateFileState(nextState) {
    setCertificate((current) => ({
      ...current,
      ...nextState
    }));
  }

  function rejectFile(message) {
    setUploadBusy(false);
    setUploadState({ message, variant: "error" });
    updateCertificateFileState({
      fileError: message,
      filePending: false,
      imageUrl: "",
      previewUrl: ""
    });
  }

  async function uploadEvidence(file) {
    if (!file) return;

    setUploadBusy(true);
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage = String(file.type || "").startsWith("image/");
    if (!isPdf && !isImage) {
      rejectFile("Solo se permiten imagenes o PDFs");
      return;
    }

    if (isImage && file.size > MAX_IMAGE_BYTES) {
      rejectFile("La imagen supera 4MB");
      return;
    }

    try {
      setUploadState({ message: isPdf ? "Procesando primera pagina del PDF..." : "Preparando imagen...", variant: "success" });
      updateCertificateFileState({ fileError: "", filePending: true, imageUrl: "", previewUrl: "" });
      const uploadFile = isPdf ? await pdfFirstPageToImage(file) : file;
      if (uploadFile.size > MAX_IMAGE_BYTES) {
        rejectFile(isPdf ? "La primera pagina del PDF supera 4MB" : "La imagen supera 4MB");
        return;
      }

      readFileAsDataUrl(uploadFile, (previewUrl) => {
        setCertificate((current) => ({
          ...current,
          previewUrl,
          evidence: current.evidence || file.name,
          fileError: "",
          filePending: true,
          imageUrl: ""
        }));
      });

      setUploadState({ message: "Subiendo respaldo...", variant: "success" });
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("purpose", "certificate");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        rejectFile(json.message || "No se pudo subir el respaldo");
        return;
      }
      setCertificate((current) => ({
        ...current,
        evidence: current.evidence || file.name,
        imageUrl: json.url,
        previewUrl: json.url,
        fileError: "",
        filePending: false
      }));
      setUploadBusy(false);
      setUploadState({ message: isPdf ? "PDF convertido y cargado" : "Imagen cargada", variant: "success" });
    } catch (error) {
      rejectFile(error.message || "No se pudo procesar el archivo");
    }
  }

  function submitEdit() {
    if (uploadBlocked) return;
    onEdit({ type: "certificateEdit", id: editingId });
  }

  function submitCreate() {
    if (uploadBlocked) return;
    onPost({ type: "certificate" });
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
        <input
          placeholder="Evidencia documental"
          value={certificate.evidence}
          onChange={(e) => setCertificate({ ...certificate, evidence: e.target.value })}
          className={errors?.evidence ? "input-error" : ""}
        />
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
      <label className="file-field">
        Imagen o PDF
        <input
          type="file"
          accept="image/*,application/pdf"
          disabled={uploadBusy}
          onChange={(e) => uploadEvidence(e.target.files?.[0])}
        />
      </label>
      {(certificate.previewUrl || certificate.imageUrl) && (
        <div className="image-preview">
          <Image unoptimized src={certificate.previewUrl || certificate.imageUrl} alt="Vista previa certificacion" width={84} height={64} />
          <button type="button" className="ghost-button small danger" onClick={() => {
            setCertificate((current) => ({ ...current, imageUrl: "", previewUrl: "", fileError: "", filePending: false }));
            setUploadBusy(false);
            setUploadState({ message: "", variant: "success" });
          }}>
            Quitar
          </button>
        </div>
      )}
      {uploadMessage && <span className={`upload-status ${uploadState.variant === "error" || certificate.fileError || errors?.file ? "error" : ""}`}><ImageUp size={16} />{uploadMessage}</span>}
      <span className="upload-status neutral"><FileImage size={16} />PDF: se usa solo la primera pagina</span>
      {editingId ? (
        <div className="inline-actions">
          <button className="button primary" disabled={uploadBlocked} onClick={submitEdit}>
            Guardar cambios
          </button>
          <button className="button secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="button primary" disabled={uploadBlocked} onClick={submitCreate}><Plus size={18} />Registrar certificacion</button>
      )}
    </div>
  );
}
