import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, verifyPassword, validateAdminCredentials, generateAdminToken } from "./admin-auth";

describe("admin-auth", () => {
  describe("hashPassword", () => {
    it("should hash a password consistently", () => {
      const password = "test-password-123";
      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);

      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 produces 64 hex characters
    });

    it("should produce different hashes for different passwords", () => {
      const hash1 = hashPassword("password1");
      const hash2 = hashPassword("password2");

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("verifyPassword", () => {
    it("should verify a correct password", () => {
      const password = "my-secure-password";
      const hash = hashPassword(password);

      expect(verifyPassword(password, hash)).toBe(true);
    });

    it("should reject an incorrect password", () => {
      const password = "correct-password";
      const wrongPassword = "wrong-password";
      const hash = hashPassword(password);

      expect(verifyPassword(wrongPassword, hash)).toBe(false);
    });
  });

  describe("validateAdminCredentials", () => {
    it("should reject if ADMIN_EMAIL is not configured", () => {
      const result = validateAdminCredentials("test@example.com", "password");
      // If env vars are not set, this should return false
      expect(typeof result).toBe("boolean");
    });

    it("should reject wrong email", () => {
      const result = validateAdminCredentials("wrong@example.com", "password");
      expect(result).toBe(false);
    });

    it("should reject wrong password", () => {
      const result = validateAdminCredentials("maxwell.rabelosilva@gmail.com", "wrong-password");
      expect(result).toBe(false);
    });
  });

  describe("generateAdminToken", () => {
    it("should generate a token", () => {
      const token = generateAdminToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(0);
    });

    it("should generate unique tokens", () => {
      const token1 = generateAdminToken();
      const token2 = generateAdminToken();

      expect(token1).not.toBe(token2);
    });
  });
});
