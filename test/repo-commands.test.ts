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

describe("RepoCommands", () => {
    it("builds repo view with branch flag", async () => {
        const { runner, calls } = createRecordingRunner(JSON.stringify({ name: "cli" }));
        const gh = new GhClient({ runner });

        await gh.repo.view({
            repo: "cli/cli",
            fields: ["name"] as const,
            branch: "trunk",
        });

        expect(calls).toEqual([["repo", "view", "cli/cli", "--branch", "trunk", "--json", "name"]]);
    });

    it("builds repo list with owner and filters", async () => {
        const { runner, calls } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.repo.list({
            owner: "cli",
            fields: ["nameWithOwner"] as const,
            visibility: "public",
            topics: ["cli"],
            limit: 5,
        });

        expect(calls).toEqual([
            [
                "repo",
                "list",
                "cli",
                "--json",
                "nameWithOwner",
                "--limit",
                "5",
                "--topic",
                "cli",
                "--visibility",
                "public",
            ],
        ]);
    });

    it("builds repo create with visibility and returns url", async () => {
        const { runner, calls } = createRecordingRunner("https://github.com/cli/new-repo\n");
        const gh = new GhClient({ runner });

        const result = await gh.repo.create({
            name: "new-repo",
            description: "A repo",
            visibility: "private",
            addReadme: true,
        });

        expect(result).toEqual({ url: "https://github.com/cli/new-repo" });
        expect(calls).toEqual([["repo", "create", "new-repo", "--description", "A repo", "--private", "--add-readme"]]);
    });

    it("builds repo edit with enable toggles", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.repo.edit({
            repo: "cli/cli",
            enableIssues: true,
            enableWiki: false,
            addTopics: ["typescript"],
        });

        expect(calls).toEqual([
            ["repo", "edit", "cli/cli", "--add-topic", "typescript", "--enable-issues", "--enable-wiki=false"],
        ]);
    });

    it("builds repo delete with yes flag", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.repo.delete({ repo: "cli/cli", yes: true });

        expect(calls).toEqual([["repo", "delete", "cli/cli", "--yes"]]);
    });

    it("builds repo sync with source and force", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.repo.sync({
            repo: "cli/fork",
            source: "cli/cli",
            branch: "trunk",
            force: true,
        });

        expect(calls).toEqual([["repo", "sync", "cli/fork", "--source", "cli/cli", "--branch", "trunk", "--force"]]);
    });

    it("builds repo rename", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.repo.rename({ repo: "cli/old", newName: "new", yes: true });

        expect(calls).toEqual([["repo", "rename", "new", "--repo", "cli/old", "--yes"]]);
    });

    it("builds repo set-default view", async () => {
        const { runner, calls } = createRecordingRunner("cli/cli\n");
        const gh = new GhClient({ runner });

        const result = await gh.repo.setDefault({ view: true });

        expect(result).toEqual({ repo: "cli/cli" });
        expect(calls).toEqual([["repo", "set-default", "--view"]]);
    });

    it("builds repo set-default with repo", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.repo.setDefault({ repo: "cli/cli" });

        expect(calls).toEqual([["repo", "set-default", "cli/cli"]]);
    });

    it("builds repo set-default unset", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.repo.setDefault({ unset: true });

        expect(calls).toEqual([["repo", "set-default", "--unset"]]);
    });
});
