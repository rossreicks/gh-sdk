export const prFields = [
    "additions",
    "assignees",
    "author",
    "autoMergeRequest",
    "baseRefName",
    "baseRefOid",
    "body",
    "changedFiles",
    "closed",
    "closedAt",
    "closingIssuesReferences",
    "comments",
    "commits",
    "createdAt",
    "deletions",
    "files",
    "fullDatabaseId",
    "headRefName",
    "headRefOid",
    "headRepository",
    "headRepositoryOwner",
    "id",
    "isCrossRepository",
    "isDraft",
    "labels",
    "latestReviews",
    "maintainerCanModify",
    "mergeCommit",
    "mergeStateStatus",
    "mergeable",
    "mergedAt",
    "mergedBy",
    "milestone",
    "number",
    "potentialMergeCommit",
    "projectCards",
    "projectItems",
    "reactionGroups",
    "reviewDecision",
    "reviewRequests",
    "reviews",
    "state",
    "statusCheckRollup",
    "title",
    "updatedAt",
    "url",
] as const;

export type PrField = (typeof prFields)[number];

export type GhUser = {
    id?: string;
    is_bot?: boolean;
    login: string;
    name?: string | null;
};

export type PrState = "OPEN" | "CLOSED" | "MERGED" | string;
export type PrListState = "open" | "closed" | "merged" | "all";

export type PrFieldMap = Record<PrField, unknown> & {
    additions: number;
    assignees: GhUser[];
    author: GhUser | null;
    baseRefName: string;
    baseRefOid: string;
    body: string;
    changedFiles: number;
    closed: boolean;
    closedAt: string | null;
    createdAt: string;
    deletions: number;
    fullDatabaseId: string;
    headRefName: string;
    headRefOid: string;
    id: string;
    isCrossRepository: boolean;
    isDraft: boolean;
    maintainerCanModify: boolean;
    mergeStateStatus: string;
    mergeable: string;
    mergedAt: string | null;
    mergedBy: GhUser | null;
    number: number;
    reviewDecision: string | null;
    state: PrState;
    title: string;
    updatedAt: string;
    url: string;
};
