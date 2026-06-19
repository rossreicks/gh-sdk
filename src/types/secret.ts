export const secretFields = ["name", "numSelectedRepos", "selectedReposURL", "updatedAt", "visibility"] as const;

export type SecretField = (typeof secretFields)[number];

export type SecretFieldMap = Record<SecretField, unknown> & {
    name: string;
    numSelectedRepos: number;
    selectedReposURL: string | null;
    updatedAt: string;
    visibility: string;
};
