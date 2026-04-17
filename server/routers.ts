import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, ownerProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "./db";
import { storeConfigRouter } from "./store-config-router";

export const appRouter = router({
  system: systemRouter,
  storeConfig: storeConfigRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  menu: router({
    list: publicProcedure.query(async () => {
      return await getMenuItems();
    }),

    create: protectedProcedure
      .input(z.object({
        emoji: z.string().min(1).max(10),
        name: z.string().min(1).max(255),
        description: z.string().min(1),
        price: z.number().positive(),
      }))
      .mutation(async ({ input }) => {
        await createMenuItem({
          emoji: input.emoji,
          name: input.name,
          description: input.description,
          price: input.price as any,
        });

        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        emoji: z.string().min(1).max(10).optional(),
        name: z.string().min(1).max(255).optional(),
        description: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        categoryId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const updateData: Record<string, unknown> = {};
        if (input.emoji !== undefined) updateData.emoji = input.emoji;
        if (input.name !== undefined) updateData.name = input.name;
        if (input.description !== undefined) updateData.description = input.description;
        if (input.price !== undefined) updateData.price = input.price;
        if (input.categoryId !== undefined) updateData.categoryId = input.categoryId;

        await updateMenuItem(input.id, updateData);

        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMenuItem(input.id);

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
