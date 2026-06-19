import type { RepoRef } from "../repo-ref.js";
import type { RunFieldMap } from "../types/run.js";

export type RunStatus =
    | "queued"
    | "completed"
    | "in_progress"
    | "requested"
    | "waiting"
    | "pending"
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "skipped"
    | "stale"
    | "startup_failure"
    | "success"
    | "timed_out";

export type RunListOptions<Fields extends readonly (keyof RunFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
    all?: boolean;
    branch?: string;
    commit?: string;
    created?: string;
    event?: string;
    limit?: number;
    status?: RunStatus;
    user?: string;
    workflow?: string;
};

export type RunViewOptions<Fields extends readonly (keyof RunFieldMap)[]> = {
    repo: RepoRef;
    runId?: string | number;
    fields: Fields;
    attempt?: number;
    exitStatus?: boolean;
    job?: string;
    verbose?: boolean;
};

export type RunCancelOptions = {
    repo: RepoRef;
    runId?: string | number;
    force?: boolean;
};

export type RunDeleteOptions = {
    repo: RepoRef;
    runId?: string | number;
};

export type RunRerunOptions = {
    repo: RepoRef;
    runId?: string | number;
    debug?: boolean;
    failed?: boolean;
    job?: string;
};

export type RunWatchOptions = {
    repo: RepoRef;
    runId: string | number;
    compact?: boolean;
    exitStatus?: boolean;
    interval?: number;
};
