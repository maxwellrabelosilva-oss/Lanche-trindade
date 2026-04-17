import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, menuItems, InsertMenuItem, menuCategories, InsertMenuCategory, storeConfig, InsertStoreConfig, menuItemImages, InsertMenuItemImage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getMenuItems() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get menu items: database not available");
    return [];
  }

  try {
    const result = await db.select().from(menuItems).orderBy(menuItems.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get menu items:", error);
    throw error;
  }
}

export async function createMenuItem(item: InsertMenuItem) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create menu item: database not available");
    return null;
  }

  try {
    const result = await db.insert(menuItems).values(item);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create menu item:", error);
    throw error;
  }
}

export async function updateMenuItem(id: number, item: Record<string, unknown>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update menu item: database not available");
    return null;
  }

  try {
    const result = await db.update(menuItems).set(item).where(eq(menuItems.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update menu item:", error);
    throw error;
  }
}

export async function deleteMenuItem(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete menu item: database not available");
    return null;
  }

  try {
    const result = await db.delete(menuItems).where(eq(menuItems.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete menu item:", error);
    throw error;
  }
}


export async function getStoreConfig() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get store config: database not available");
    return null;
  }

  try {
    const result = await db.select().from(storeConfig).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get store config:", error);
    // Retornar um objeto padrão se houver erro de coluna (durante migration)
    return {
      id: 1,
      storeName: "Lanchonete do Trindade",
      storeDescription: "Sabor que faz história!",
      storePhone: "(92) 99375-1070",
      storeEmail: "maxwell.rabelosilva@gmail.com",
      storeAddress: "Manaus, AM",
      storeInstagram: null,
      whatsappNumber: "5592993751070",
      openingTime: "18:00",
      closingTime: "23:00",
      isOpen: 1,
      closedDays: "",
      deliveryFee: "5.00",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;
  }
}

export async function updateStoreConfig(config: Partial<InsertStoreConfig>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update store config: database not available");
    return null;
  }

  try {
    const result = await db.update(storeConfig).set(config).where(eq(storeConfig.id, 1));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update store config:", error);
    throw error;
  }
}

export async function getMenuCategories() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get menu categories: database not available");
    return [];
  }

  try {
    const result = await db.select().from(menuCategories).orderBy(menuCategories.order);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get menu categories:", error);
    throw error;
  }
}

export async function getMenuItemImages(menuItemId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get menu item images: database not available");
    return [];
  }

  try {
    const result = await db.select().from(menuItemImages).where(eq(menuItemImages.menuItemId, menuItemId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get menu item images:", error);
    throw error;
  }
}

export async function addMenuItemImage(image: InsertMenuItemImage) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add menu item image: database not available");
    return null;
  }

  try {
    const result = await db.insert(menuItemImages).values(image);
    return result;
  } catch (error) {
    console.error("[Database] Failed to add menu item image:", error);
    throw error;
  }
}

export async function deleteMenuItemImage(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete menu item image: database not available");
    return null;
  }

  try {
    const result = await db.delete(menuItemImages).where(eq(menuItemImages.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete menu item image:", error);
    throw error;
  }
}
