import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { ENV } from "./_core/env";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createOwnerContext(): TrpcContext {
  const ownerUser: AuthenticatedUser = {
    id: 1,
    openId: ENV.ownerOpenId,
    email: "owner@example.com",
    name: "Owner User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user: ownerUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

function createNonOwnerContext(): TrpcContext {
  const regularUser: AuthenticatedUser = {
    id: 2,
    openId: "non-owner-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user: regularUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("menu procedures", () => {
  describe("menu.list", () => {
    it("should return menu items as public procedure", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: { protocol: "https", headers: {} } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);
      const result = await caller.menu.list();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("name");
        expect(result[0]).toHaveProperty("price");
      }
    });
  });

  describe("menu.create", () => {
    it("should allow owner to create menu item", async () => {
      const ctx = createOwnerContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.menu.create({
        emoji: "🍔",
        name: "Test Burger",
        description: "A test burger",
        price: 25.5,
      });

      expect(result).toEqual({ success: true });
    });

    it("should deny non-owner from creating menu item", async () => {
      const ctx = createNonOwnerContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.menu.create({
          emoji: "🍔",
          name: "Test Burger",
          description: "A test burger",
          price: 25.5,
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("Only the owner can access this resource");
      }
    });
  });

  describe("menu.update", () => {
    it("should allow owner to update menu item", async () => {
      const ctx = createOwnerContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.menu.update({
        id: 1,
        name: "Updated Burger",
        price: 30.0,
      });

      expect(result).toEqual({ success: true });
    });

    it("should deny non-owner from updating menu item", async () => {
      const ctx = createNonOwnerContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.menu.update({
          id: 1,
          name: "Updated Burger",
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("Only the owner can access this resource");
      }
    });
  });

  describe("menu.delete", () => {
    it("should allow owner to delete menu item", async () => {
      const ctx = createOwnerContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.menu.delete({ id: 1 });

      expect(result).toEqual({ success: true });
    });

    it("should deny non-owner from deleting menu item", async () => {
      const ctx = createNonOwnerContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.menu.delete({ id: 1 });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
        expect(error.message).toContain("Only the owner can access this resource");
      }
    });
  });

  describe("WhatsApp number configuration", () => {
    it("should have VITE_WHATSAPP_NUMBER environment variable set", () => {
      const whatsappNumber = process.env.VITE_WHATSAPP_NUMBER;
      expect(whatsappNumber).toBeDefined();
      expect(whatsappNumber).toBe("5592993751070");
    });
  });
});
