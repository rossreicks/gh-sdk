export const runFields = [
    "attempt",
    "conclusion",
    "createdAt",
    "databaseId",
    "displayTitle",
    "event",
    "headBranch",
    "headSha",
    "jobs",
    "name",
    "number",
    "startedAt",
    "status",
    "updatedAt",
    "url",
    "workflowDatabaseId",
    "workflowName",
] as const;

export type RunField = (typeof runFields)[number];

export type RunFieldMap = Record<RunField, unknown> & {
    attempt: number;
    conclusion: string | null;
    createdAt: string;
    databaseId: number;
    displayTitle: string;
    event: string;
    headBranch: string;
    headSha: string;
    name: string;
    number: number;
    startedAt: string;
    status: string;
    updatedAt: string;
    url: string;
    workflowDatabaseId: number;
    workflowName: string;
};
