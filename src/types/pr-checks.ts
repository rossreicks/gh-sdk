export const prChecksFields = [
    "bucket",
    "completedAt",
    "description",
    "event",
    "link",
    "name",
    "startedAt",
    "state",
    "workflow",
] as const;

export type PrChecksField = (typeof prChecksFields)[number];

export type PrChecksCheckState = "SUCCESS" | "FAILURE" | "PENDING" | "SKIPPED" | string;
export type PrChecksBucket = "pass" | "fail" | "pending" | "skipping" | "cancel" | string;

export type PrChecksFieldMap = Record<PrChecksField, unknown> & {
    bucket: PrChecksBucket;
    completedAt: string | null;
    description: string | null;
    event: string;
    link: string;
    name: string;
    startedAt: string;
    state: PrChecksCheckState;
    workflow: string;
};
