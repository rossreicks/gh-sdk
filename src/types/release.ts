export const releaseListFields = [
    "createdAt",
    "isDraft",
    "isImmutable",
    "isLatest",
    "isPrerelease",
    "name",
    "publishedAt",
    "tagName",
] as const;

export const releaseViewFields = [
    "apiUrl",
    "assets",
    "author",
    "body",
    "createdAt",
    "databaseId",
    "id",
    "isDraft",
    "isImmutable",
    "isPrerelease",
    "name",
    "publishedAt",
    "tagName",
    "tarballUrl",
    "targetCommitish",
    "uploadUrl",
    "url",
    "zipballUrl",
] as const;

export type ReleaseListField = (typeof releaseListFields)[number];
export type ReleaseViewField = (typeof releaseViewFields)[number];

export type ReleaseListFieldMap = Record<ReleaseListField, unknown> & {
    createdAt: string;
    isDraft: boolean;
    isImmutable: boolean;
    isLatest: boolean;
    isPrerelease: boolean;
    name: string | null;
    publishedAt: string | null;
    tagName: string;
};

export type ReleaseViewFieldMap = Record<ReleaseViewField, unknown> & {
    apiUrl: string;
    body: string;
    createdAt: string;
    databaseId: number;
    id: string;
    isDraft: boolean;
    isImmutable: boolean;
    isPrerelease: boolean;
    name: string | null;
    publishedAt: string | null;
    tagName: string;
    tarballUrl: string;
    targetCommitish: string;
    uploadUrl: string;
    url: string;
    zipballUrl: string;
};
