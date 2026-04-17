import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getStoreConfig, updateStoreConfig } from "./db";

export const storeConfigRouter = router({
  get: publicProcedure.query(async () => {
    const config = await getStoreConfig();
    return config || {
      storeName: "Lanchonete do Trindade",
      storeDescription: "Sabor que faz história!",
      storePhone: "(92) 99375-1070",
      storeEmail: "maxwell.rabelosilva@gmail.com",
      storeAddress: "Manaus, AM",
      openingTime: "18:00",
      closingTime: "23:00",
      isOpen: 1,
      closedDays: "",
    };
  }),

  update: protectedProcedure
    .input(
      z.object({
        storeName: z.string().optional(),
        storeDescription: z.string().optional(),
        storePhone: z.string().optional(),
        storeEmail: z.string().optional(),
        storeAddress: z.string().optional(),
        storeInstagram: z.string().optional(),
        whatsappNumber: z.string().optional(),
        openingTime: z.string().optional(),
        closingTime: z.string().optional(),
        isOpen: z.number().optional(),
        closedDays: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const updateData: Record<string, unknown> = {};

      if (input.storeName !== undefined) updateData.storeName = input.storeName;
      if (input.storeDescription !== undefined) updateData.storeDescription = input.storeDescription;
      if (input.storePhone !== undefined) updateData.storePhone = input.storePhone;
      if (input.storeEmail !== undefined) updateData.storeEmail = input.storeEmail;
      if (input.storeAddress !== undefined) updateData.storeAddress = input.storeAddress;
      if (input.storeInstagram !== undefined) updateData.storeInstagram = input.storeInstagram;
      if (input.whatsappNumber !== undefined) updateData.whatsappNumber = input.whatsappNumber;
      if (input.openingTime !== undefined) updateData.openingTime = input.openingTime;
      if (input.closingTime !== undefined) updateData.closingTime = input.closingTime;
      if (input.isOpen !== undefined) updateData.isOpen = input.isOpen;
      if (input.closedDays !== undefined) updateData.closedDays = input.closedDays;

      await updateStoreConfig(updateData);

      return { success: true };
    }),
});
