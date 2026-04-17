import express, { Request, Response } from "express";
import { validateAdminCredentials, generateAdminToken } from "./admin-auth";
import { ENV } from "./_core/env";

const router = express.Router();

const ADMIN_SESSION_COOKIE = "admin_session";

/**
 * POST /api/admin/login
 * Autentica administrador com email e senha
 */
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  if (!validateAdminCredentials(email, password)) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }

  const token = generateAdminToken();

  res.cookie(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: ENV.isProduction,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
  });

  return res.json({ success: true, message: "Login realizado com sucesso" });
});

/**
 * POST /api/admin/logout
 * Faz logout do administrador
 */
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie(ADMIN_SESSION_COOKIE);
  return res.json({ success: true, message: "Logout realizado com sucesso" });
});

/**
 * GET /api/admin/check
 * Verifica se o usuário está autenticado como admin
 */
router.get("/check", (req: Request, res: Response) => {
  const token = req.cookies[ADMIN_SESSION_COOKIE];

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({ authenticated: true, email: ENV.adminEmail });
});

/**
 * GET /api/admin/check-session
 * Alias para /check - verifica se o usuário está autenticado como admin
 */
router.get("/check-session", (req: Request, res: Response) => {
  const token = req.cookies[ADMIN_SESSION_COOKIE];

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({ authenticated: true, email: ENV.adminEmail });
});

export default router;
