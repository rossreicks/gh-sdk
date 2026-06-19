export const workflowFields = ["id", "name", "path", "state"] as const;

export type WorkflowField = (typeof workflowFields)[number];

export type WorkflowFieldMap = Record<WorkflowField, unknown> & {
    id: number;
    name: string;
    path: string;
    state: string;
};
