"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export default function UsuarioForm({ usuario, setUsuario, onPost }) {
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setUsuario({ ...usuario, [field]: value });
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submit(event) {
    event.preventDefault();

    const nextErrors = {};
    if (!usuario.username.trim()) nextErrors.username = "Ingresa un nombre de usuario.";
    if (usuario.password.length < 8) nextErrors.password = "La contrasena debe tener al menos 8 caracteres.";
    if (!usuario.role) nextErrors.role = "Selecciona un rol.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onPost({ type: "user" });
  }

  return (
    <form className="form-grid user-form" onSubmit={submit}>
      <label>
        Usuario
        <input
          placeholder="Nombre de usuario"
          value={usuario.username}
          onChange={(event) => updateField("username", event.target.value)}
          autoComplete="username"
          aria-invalid={Boolean(errors.username)}
        />
        {errors.username && <span className="field-error">{errors.username}</span>}
      </label>
      <label>
        Contrasena
        <input
          placeholder="Minimo 8 caracteres"
          type="password"
          minLength={8}
          value={usuario.password}
          onChange={(event) => updateField("password", event.target.value)}
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </label>
      <label>
        Rol
        <select
          value={usuario.role}
          onChange={(event) => updateField("role", event.target.value)}
          aria-invalid={Boolean(errors.role)}
        >
          <option value="">Seleccionar rol</option>
          <option value="superadmin">Superadmin</option>
          <option value="operativo">Operativo</option>
          <option value="comercial">Comercial</option>
          <option value="gerencia">Gerencia</option>
        </select>
        {errors.role && <span className="field-error">{errors.role}</span>}
      </label>
      <button className="button primary" type="submit">
        <Plus size={18} />Crear usuario
      </button>
    </form>
  );
}
