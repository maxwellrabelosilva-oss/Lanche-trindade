import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createNodeMiddleware } from "@trpc/server/adapters/node";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { IncomingMessage, ServerResponse } from "http";

const middleware = createNodeMiddleware({
  router: appRouter,
  createContext: (opts: any) => {
    // Convert Vercel request/response to Node-like objects
    const req = opts.req as any;
    const res = opts.res as any;
    return createContext({ req, res });
  },
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Convert VercelRequest/Response to Node-like for middleware
  return new Promise<void>((resolve) => {
    middleware(req as any as IncomingMessage, res as any as ServerResponse, () => {
      resolve();
    });
  });
}

