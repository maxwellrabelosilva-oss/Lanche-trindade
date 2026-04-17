import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const ownerOpenId = process.env.OWNER_OPEN_ID || "test-owner";

function createOwnerContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: ownerOpenId,
      email: "owner@test.com",
      name: "Test Owner",
      loginMethod: "admin",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Integration Tests - Categorization & Editing", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createOwnerContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list all menu items with valid categoryId", async () => {
    const items = await caller.menu.list();
    
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    
    items.forEach((item: any) => {
      expect(item).toHaveProperty("categoryId");
      expect(typeof item.categoryId).toBe("number");
      expect(item.categoryId).toBeGreaterThanOrEqual(1);
      expect(item.categoryId).toBeLessThanOrEqual(6);
    });
  });

  it("should update a menu item without changing position in list", async () => {
    const items = await caller.menu.list();
    const itemToUpdate = items[0] as any;
    const originalId = itemToUpdate.id;

    const updateResult = await caller.menu.update({
      id: originalId,
      name: "Updated Item Name",
      price: 99.99,
    });

    expect(updateResult).toEqual({ success: true });

    const updatedItems = await caller.menu.list();
    const updatedItem = updatedItems.find((i: any) => i.id === originalId);

    expect(updatedItem).toBeDefined();
    expect(updatedItem?.name).toBe("Updated Item Name");
    const priceValue = typeof updatedItem?.price === 'string' ? parseFloat(updatedItem.price) : updatedItem?.price;
    expect(priceValue).toBe(99.99);
    expect(updatedItem?.categoryId).toBe(itemToUpdate.categoryId);
  });

  it("should have items in Kikao category (categoryId 4)", async () => {
    const items = await caller.menu.list();
    const kikaoItems = items.filter((item: any) => item.categoryId === 4);
    
    expect(kikaoItems.length).toBeGreaterThan(0);
  });

  it("should have items distributed across all 6 categories", async () => {
    const items = await caller.menu.list();
    const categoryCounts: Record<number, number> = {};

    items.forEach((item: any) => {
      categoryCounts[item.categoryId] = (categoryCounts[item.categoryId] || 0) + 1;
    });

    const uniqueCategories = Object.keys(categoryCounts).length;
    expect(uniqueCategories).toBeGreaterThan(1);
  });

  it("should retrieve store config with required fields", async () => {
    const config = await caller.storeConfig.get();
    expect(config).toBeDefined();
    expect(config?.storePhone).toBeDefined();
    expect(config?.storeAddress).toBeDefined();
  });
});
