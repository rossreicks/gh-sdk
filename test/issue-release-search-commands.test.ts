import { describe, expect, it } from "vitest";
import { GhClient } from "../src/client.js";
import type { GhRunner } from "../src/runner.js";

function createRecordingRunner(stdout: string | string[] = ""): {
    runner: GhRunner;
    calls: Array<readonly string[]>;
} {
    const calls: Array<readonly string[]> = [];
    const outputs = Array.isArray(stdout) ? [...stdout] : [stdout];
    const runner: GhRunner = async (command) => {
        calls.push(command.args);
        return { exitCode: 0, stdout: outputs.shift() ?? "", stderr: "" };
    };
    return { runner, calls };
}

describe("issue commands", () => {
    it("builds issue reads and create", async () => {
        const { runner, calls } = createRecordingRunner([
            "[]",
            JSON.stringify({ url: "https://github.com/cli/cli/issues/1" }),
            "{}",
            "https://github.com/cli/cli/issues/1\n",
        ]);
        const gh = new GhClient({ runner });

        await gh.issue.list({ repo: "cli/cli", fields: ["number", "title"] as const, labels: ["bug"], state: "open" });
        await gh.issue.view({ repo: "cli/cli", issue: 1, fields: ["url"] as const, comments: true });
        await gh.issue.status({ repo: "cli/cli", fields: ["number"] as const });
        const result = await gh.issue.create({ repo: "cli/cli", title: "Bug", body: "Details", labels: ["bug"] });

        expect(result).toEqual({ url: "https://github.com/cli/cli/issues/1" });
        expect(calls).toEqual([
            ["issue", "list", "--repo", "cli/cli", "--json", "number,title", "--state", "open", "--label", "bug"],
            ["issue", "view", "1", "--repo", "cli/cli", "--comments", "--json", "url"],
            ["issue", "status", "--repo", "cli/cli", "--json", "number"],
            ["issue", "create", "--repo", "cli/cli", "--title", "Bug", "--body", "Details", "--label", "bug"],
        ]);
    });

    it("builds issue mutations", async () => {
        const { runner, calls } = createRecordingRunner("");
        const gh = new GhClient({ runner });

        await gh.issue.close({ repo: "cli/cli", issue: 1, comment: "Done", reason: "completed" });
        await gh.issue.comment({ repo: "cli/cli", issue: 1, body: "Hi", editLast: true });
        await gh.issue.delete({ repo: "cli/cli", issue: 1, yes: true });
        await gh.issue.develop({ repo: "cli/cli", issue: 1, name: "fix", checkout: true });
        await gh.issue.edit({ repo: "cli/cli", issue: 1, title: "New", addLabels: ["bug"], removeAssignees: ["@me"] });
        await gh.issue.lock({ repo: "cli/cli", issue: 1, reason: "resolved" });
        await gh.issue.unlock({ repo: "cli/cli", issue: 1 });
        await gh.issue.pin({ repo: "cli/cli", issue: 1 });
        await gh.issue.unpin({ repo: "cli/cli", issue: 1 });
        await gh.issue.reopen({ repo: "cli/cli", issue: 1, comment: "Again" });
        await gh.issue.transfer({ repo: "cli/cli", issue: 1, destinationRepo: "cli/new" });

        expect(calls).toEqual([
            ["issue", "close", "1", "--repo", "cli/cli", "--comment", "Done", "--reason", "completed"],
            ["issue", "comment", "1", "--repo", "cli/cli", "--body", "Hi", "--edit-last"],
            ["issue", "delete", "1", "--repo", "cli/cli", "--yes"],
            ["issue", "develop", "1", "--repo", "cli/cli", "--checkout", "--name", "fix"],
            [
                "issue",
                "edit",
                "1",
                "--repo",
                "cli/cli",
                "--title",
                "New",
                "--remove-assignee",
                "@me",
                "--add-label",
                "bug",
            ],
            ["issue", "lock", "1", "--repo", "cli/cli", "--reason", "resolved"],
            ["issue", "unlock", "1", "--repo", "cli/cli"],
            ["issue", "pin", "1", "--repo", "cli/cli"],
            ["issue", "unpin", "1", "--repo", "cli/cli"],
            ["issue", "reopen", "1", "--repo", "cli/cli", "--comment", "Again"],
            ["issue", "transfer", "1", "cli/new", "--repo", "cli/cli"],
        ]);
    });
});

