import type { RepoRef } from "../repo-ref.js";
import type { WorkflowFieldMap } from "../types/workflow.js";

export type WorkflowRef = string | number;

export type WorkflowListOptions<Fields extends readonly (keyof WorkflowFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
    all?: boolean;
    limit?: number;
};

export type WorkflowRunOptions = {
    repo: RepoRef;
    workflow?: WorkflowRef;
    fields?: readonly string[];
    rawFields?: readonly string[];
    json?: string;
    ref?: string;
};

export type WorkflowEnableOptions = {
    repo: RepoRef;
    workflow?: WorkflowRef;
};

export type WorkflowDisableOptions = WorkflowEnableOptions;
