export type GpgKeyAddOptions = {
    keyFile?: string;
    title?: string;
};

export type GpgKeyDeleteOptions = {
    keyId: string;
    yes?: boolean;
};
