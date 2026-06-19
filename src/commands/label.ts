import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { LabelFieldMap } from "../types/label.js";
import type {
    LabelCloneOptions,
    LabelCreateOptions,
    LabelDeleteOptions,
    LabelEditOptions,
    LabelListOptions,
} from "./label.options.js";

export type {
    LabelCloneOptions,
    LabelCreateOptions,
    LabelDeleteOptions,
    LabelEditOptions,
    LabelListOptions,
} from "./label.options.js";

export interface LabelCommands {
    list<Fields extends readonly (keyof LabelFieldMap)[]>(
        options: LabelListOptions<Fields>,
    ): Promise<Array<PickFields<LabelFieldMap, Fields>>>;
    create(options: LabelCreateOptions): Promise<void>;
    edit(options: LabelEditOptions): Promise<void>;
    delete(options: LabelDeleteOptions): Promise<void>;
    clone(options: LabelCloneOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class LabelCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof LabelFieldMap)[]>(
        options: LabelListOptions<Fields>,
    ): Promise<Array<PickFields<LabelFieldMap, Fields>>> {
        const args = [
            "label",
            "list",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ];
        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }
        if (options.order !== undefined) {
            args.push("--order", options.order);
        }
        if (options.search !== undefined) {
            args.push("--search", options.search);
        }
        if (options.sort !== undefined) {
            args.push("--sort", options.sort);
        }
        return this.executor.json<Array<PickFields<LabelFieldMap, Fields>>>(args);
    }

    async create(options: LabelCreateOptions): Promise<void> {
        const args = ["label", "create", options.name, "--repo", normalizeRepoRef(options.repo)];
        if (options.color !== undefined) {
            args.push("--color", options.color);
        }
        if (options.description !== undefined) {
            args.push("--description", options.description);
        }
        if (options.force) {
            args.push("--force");
        }
        await this.executor.run(args);
    }

    async edit(options: LabelEditOptions): Promise<void> {
        const args = ["label", "edit", options.name, "--repo", normalizeRepoRef(options.repo)];
        if (options.newName !== undefined) {
            args.push("--name", options.newName);
        }
        if (options.color !== undefined) {
            args.push("--color", options.color);
        }
        if (options.description !== undefined) {
            args.push("--description", options.description);
        }
        await this.executor.run(args);
    }

    async delete(options: LabelDeleteOptions): Promise<void> {
        const args = ["label", "delete", options.name, "--repo", normalizeRepoRef(options.repo)];
        if (options.yes) {
            args.push("--yes");
        }
        await this.executor.run(args);
    }

    async clone(options: LabelCloneOptions): Promise<void> {
        const args = [
            "label",
            "clone",
            normalizeRepoRef(options.sourceRepository),
            "--repo",
            normalizeRepoRef(options.repo),
        ];
        if (options.force) {
            args.push("--force");
        }
        await this.executor.run(args);
    }
}
