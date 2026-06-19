import type {
    SearchCodeFieldMap,
    SearchCommitFieldMap,
    SearchIssueFieldMap,
    SearchPrFieldMap,
    SearchRepoFieldMap,
} from "../types/search.js";

export type SearchQuery = string | readonly string[];
export type SearchOrder = "asc" | "desc";
export type SearchVisibility = "public" | "private" | "internal";
export type SearchArchived = boolean;

export type SearchBaseOptions = {
    query?: SearchQuery;
    limit?: number;
    order?: SearchOrder;
    sort?: string;
    owners?: readonly string[];
    repos?: readonly string[];
    language?: string;
    visibility?: readonly SearchVisibility[];
};

export type SearchReposOptions<Fields extends readonly (keyof SearchRepoFieldMap)[]> = SearchBaseOptions & {
    fields: Fields;
    archived?: SearchArchived;
    created?: string;
    followers?: string;
    forks?: string;
    goodFirstIssues?: string;
    helpWantedIssues?: string;
    includeForks?: "false" | "true" | "only";
    licenses?: readonly string[];
    match?: readonly ("name" | "description" | "readme")[];
    numberTopics?: string;
    size?: string;
    stars?: string;
    topics?: readonly string[];
    updated?: string;
};

export type SearchIssueFilterOptions = SearchBaseOptions & {
    app?: string;
    archived?: SearchArchived;
    assignee?: string;
    author?: string;
    closed?: string;
    commenter?: string;
    comments?: string;
    created?: string;
    includePrs?: boolean;
    interactions?: string;
    involves?: string;
    labels?: readonly string[];
    locked?: boolean;
    match?: readonly ("title" | "body" | "comments")[];
    mentions?: string;
    milestone?: string;
    noAssignee?: boolean;
    noLabel?: boolean;
    noMilestone?: boolean;
    noProject?: boolean;
    project?: string;
    reactions?: string;
    state?: "open" | "closed";
    teamMentions?: string;
    updated?: string;
};

export type SearchIssuesOptions<Fields extends readonly (keyof SearchIssueFieldMap)[]> = SearchIssueFilterOptions & {
    fields: Fields;
};

export type SearchPrsOptions<Fields extends readonly (keyof SearchPrFieldMap)[]> = SearchIssueFilterOptions & {
    fields: Fields;
    base?: string;
    checks?: "pending" | "success" | "failure";
    draft?: boolean;
    head?: string;
    merged?: boolean;
    mergedAt?: string;
    review?: "none" | "required" | "approved" | "changes_requested";
    reviewRequested?: string;
    reviewedBy?: string;
};

export type SearchCodeOptions<Fields extends readonly (keyof SearchCodeFieldMap)[]> = SearchBaseOptions & {
    fields: Fields;
    query: SearchQuery;
    extension?: string;
    filename?: string;
    match?: readonly ("file" | "path")[];
    size?: string;
};

export type SearchCommitsOptions<Fields extends readonly (keyof SearchCommitFieldMap)[]> = SearchBaseOptions & {
    fields: Fields;
    author?: string;
    authorDate?: string;
    authorEmail?: string;
    authorName?: string;
    committer?: string;
    committerDate?: string;
    committerEmail?: string;
    committerName?: string;
    hash?: string;
    merge?: boolean;
    parent?: string;
    tree?: string;
};
