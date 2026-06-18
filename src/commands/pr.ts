import { normalizeRepoRef, type RepoRef } from "../repo-ref.js";
import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { PrFieldMap, PrListState } from "../types/pr.js";

export type PrListOptions<Fields extends readonly (keyof PrFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
    state?: PrListState;
    limit?: number;
};

export type PrViewOptions<Fields extends readonly (keyof PrFieldMap)[]> = {
    repo: RepoRef;
    number: number;
    fields: Fields;
};

export class PrCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrListOptions<Fields>,
    ): Promise<Array<PickFields<PrFieldMap, Fields>>> {
        const args = [
            "pr",
            "list",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ];

        if (options.state !== undefined) {
            args.push("--state", options.state);
        }

        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }

        return this.executor.json<Array<PickFields<PrFieldMap, Fields>>>(args);
    }

    view<const Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrViewOptions<Fields>,
    ): Promise<PickFields<PrFieldMap, Fields>> {
        return this.executor.json<PickFields<PrFieldMap, Fields>>([
            "pr",
            "view",
            String(options.number),
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ]);
    }
}