describe("release commands", () => {
    it("builds release commands", async () => {
        const { runner, calls } = createRecordingRunner([
            "[]",
            JSON.stringify({ url: "https://github.com/cli/cli/releases/tag/v1", tagName: "v1" }),
            "https://github.com/cli/cli/releases/tag/v1\n",
            "",
            "",
            "",
            "",
        ]);
        const gh = new GhClient({ runner });

        await gh.release.list({ repo: "cli/cli", fields: ["tagName"] as const, excludeDrafts: true, limit: 2 });
        await gh.release.view({ repo: "cli/cli", tag: "v1", fields: ["url", "tagName"] as const });
        const result = await gh.release.create({
            repo: "cli/cli",
            tag: "v1",
            files: ["dist.tgz"],
            title: "v1",
            notes: "Notes",
        });
        await gh.release.delete({ repo: "cli/cli", tag: "v1", cleanupTag: true, yes: true });
        await gh.release.deleteAsset({ repo: "cli/cli", tag: "v1", assetName: "dist.tgz", yes: true });
        await gh.release.edit({ repo: "cli/cli", tag: "v1", newTag: "v1.0", latest: false });
        await gh.release.upload({ repo: "cli/cli", tag: "v1", files: ["dist.tgz"], clobber: true });

        expect(result).toEqual({ url: "https://github.com/cli/cli/releases/tag/v1" });
        expect(calls).toEqual([
            ["release", "list", "--repo", "cli/cli", "--json", "tagName", "--exclude-drafts", "--limit", "2"],
            ["release", "view", "v1", "--repo", "cli/cli", "--json", "url,tagName"],
            ["release", "create", "v1", "dist.tgz", "--repo", "cli/cli", "--notes", "Notes", "--title", "v1"],
            ["release", "delete", "v1", "--repo", "cli/cli", "--cleanup-tag", "--yes"],
            ["release", "delete-asset", "v1", "dist.tgz", "--repo", "cli/cli", "--yes"],
            ["release", "edit", "v1", "--repo", "cli/cli", "--latest=false", "--tag", "v1.0"],
            ["release", "upload", "v1", "dist.tgz", "--repo", "cli/cli", "--clobber"],
        ]);
    });
});

describe("search commands", () => {
    it("builds search commands", async () => {
        const { runner, calls } = createRecordingRunner(["[]", "[]", "[]", "[]", "[]"]);
        const gh = new GhClient({ runner });

        await gh.search.repos({
            query: ["cli", "shell"],
            fields: ["fullName", "url"] as const,
            owners: ["cli"],
            topics: ["terminal"],
        });
        await gh.search.issues({ query: "bug", fields: ["number"] as const, labels: ["bug"], noAssignee: true });
        await gh.search.prs({
            query: "fix",
            fields: ["number", "isDraft"] as const,
            reviewRequested: "@me",
            draft: true,
        });
        await gh.search.code({ query: "panic", fields: ["path"] as const, repos: ["cli/cli"], filename: "main.go" });
        await gh.search.commits({ query: "fix", fields: ["sha"] as const, author: "monalisa", merge: true });

        expect(calls).toEqual([
            ["search", "repos", "cli", "shell", "--json", "fullName,url", "--owner", "cli", "--topic", "terminal"],
            ["search", "issues", "bug", "--json", "number", "--label", "bug", "--no-assignee"],
            ["search", "prs", "fix", "--json", "number,isDraft", "--draft", "--review-requested", "@me"],
            ["search", "code", "panic", "--json", "path", "--repo", "cli/cli", "--filename", "main.go"],
            ["search", "commits", "fix", "--json", "sha", "--author", "monalisa", "--merge"],
        ]);
    });
});
