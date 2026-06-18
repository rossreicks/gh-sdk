import { describe, expect, it } from "vitest";
import { normalizeRepoRef } from "../src/repo-ref.js";

describe("normalizeRepoRef", () => {
    it("accepts owner/name strings", () => {
        expect(normalizeRepoRef("cli/cli")).toBe("cli/cli");
    });

    it("accepts owner/name objects", () => {
        expect(normalizeRepoRef({ owner: "cli", name: "cli" })).toBe("cli/cli");
    });

    it("rejects invalid strings", () => {
        expect(() => normalizeRepoRef("cli")).toThrow("owner/name");
        expect(() => normalizeRepoRef("cli/cli/extra")).toThrow("owner/name");
    });
});
