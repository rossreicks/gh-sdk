export const searchRepoFields = [
    "createdAt",
    "defaultBranch",
    "description",
    "forksCount",
    "fullName",
    "hasDownloads",
    "hasIssues",
    "hasPages",
    "hasProjects",
    "hasWiki",
    "homepage",
    "id",
    "isArchived",
    "isDisabled",
    "isFork",
    "isPrivate",
    "language",
    "license",
    "name",
    "openIssuesCount",
    "owner",
    "pushedAt",
    "size",
    "stargazersCount",
    "updatedAt",
    "url",
    "visibility",
    "watchersCount",
] as const;
export const searchIssueFields = [
    "assignees",
    "author",
    "authorAssociation",
    "body",
    "closedAt",
    "commentsCount",
    "createdAt",
    "id",
    "isLocked",
    "isPullRequest",
    "labels",
    "number",
    "repository",
    "state",
    "title",
    "updatedAt",
    "url",
] as const;
export const searchPrFields = [...searchIssueFields, "isDraft"] as const;
export const searchCodeFields = ["path", "repository", "sha", "textMatches", "url"] as const;
export const searchCommitFields = [
    "author",
    "commit",
    "committer",
    "id",
    "parents",
    "repository",
    "sha",
    "url",
] as const;

export type SearchRepoField = (typeof searchRepoFields)[number];
export type SearchIssueField = (typeof searchIssueFields)[number];
export type SearchPrField = (typeof searchPrFields)[number];
export type SearchCodeField = (typeof searchCodeFields)[number];
export type SearchCommitField = (typeof searchCommitFields)[number];

export type SearchRepoFieldMap = Record<SearchRepoField, unknown> & { fullName: string; name: string; url: string };
export type SearchIssueFieldMap = Record<SearchIssueField, unknown> & { number: number; title: string; url: string };
export type SearchPrFieldMap = Record<SearchPrField, unknown> & {
    isDraft: boolean;
    number: number;
    title: string;
    url: string;
};
export type SearchCodeFieldMap = Record<SearchCodeField, unknown> & { path: string; sha: string; url: string };
export type SearchCommitFieldMap = Record<SearchCommitField, unknown> & { sha: string; url: string };
