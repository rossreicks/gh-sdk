import { normalizeRepoRef, type RepoRef } from "../repo-ref.js";
import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { RepoViewFieldMap } from "../types/repo.js";

export type RepoViewOptions<Fields extends readonly (keyof RepoViewFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
};

export class RepoCommands {
    constructor(private readonly executor: GhExecutor) {}

    view<const Fields extends readonly (keyof RepoViewFieldMap)[]>(
        options: RepoViewOptions<Fields>,
    ): Promise<PickFields<RepoViewFieldMap, Fields>> {
        return this.executor.json<PickFields<RepoViewFieldMap, Fields>>([
            "repo",
            "view",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ]);
    }
}
