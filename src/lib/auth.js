import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "nodiex-development-secret";

export const permissions = {
  superadmin: ["shipments:write", "catalog:write", "certificates:write", "content:write", "audit:read", "roles:manage"],
  operativo: ["shipments:write", "audit:read"],
  comercial: ["catalog:write", "certificates:write", "content:write"],
  gerencia: ["audit:read"]
};

export function signUser(user, expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000)) {
  return jwt.sign(
    { sub: user.id, id: user.id, username: user.username, role: user.role, roles: user.roles ?? [user.role] },
    secret,
    { expiresIn: Math.max(1, Math.floor((expiresAt.getTime() - Date.now()) / 1000)) }
  );
}

export function verifyToken(request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function can(role, permission) {
  return permissions[role]?.includes(permission) ?? false;
}
