import { createNodeMiddleware } from "@trpc/server/adapters/node";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { IncomingMessage, ServerResponse } from "http";

const middleware = createNodeMiddleware({
  router: appRouter,
  createContext,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  return new Promise<void>((resolve) => {
    middleware(
      req as any as IncomingMessage,
      res as any as ServerResponse,
      () => {
        resolve();
      }
    );
  });
}
