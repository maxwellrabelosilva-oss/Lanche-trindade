import crypto from "crypto";
import { ENV } from "./_core/env";

/**
 * Gera hash de senha usando SHA-256
 */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Verifica se a senha está correta
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Valida credenciais de admin
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = ENV.adminEmail;
  const adminPasswordHash = ENV.adminPasswordHash;

  if (!adminEmail || !adminPasswordHash) {
    console.warn("[Admin Auth] Admin credentials not configured");
    return false;
  }

  // Verifica email
  if (email !== adminEmail) {
    return false;
  }

  // Verifica senha
  return verifyPassword(password, adminPasswordHash);
}

/**
 * Gera token de sessão admin
 */
export function generateAdminToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
