import { describe, expect, expectTypeOf, it } from "vitest";
import { GhClient } from "../src/client.js";
import type { GhRunner } from "../src/runner.js";

describe("GhClient", () => {
    it("builds repo view commands with explicit repo and fields", async () => {
        const calls: Array<readonly string[]> = [];
        const runner: GhRunner = async (command) => {
            calls.push(command.args);
            return {
                exitCode: 0,
                stdout: JSON.stringify({
                    name: "cli",
                    url: "https://github.com/cli/cli",
                }),
                stderr: "",
            };
        };

        const gh = new GhClient({ runner });
        const result = await gh.repo.view({
            repo: "cli/cli",
            fields: ["name", "url"] as const,
        });

        expect(result).toEqual({
            name: "cli",
            url: "https://github.com/cli/cli",
        });
        expect(calls).toEqual([["repo", "view", "cli/cli", "--json", "name,url"]]);
        expectTypeOf(result).toEqualTypeOf<{ name: string; url: string }>();
    });

    it("builds pr list commands with repo object, state, and limit", async () => {
        const calls: Array<readonly string[]> = [];
        const runner: GhRunner = async (command) => {
            calls.push(command.args);
            return {
                exitCode: 0,
                stdout: JSON.stringify([{ number: 1, title: "Add feature" }]),
                stderr: "",
            };
        };

        const gh = new GhClient({ runner });
        const result = await gh.pr.list({
            repo: { owner: "cli", name: "cli" },
            fields: ["number", "title"] as const,
            state: "open",
            limit: 10,
        });

        expect(result).toEqual([{ number: 1, title: "Add feature" }]);
        expect(calls).toEqual([
            ["pr", "list", "--repo", "cli/cli", "--json", "number,title", "--state", "open", "--limit", "10"],
        ]);
        expectTypeOf(result).toEqualTypeOf<Array<{ number: number; title: string }>>();
    });
});
