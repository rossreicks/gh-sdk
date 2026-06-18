export const repoViewFields = [
    "archivedAt",
    "assignableUsers",
    "codeOfConduct",
    "contactLinks",
    "createdAt",
    "defaultBranchRef",
    "deleteBranchOnMerge",
    "description",
    "diskUsage",
    "forkCount",
    "fundingLinks",
    "hasDiscussionsEnabled",
    "hasIssuesEnabled",
    "hasProjectsEnabled",
    "hasWikiEnabled",
    "homepageUrl",
    "id",
    "isArchived",
    "isBlankIssuesEnabled",
    "isEmpty",
    "isFork",
    "isInOrganization",
    "isMirror",
    "isPrivate",
    "isSecurityPolicyEnabled",
    "isTemplate",
    "isUserConfigurationRepository",
    "issueTemplates",
    "issues",
    "labels",
    "languages",
    "latestRelease",
    "licenseInfo",
    "mentionableUsers",
    "mergeCommitAllowed",
    "milestones",
    "mirrorUrl",
    "name",
    "nameWithOwner",
    "openGraphImageUrl",
    "owner",
    "parent",
    "primaryLanguage",
    "projects",
    "projectsV2",
    "pullRequestTemplates",
    "pullRequests",
    "pushedAt",
    "rebaseMergeAllowed",
    "repositoryTopics",
    "securityPolicyUrl",
    "squashMergeAllowed",
    "sshUrl",
    "stargazerCount",
    "templateRepository",
    "updatedAt",
    "url",
    "usesCustomOpenGraphImage",
    "viewerCanAdminister",
    "viewerDefaultCommitEmail",
    "viewerDefaultMergeMethod",
    "viewerHasStarred",
    "viewerPermission",
    "viewerPossibleCommitEmails",
    "viewerSubscription",
    "visibility",
    "watchers",
] as const;

export type RepoViewField = (typeof repoViewFields)[number];

export type RepoOwner = {
    id: string;
    login: string;
    name?: string | null;
};

export type RepoViewFieldMap = Record<RepoViewField, unknown> & {
    archivedAt: string | null;
    createdAt: string;
    deleteBranchOnMerge: boolean;
    description: string | null;
    diskUsage: number | null;
    forkCount: number;
    hasDiscussionsEnabled: boolean;
    hasIssuesEnabled: boolean;
    hasProjectsEnabled: boolean;
    hasWikiEnabled: boolean;
    homepageUrl: string | null;
    id: string;
    isArchived: boolean;
    isBlankIssuesEnabled: boolean;
    isEmpty: boolean;
    isFork: boolean;
    isInOrganization: boolean;
    isMirror: boolean;
    isPrivate: boolean;
    isSecurityPolicyEnabled: boolean;
    isTemplate: boolean;
    isUserConfigurationRepository: boolean;
    mergeCommitAllowed: boolean;
    mirrorUrl: string | null;
    name: string;
    nameWithOwner: string;
    openGraphImageUrl: string;
    owner: RepoOwner;
    pushedAt: string | null;
    rebaseMergeAllowed: boolean;
    securityPolicyUrl: string | null;
    squashMergeAllowed: boolean;
    sshUrl: string;
    stargazerCount: number;
    updatedAt: string;
    url: string;
    usesCustomOpenGraphImage: boolean;
    viewerCanAdminister: boolean;
    viewerDefaultCommitEmail: string | null;
    viewerDefaultMergeMethod: string;
    viewerHasStarred: boolean;
    viewerPermission: string;
    viewerPossibleCommitEmails: string[];
    viewerSubscription: string | null;
    visibility: "PUBLIC" | "PRIVATE" | "INTERNAL" | string;
};
