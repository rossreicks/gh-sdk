import type { RepoRef } from "../repo-ref.js";
import type { LabelFieldMap } from "../types/label.js";

export type LabelListOptions<Fields extends readonly (keyof LabelFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
    limit?: number;
    order?: "asc" | "desc";
    search?: string;
    sort?: "created" | "name";
};

export type LabelCreateOptions = {
    repo: RepoRef;
    name: string;
    color?: string;
    description?: string;
    force?: boolean;
};

export type LabelEditOptions = {
    repo: RepoRef;
    name: string;
    newName?: string;
    color?: string;
    description?: string;
};

export type LabelDeleteOptions = {
    repo: RepoRef;
    name: string;
    yes?: boolean;
};

export type LabelCloneOptions = {
    repo: RepoRef;
    sourceRepository: RepoRef;
    force?: boolean;
};
