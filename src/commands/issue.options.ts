import type { RepoRef } from "../repo-ref.js";
import type { IssueFieldMap, IssueListState, IssueRef } from "../types/issue.js";

export type IssueListOptions<Fields extends readonly (keyof IssueFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
    state?: IssueListState;
    limit?: number;
    app?: string;
    assignee?: string;
    author?: string;
    labels?: readonly string[];
    mention?: string;
    milestone?: string;
    search?: string;
};

export type IssueViewOptions<Fields extends readonly (keyof IssueFieldMap)[]> = {
    repo: RepoRef;
    issue: IssueRef;
    fields: Fields;
    comments?: boolean;
};

export type IssueStatusOptions<Fields extends readonly (keyof IssueFieldMap)[]> = {
    repo: RepoRef;
    fields: Fields;
};

export type IssueCreateOptions = {
    repo: RepoRef;
    title?: string;
    body?: string;
    bodyFile?: string;
    assignees?: readonly string[];
    labels?: readonly string[];
    milestone?: string;
    project?: string;
    recover?: string;
    template?: string;
};

export type IssueCloseReason = "completed" | "not planned" | "duplicate";
export type IssueLockReason = "off_topic" | "resolved" | "spam" | "too_heated";

export type IssueRefOptions = {
    repo: RepoRef;
    issue: IssueRef;
};

export type IssueCloseOptions = IssueRefOptions & {
    comment?: string;
    duplicateOf?: string;
    reason?: IssueCloseReason;
};

export type IssueCommentOptions = IssueRefOptions & {
    body?: string;
    bodyFile?: string;
    createIfNone?: boolean;
    deleteLast?: boolean;
    editLast?: boolean;
    yes?: boolean;
};

export type IssueDeleteOptions = IssueRefOptions & {
    yes?: boolean;
};

export type IssueEditOptions = IssueRefOptions & {
    title?: string;
    body?: string;
    bodyFile?: string;
    milestone?: string;
    removeMilestone?: boolean;
    addAssignees?: readonly string[];
    removeAssignees?: readonly string[];
    addLabels?: readonly string[];
    removeLabels?: readonly string[];
    addProjects?: readonly string[];
    removeProjects?: readonly string[];
};

export type IssueLockOptions = IssueRefOptions & {
    reason?: IssueLockReason;
};

export type IssueReopenOptions = IssueRefOptions & {
    comment?: string;
};

export type IssueTransferOptions = IssueRefOptions & {
    destinationRepo: RepoRef;
};

export type IssueDevelopOptions = IssueRefOptions & {
    base?: string;
    branchRepo?: string;
    checkout?: boolean;
    list?: boolean;
    name?: string;
};
