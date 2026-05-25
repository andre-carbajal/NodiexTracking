"use client";

import { ImageUp, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const PRODUCT_UNITS = ["TM", "Contenedor 20'", "Contenedor 40'"];
export const PRODUCT_CURRENCIES = ["PEN", "USD", "EUR"];

function imageToDataUrl(file, onReady) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => onReady(String(reader.result || ""));
  reader.readAsDataURL(file);
}

function setPresentation(product, setProduct, index, nextPresentation) {
  setProduct({
    ...product,
    presentations: product.presentations.map((item, itemIndex) => (itemIndex === index ? nextPresentation : item))
  });
}

function statusLabel(product) {
  const hasName = product.name?.trim();
  const hasDescription = product.description?.trim();
  const hasPresentation = product.presentations?.some((presentation) => (
    PRODUCT_UNITS.includes(presentation.unit)
    && presentation.prices?.some((price) => PRODUCT_CURRENCIES.includes(price.currency) && Number(price.amount) > 0)
  ));

  if (product.publish && hasName && hasDescription && hasPresentation) return ["Publicado", "published"];
  if (hasName && hasDescription && hasPresentation) return ["Completo no publicado", "complete"];
  return ["Borrador", "draft"];
}

export default function ProductForm({ product, setProduct, onPost, onEdit, editingId, onCancel, errors, token }) {
  const [uploadState, setUploadState] = useState("");
  const [label, variant] = statusLabel(product);

  async function uploadImage(file) {
    if (!file) return;
    imageToDataUrl(file, (previewUrl) => setProduct({ ...product, previewUrl, imageUrl: product.imageUrl || "" }));
    setUploadState("Subiendo imagen...");

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setUploadState(json.message || "No se pudo subir la imagen");
      return;
    }
    setProduct({ ...product, imageUrl: json.url, previewUrl: json.url });
    setUploadState("Imagen cargada");
  }

  function addPresentation() {
    setProduct({
      ...product,
      presentations: [
        ...(product.presentations || []),
        { unit: "TM", prices: [{ currency: "USD", amount: "" }] }
      ]
    });
  }

  function removePresentation(index) {
    setProduct({
      ...product,
      presentations: product.presentations.filter((_, itemIndex) => itemIndex !== index)
    });
  }

  return (
    <div className="product-form">
      <div className="product-form-main">
        <div>
          <input
            placeholder="Nombre producto"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className={errors?.name ? "input-error" : ""}
          />
          {errors?.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="full-span">
          <textarea
            placeholder="Descripcion"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className={errors?.description ? "input-error" : ""}
            rows={3}
          />
          {errors?.description && <span className="field-error">{errors.description}</span>}
        </div>
      </div>

      <div className="product-media-row">
        <label className="file-field">
          Imagen del producto
          <input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])} />
        </label>
        {(product.previewUrl || product.imageUrl) && (
          <div className="image-preview">
            <Image unoptimized src={product.previewUrl || product.imageUrl} alt="Vista previa producto" width={84} height={64} />
            <button type="button" className="ghost-button small danger" onClick={() => setProduct({ ...product, imageUrl: "", previewUrl: "" })}>
              Quitar
            </button>
          </div>
        )}
        <span className={`publication-badge ${variant}`}>{label}</span>
        {uploadState && <span className="upload-status"><ImageUp size={16} />{uploadState}</span>}
      </div>

      <div className="nested-editor">
        <div className="nested-heading">
          <h3>Presentaciones</h3>
          <button type="button" className="ghost-button small" onClick={addPresentation}><Plus size={14} />Agregar</button>
        </div>
        {errors?.presentations && <span className="field-error">{errors.presentations}</span>}
        {(product.presentations || []).map((presentation, presentationIndex) => (
          <div className="presentation-editor" key={`${presentation.unit}-${presentationIndex}`}>
            <div className="presentation-editor-head">
              <select
                value={presentation.unit}
                onChange={(e) => setPresentation(product, setProduct, presentationIndex, { ...presentation, unit: e.target.value })}
              >
                {PRODUCT_UNITS.map((unit) => <option key={unit}>{unit}</option>)}
              </select>
              <button type="button" className="ghost-button small danger" onClick={() => removePresentation(presentationIndex)} title="Eliminar presentacion">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="price-grid">
              {(presentation.prices || []).map((price, priceIndex) => (
                <div className="price-row" key={`${price.currency}-${priceIndex}`}>
                  <select
                    value={price.currency}
                    onChange={(e) => {
                      const prices = presentation.prices.map((item, itemIndex) => (itemIndex === priceIndex ? { ...item, currency: e.target.value } : item));
                      setPresentation(product, setProduct, presentationIndex, { ...presentation, prices });
                    }}
                  >
                    {PRODUCT_CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}
                  </select>
                  <input
                    inputMode="decimal"
                    placeholder="Monto"
                    value={price.amount}
                    onChange={(e) => {
                      const prices = presentation.prices.map((item, itemIndex) => (itemIndex === priceIndex ? { ...item, amount: e.target.value } : item));
                      setPresentation(product, setProduct, presentationIndex, { ...presentation, prices });
                    }}
                  />
                  <button
                    type="button"
                    className="ghost-button small danger"
                    onClick={() => {
                      const prices = presentation.prices.filter((_, itemIndex) => itemIndex !== priceIndex);
                      setPresentation(product, setProduct, presentationIndex, { ...presentation, prices });
                    }}
                    title="Quitar precio"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="ghost-button small"
                onClick={() => setPresentation(product, setProduct, presentationIndex, {
                  ...presentation,
                  prices: [...(presentation.prices || []), { currency: "USD", amount: "" }]
                })}
              >
                <Plus size={14} />Agregar precio
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="product-actions">
        <label className="check-row">
          <input
            type="checkbox"
            checked={product.publish}
            onChange={(e) => setProduct({ ...product, publish: e.target.checked })}
          />
          Publicar
        </label>
        {editingId ? (
          <div className="inline-actions">
            <button className="button primary" onClick={() => onEdit({ type: "productEdit", id: editingId })}>
              Guardar cambios
            </button>
            <button className="button secondary" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="button primary" onClick={() => onPost({ type: "product" })}><Plus size={18} />Crear producto</button>
        )}
      </div>
    </div>
  );
}
