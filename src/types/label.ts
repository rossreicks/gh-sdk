export const labelFields = [
    "color",
    "createdAt",
    "description",
    "id",
    "isDefault",
    "name",
    "updatedAt",
    "url",
] as const;

export type LabelField = (typeof labelFields)[number];

export type LabelFieldMap = Record<LabelField, unknown> & {
    color: string;
    createdAt: string;
    description: string | null;
    id: string;
    isDefault: boolean;
    name: string;
    updatedAt: string;
    url: string;
};
