import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { SecretFieldMap } from "../types/secret.js";
import type { SecretDeleteOptions, SecretListOptions, SecretScopeOptions, SecretSetOptions } from "./secret.options.js";

export type {
    SecretApp,
    SecretDeleteOptions,
    SecretListOptions,
    SecretScopeOptions,
    SecretSetOptions,
    SecretVisibility,
} from "./secret.options.js";

function pushScope(args: string[], options: SecretScopeOptions): void {
    if (options.repo !== undefined) {
        args.push("--repo", normalizeRepoRef(options.repo));
    }
    if (options.org !== undefined) {
        args.push("--org", options.org);
    }
    if (options.env !== undefined) {
        args.push("--env", options.env);
    }
    if (options.user) {
        args.push("--user");
    }
    if (options.app !== undefined) {
        args.push("--app", options.app);
    }
}

export interface SecretCommands {
    list<Fields extends readonly (keyof SecretFieldMap)[]>(
        options: SecretListOptions<Fields>,
    ): Promise<Array<PickFields<SecretFieldMap, Fields>>>;
    set(options: SecretSetOptions): Promise<void>;
    delete(options: SecretDeleteOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class SecretCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof SecretFieldMap)[]>(
        options: SecretListOptions<Fields>,
    ): Promise<Array<PickFields<SecretFieldMap, Fields>>> {
        const args = ["secret", "list", "--json", joinFields(options.fields as readonly string[])];
        pushScope(args, options);
        return this.executor.json<Array<PickFields<SecretFieldMap, Fields>>>(args);
    }

    async set(options: SecretSetOptions): Promise<void> {
        const args = ["secret", "set", options.name];
        pushScope(args, options);
        if (options.body !== undefined) {
            args.push("--body", options.body);
        }
        if (options.envFile !== undefined) {
            args.push("--env-file", options.envFile);
        }
        if (options.noReposSelected) {
            args.push("--no-repos-selected");
        }
        if (options.noStore) {
            args.push("--no-store");
        }
        if (options.repos !== undefined) {
            args.push("--repos", options.repos.join(","));
        }
        if (options.visibility !== undefined) {
            args.push("--visibility", options.visibility);
        }
        await this.executor.run(args);
    }

    async delete(options: SecretDeleteOptions): Promise<void> {
        const args = ["secret", "delete", options.name];
        pushScope(args, options);
        await this.executor.run(args);
    }
}
