import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { RunFieldMap } from "../types/run.js";
import type {
    RunCancelOptions,
    RunDeleteOptions,
    RunListOptions,
    RunRerunOptions,
    RunViewOptions,
    RunWatchOptions,
} from "./run.options.js";

export type {
    RunCancelOptions,
    RunDeleteOptions,
    RunListOptions,
    RunRerunOptions,
    RunStatus,
    RunViewOptions,
    RunWatchOptions,
} from "./run.options.js";

export interface RunCommands {
    list<Fields extends readonly (keyof RunFieldMap)[]>(
        options: RunListOptions<Fields>,
    ): Promise<Array<PickFields<RunFieldMap, Fields>>>;
    view<Fields extends readonly (keyof RunFieldMap)[]>(
        options: RunViewOptions<Fields>,
    ): Promise<PickFields<RunFieldMap, Fields>>;
    cancel(options: RunCancelOptions): Promise<void>;
    delete(options: RunDeleteOptions): Promise<void>;
    rerun(options: RunRerunOptions): Promise<void>;
    watch(options: RunWatchOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class RunCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof RunFieldMap)[]>(
        options: RunListOptions<Fields>,
    ): Promise<Array<PickFields<RunFieldMap, Fields>>> {
        const args = [
            "run",
            "list",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ];
        if (options.all) {
            args.push("--all");
        }
        if (options.branch !== undefined) {
            args.push("--branch", options.branch);
        }
        if (options.commit !== undefined) {
            args.push("--commit", options.commit);
        }
        if (options.created !== undefined) {
            args.push("--created", options.created);
        }
        if (options.event !== undefined) {
            args.push("--event", options.event);
        }
        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }
        if (options.status !== undefined) {
            args.push("--status", options.status);
        }
        if (options.user !== undefined) {
            args.push("--user", options.user);
        }
        if (options.workflow !== undefined) {
            args.push("--workflow", options.workflow);
        }
        return this.executor.json<Array<PickFields<RunFieldMap, Fields>>>(args);
    }

    view<const Fields extends readonly (keyof RunFieldMap)[]>(
        options: RunViewOptions<Fields>,
    ): Promise<PickFields<RunFieldMap, Fields>> {
        const args = ["run", "view"];
        if (options.runId !== undefined) {
            args.push(String(options.runId));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        if (options.attempt !== undefined) {
            args.push("--attempt", String(options.attempt));
        }
        if (options.exitStatus) {
            args.push("--exit-status");
        }
        if (options.job !== undefined) {
            args.push("--job", options.job);
        }
        if (options.verbose) {
            args.push("--verbose");
        }
        args.push("--json", joinFields(options.fields as readonly string[]));
        return this.executor.json<PickFields<RunFieldMap, Fields>>(args);
    }

    async cancel(options: RunCancelOptions): Promise<void> {
        const args = ["run", "cancel"];
        if (options.runId !== undefined) {
            args.push(String(options.runId));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        if (options.force) {
            args.push("--force");
        }
        await this.executor.run(args);
    }

    async delete(options: RunDeleteOptions): Promise<void> {
        const args = ["run", "delete"];
        if (options.runId !== undefined) {
            args.push(String(options.runId));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        await this.executor.run(args);
    }

    async rerun(options: RunRerunOptions): Promise<void> {
        const args = ["run", "rerun"];
        if (options.runId !== undefined) {
            args.push(String(options.runId));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        if (options.debug) {
            args.push("--debug");
        }
        if (options.failed) {
            args.push("--failed");
        }
        if (options.job !== undefined) {
            args.push("--job", options.job);
        }
        await this.executor.run(args);
    }

    async watch(options: RunWatchOptions): Promise<void> {
        const args = ["run", "watch", String(options.runId), "--repo", normalizeRepoRef(options.repo)];
        if (options.compact) {
            args.push("--compact");
        }
        if (options.exitStatus) {
            args.push("--exit-status");
        }
        if (options.interval !== undefined) {
            args.push("--interval", String(options.interval));
        }
        await this.executor.run(args);
    }
}
