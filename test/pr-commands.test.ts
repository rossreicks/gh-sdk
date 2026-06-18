import { describe, expect, it } from "vitest";
import { GhClient } from "../src/client.js";
import type { GhRunner } from "../src/runner.js";

function createRecordingRunner(stdout = ""): {
    runner: GhRunner;
    calls: Array<readonly string[]>;
} {
    const calls: Array<readonly string[]> = [];
    const runner: GhRunner = async (command) => {
        calls.push(command.args);
        return { exitCode: 0, stdout, stderr: "" };
    };
    return { runner, calls };
}

describe("PrCommands", () => {
    it("builds pr view with pr ref and comments flag", async () => {
        const { runner, calls } = createRecordingRunner(JSON.stringify({ number: 1, title: "Fix" }));
        const gh = new GhClient({ runner });

        await gh.pr.view({
            repo: "cli/cli",
            pr: 1,
            fields: ["number", "title"] as const,
            comments: true,
        });

        expect(calls).toEqual([["pr", "view", "1", "--repo", "cli/cli", "--comments", "--json", "number,title"]]);
    });

    it("builds pr list with search filters", async () => {
        const { runner, calls } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.pr.list({
            repo: "cli/cli",
            fields: ["number"] as const,
            author: "@me",
            labels: ["bug", "urgent"],
            search: "status:success",
        });

        expect(calls).toEqual([
            [
                "pr",
                "list",
                "--repo",
                "cli/cli",
                "--json",
                "number",
                "--author",
                "@me",
                "--label",
                "bug",
                "--label",
                "urgent",
                "--search",
                "status:success",
            ],
        ]);
    });

    it("builds pr status with conflict status", async () => {
        const { runner, calls } = createRecordingRunner("{}");
        const gh = new GhClient({ runner });

        await gh.pr.status({
            repo: "cli/cli",
            fields: ["number", "title"] as const,
            conflictStatus: true,
        });

        expect(calls).toEqual([["pr", "status", "--repo", "cli/cli", "--conflict-status", "--json", "number,title"]]);
    });

    it("builds pr checks with allowPending exit code", async () => {
        const { runner, calls } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.pr.checks({
            repo: "cli/cli",
            pr: 12,
            fields: ["name", "state", "bucket"] as const,
            required: true,
            allowPending: true,
        });

        expect(calls).toEqual([
            ["pr", "checks", "12", "--repo", "cli/cli", "--required", "--json", "name,state,bucket"],
        ]);
    });

    it("builds pr create with assignees and returns url", async () => {
        const { runner, calls } = createRecordingRunner("https://github.com/cli/cli/pull/99\n");
        const gh = new GhClient({ runner });

        const result = await gh.pr.create({
            repo: "cli/cli",
            title: "New feature",
            body: "Details",
            assignees: ["octocat"],
            draft: true,
        });

        expect(result).toEqual({ url: "https://github.com/cli/cli/pull/99" });
        expect(calls).toEqual([
            [
                "pr",
                "create",
                "--repo",
                "cli/cli",
                "--title",
                "New feature",
                "--body",
                "Details",
                "--draft",
                "--assignee",
                "octocat",
            ],
        ]);
    });

    it("builds pr merge with squash strategy", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.pr.merge({
            repo: "cli/cli",
            pr: 5,
            strategy: "squash",
            deleteBranch: true,
        });

        expect(calls).toEqual([["pr", "merge", "5", "--repo", "cli/cli", "--squash", "--delete-branch"]]);
    });

    it("builds pr edit with add/remove labels", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.pr.edit({
            repo: "cli/cli",
            pr: 3,
            title: "Updated",
            addLabels: ["bug"],
            removeLabels: ["wip"],
        });

        expect(calls).toEqual([
            [
                "pr",
                "edit",
                "3",
                "--repo",
                "cli/cli",
                "--title",
                "Updated",
                "--add-label",
                "bug",
                "--remove-label",
                "wip",
            ],
        ]);
    });

    it("builds pr lock with reason", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.pr.lock({
            repo: "cli/cli",
            pr: 7,
            reason: "resolved",
        });

        expect(calls).toEqual([["pr", "lock", "7", "--repo", "cli/cli", "--reason", "resolved"]]);
    });

    it("builds pr revert and returns url", async () => {
        const { runner, calls } = createRecordingRunner("https://github.com/cli/cli/pull/100\n");
        const gh = new GhClient({ runner });

        const result = await gh.pr.revert({
            repo: "cli/cli",
            pr: 50,
            draft: true,
        });

        expect(result.url).toBe("https://github.com/cli/cli/pull/100");
        expect(calls).toEqual([["pr", "revert", "50", "--repo", "cli/cli", "--draft"]]);
    });
});
