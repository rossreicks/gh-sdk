import { describe, expect, it } from "vitest";
import { GhClient } from "../src/client.js";
import type { GhRunner } from "../src/runner.js";

function createRecordingRunner(stdout = ""): {
    runner: GhRunner;
    calls: Array<readonly string[]>;
    inputs: Array<string | undefined>;
} {
    const calls: Array<readonly string[]> = [];
    const inputs: Array<string | undefined> = [];
    const runner: GhRunner = async (command) => {
        calls.push(command.args);
        inputs.push(command.input);
        return { exitCode: 0, stdout, stderr: "" };
    };
    return { runner, calls, inputs };
}

describe("additional command namespaces", () => {
    it("builds label commands", async () => {
        const { runner, calls } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.label.list({ repo: "cli/cli", fields: ["name", "color"] as const, limit: 5, search: "bug" });
        await gh.label.create({ repo: "cli/cli", name: "bug", color: "ff0000", description: "Bug", force: true });
        await gh.label.edit({ repo: "cli/cli", name: "bug", newName: "defect" });
        await gh.label.delete({ repo: "cli/cli", name: "defect", yes: true });
        await gh.label.clone({ repo: "cli/new", sourceRepository: "cli/cli", force: true });

        expect(calls).toEqual([
            ["label", "list", "--repo", "cli/cli", "--json", "name,color", "--limit", "5", "--search", "bug"],
            ["label", "create", "bug", "--repo", "cli/cli", "--color", "ff0000", "--description", "Bug", "--force"],
            ["label", "edit", "bug", "--repo", "cli/cli", "--name", "defect"],
            ["label", "delete", "defect", "--repo", "cli/cli", "--yes"],
            ["label", "clone", "cli/cli", "--repo", "cli/new", "--force"],
        ]);
    });

    it("builds secret commands", async () => {
        const { runner, calls } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.secret.list({ repo: "cli/cli", fields: ["name", "updatedAt"] as const, app: "actions" });
        await gh.secret.set({
            org: "cli",
            name: "TOKEN",
            body: "secret",
            repos: ["cli", "gh"],
            visibility: "selected",
        });
        await gh.secret.delete({ user: true, name: "TOKEN", app: "codespaces" });

        expect(calls).toEqual([
            ["secret", "list", "--json", "name,updatedAt", "--repo", "cli/cli", "--app", "actions"],
            [
                "secret",
                "set",
                "TOKEN",
                "--org",
                "cli",
                "--body",
                "secret",
                "--repos",
                "cli,gh",
                "--visibility",
                "selected",
            ],
            ["secret", "delete", "TOKEN", "--user", "--app", "codespaces"],
        ]);
    });

    it("wraps ssh and gpg key list stdout and builds mutations", async () => {
        const { runner, calls } = createRecordingRunner("key output\n");
        const gh = new GhClient({ runner });

        await expect(gh.sshKey.list()).resolves.toEqual({ data: { stdout: "key output\n" } });
        await gh.sshKey.add({ keyFile: "~/.ssh/id.pub", title: "laptop", type: "signing" });
        await gh.sshKey.delete({ id: "123", yes: true });
        await expect(gh.gpgKey.list()).resolves.toEqual({ data: { stdout: "key output\n" } });
        await gh.gpgKey.add({ keyFile: "key.asc", title: "laptop" });
        await gh.gpgKey.delete({ keyId: "ABC", yes: true });

        expect(calls).toEqual([
            ["ssh-key", "list"],
            ["ssh-key", "add", "~/.ssh/id.pub", "--title", "laptop", "--type", "signing"],
            ["ssh-key", "delete", "123", "--yes"],
            ["gpg-key", "list"],
            ["gpg-key", "add", "key.asc", "--title", "laptop"],
            ["gpg-key", "delete", "ABC", "--yes"],
        ]);
    });

    it("builds workflow commands with json stdin", async () => {
        const { runner, calls, inputs } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.workflow.list({ repo: "cli/cli", fields: ["id", "name"] as const, all: true, limit: 10 });
        await gh.workflow.run({
            repo: "cli/cli",
            workflow: "ci.yml",
            ref: "main",
            rawFields: ["name=value"],
            json: '{"ok":true}',
        });
        await gh.workflow.enable({ repo: "cli/cli", workflow: 123 });
        await gh.workflow.disable({ repo: "cli/cli", workflow: "ci.yml" });

        expect(calls).toEqual([
            ["workflow", "list", "--repo", "cli/cli", "--json", "id,name", "--all", "--limit", "10"],
            ["workflow", "run", "ci.yml", "--repo", "cli/cli", "--ref", "main", "--raw-field", "name=value", "--json"],
            ["workflow", "enable", "123", "--repo", "cli/cli"],
            ["workflow", "disable", "ci.yml", "--repo", "cli/cli"],
        ]);
        expect(inputs[1]).toBe('{"ok":true}');
    });

    it("builds run commands", async () => {
        const { runner, calls } = createRecordingRunner("[]");
        const gh = new GhClient({ runner });

        await gh.run.list({ repo: "cli/cli", fields: ["databaseId", "status"] as const, branch: "main", limit: 3 });
        await gh.run.view({ repo: "cli/cli", runId: 10, fields: ["url"] as const, attempt: 2, verbose: true });
        await gh.run.cancel({ repo: "cli/cli", runId: 10, force: true });
        await gh.run.delete({ repo: "cli/cli", runId: 10 });
        await gh.run.rerun({ repo: "cli/cli", runId: 10, failed: true, job: "20" });
        await gh.run.watch({ repo: "cli/cli", runId: 10, compact: true, exitStatus: true, interval: 5 });

        expect(calls).toEqual([
            ["run", "list", "--repo", "cli/cli", "--json", "databaseId,status", "--branch", "main", "--limit", "3"],
            ["run", "view", "10", "--repo", "cli/cli", "--attempt", "2", "--verbose", "--json", "url"],
            ["run", "cancel", "10", "--repo", "cli/cli", "--force"],
            ["run", "delete", "10", "--repo", "cli/cli"],
            ["run", "rerun", "10", "--repo", "cli/cli", "--failed", "--job", "20"],
            ["run", "watch", "10", "--repo", "cli/cli", "--compact", "--exit-status", "--interval", "5"],
        ]);
    });
});
