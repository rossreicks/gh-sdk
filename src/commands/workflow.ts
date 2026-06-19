import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor, GhRunOptions } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { WorkflowFieldMap } from "../types/workflow.js";
import type {
    WorkflowDisableOptions,
    WorkflowEnableOptions,
    WorkflowListOptions,
    WorkflowRunOptions,
} from "./workflow.options.js";

export type {
    WorkflowDisableOptions,
    WorkflowEnableOptions,
    WorkflowListOptions,
    WorkflowRef,
    WorkflowRunOptions,
} from "./workflow.options.js";

export interface WorkflowCommands {
    list<Fields extends readonly (keyof WorkflowFieldMap)[]>(
        options: WorkflowListOptions<Fields>,
    ): Promise<Array<PickFields<WorkflowFieldMap, Fields>>>;
    run(options: WorkflowRunOptions): Promise<void>;
    enable(options: WorkflowEnableOptions): Promise<void>;
    disable(options: WorkflowDisableOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class WorkflowCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof WorkflowFieldMap)[]>(
        options: WorkflowListOptions<Fields>,
    ): Promise<Array<PickFields<WorkflowFieldMap, Fields>>> {
        const args = [
            "workflow",
            "list",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ];
        if (options.all) {
            args.push("--all");
        }
        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }
        return this.executor.json<Array<PickFields<WorkflowFieldMap, Fields>>>(args);
    }

    async run(options: WorkflowRunOptions): Promise<void> {
        const args = ["workflow", "run"];
        if (options.workflow !== undefined) {
            args.push(String(options.workflow));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        if (options.ref !== undefined) {
            args.push("--ref", options.ref);
        }
        if (options.fields !== undefined) {
            for (const field of options.fields) {
                args.push("--field", field);
            }
        }
        if (options.rawFields !== undefined) {
            for (const field of options.rawFields) {
                args.push("--raw-field", field);
            }
        }
        const runOptions: GhRunOptions = {};
        if (options.json !== undefined) {
            args.push("--json");
            runOptions.input = options.json;
        }
        await this.executor.run(args, runOptions);
    }

    async enable(options: WorkflowEnableOptions): Promise<void> {
        const args = ["workflow", "enable"];
        if (options.workflow !== undefined) {
            args.push(String(options.workflow));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        await this.executor.run(args);
    }

    async disable(options: WorkflowDisableOptions): Promise<void> {
        const args = ["workflow", "disable"];
        if (options.workflow !== undefined) {
            args.push(String(options.workflow));
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        await this.executor.run(args);
    }
}
