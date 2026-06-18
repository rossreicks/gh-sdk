import { describe, expect, it } from "vitest";
import { parseDefaultRepo, parseFirstUrl } from "../src/parse-gh-output.js";

describe("parseFirstUrl", () => {
    it("extracts the first URL from stdout", () => {
        expect(parseFirstUrl("https://github.com/cli/cli/pull/1\n")).toBe("https://github.com/cli/cli/pull/1");
    });

    it("throws when no URL is present", () => {
        expect(() => parseFirstUrl("no url here")).toThrow(TypeError);
    });
});

describe("parseDefaultRepo", () => {
    it("returns the first token from stdout", () => {
        expect(parseDefaultRepo("cli/cli\n")).toBe("cli/cli");
        expect(parseDefaultRepo("cli/cli (current)\n")).toBe("cli/cli");
    });
});
