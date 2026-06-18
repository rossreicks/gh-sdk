import { describe, expect, it } from "vitest";
import { GhError } from "../src/errors.js";

describe("GhError", () => {
    it("formats command details", () => {
        const error = new GhError({
            code: "GH_COMMAND_FAILED",
            message: "failed",
            executable: "gh",
            args: ["pr", "view", "1", "--json", "number,title"],
            exitCode: 1,
            stdout: "out",
            stderr: "err",
        });

        expect(error.code).toBe("GH_COMMAND_FAILED");
        expect(error.command).toBe("gh pr view 1 --json number,title");
        expect(error.stdout).toBe("out");
        expect(error.stderr).toBe("err");
    });
});
