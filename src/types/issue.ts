export const issueFields = [
    "assignees",
    "author",
    "body",
    "closed",
    "closedAt",
    "closedByPullRequestsReferences",
    "comments",
    "createdAt",
    "id",
    "isPinned",
    "labels",
    "milestone",
    "number",
    "projectCards",
    "projectItems",
    "reactionGroups",
    "state",
    "stateReason",
    "title",
    "updatedAt",
    "url",
] as const;

export type IssueField = (typeof issueFields)[number];
export type IssueRef = string | number;
export type IssueListState = "open" | "closed" | "all";

export type IssueFieldMap = Record<IssueField, unknown> & {
    body: string;
    closed: boolean;
    closedAt: string | null;
    createdAt: string;
    id: string;
    isPinned: boolean;
    number: number;
    state: string;
    stateReason: string | null;
    title: string;
    updatedAt: string;
    url: string;
};
