import type { RepoRef } from "../repo-ref.js";
import type { SecretFieldMap } from "../types/secret.js";

export type SecretApp = "actions" | "agents" | "codespaces" | "dependabot";
export type SecretVisibility = "all" | "private" | "selected";

export type SecretScopeOptions = {
    repo?: RepoRef;
    org?: string;
    env?: string;
    user?: boolean;
    app?: SecretApp;
};

export type SecretListOptions<Fields extends readonly (keyof SecretFieldMap)[]> = SecretScopeOptions & {
    fields: Fields;
};

export type SecretSetOptions = SecretScopeOptions & {
    name: string;
    body?: string;
    envFile?: string;
    noReposSelected?: boolean;
    noStore?: boolean;
    repos?: readonly string[];
    visibility?: SecretVisibility;
};

export type SecretDeleteOptions = SecretScopeOptions & {
    name: string;
};
