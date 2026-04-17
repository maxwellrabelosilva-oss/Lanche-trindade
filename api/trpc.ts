import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();

app.use(express.json());

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise<void>((resolve, reject) => {
    app(req as any, res as any, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
