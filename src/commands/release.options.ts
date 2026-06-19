import type { RepoRef } from "../repo-ref.js";
import type { ReleaseListFieldMap, ReleaseViewFieldMap } from "../types/release.js";

export type ReleaseListOptions<Fields extends readonly (keyof ReleaseListFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
    excludeDrafts?: boolean;
    excludePreReleases?: boolean;
    limit?: number;
    order?: "asc" | "desc";
};

export type ReleaseViewOptions<Fields extends readonly (keyof ReleaseViewFieldMap)[]> = {
    repo: RepoRef;
    tag?: string;
    fields: Fields;
};

export type ReleaseCreateOptions = {
    repo: RepoRef;
    tag?: string;
    files?: readonly string[];
    discussionCategory?: string;
    draft?: boolean;
    failOnNoCommits?: boolean;
    generateNotes?: boolean;
    latest?: boolean;
    notes?: string;
    notesFile?: string;
    notesFromTag?: boolean;
    notesStartTag?: string;
    prerelease?: boolean;
    target?: string;
    title?: string;
    verifyTag?: boolean;
};

export type ReleaseDeleteOptions = {
    repo: RepoRef;
    tag: string;
    cleanupTag?: boolean;
    yes?: boolean;
};

export type ReleaseDeleteAssetOptions = {
    repo: RepoRef;
    tag: string;
    assetName: string;
    yes?: boolean;
};

export type ReleaseEditOptions = ReleaseCreateOptions & {
    tag: string;
    newTag?: string;
};

export type ReleaseUploadOptions = {
    repo: RepoRef;
    tag: string;
    files: readonly string[];
    clobber?: boolean;
};
