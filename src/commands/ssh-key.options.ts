export type SshKeyAddOptions = {
    keyFile?: string;
    title?: string;
    type?: "authentication" | "signing";
};

export type SshKeyDeleteOptions = {
    id: string;
    yes?: boolean;
};
