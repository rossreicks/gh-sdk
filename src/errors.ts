export type GhErrorCode = "GH_NOT_FOUND" | "GH_COMMAND_FAILED" | "GH_JSON_PARSE_FAILED";

export type GhErrorOptions = {
    code: GhErrorCode;
    message: string;
    executable: string;
    args: readonly string[];
    exitCode: number | null;
    stdout?: string;
    stderr?: string;
    cause?: unknown;
};

export class GhError extends Error {
    readonly code: GhErrorCode;
    readonly command: string;
    readonly executable: string;
    readonly args: string[];
    readonly exitCode: number | null;
    readonly stdout: string;
    readonly stderr: string;

    constructor(options: GhErrorOptions) {
        super(options.message, { cause: options.cause });
        this.name = "GhError";
        this.code = options.code;
        this.executable = options.executable;
        this.args = [...options.args];
        this.command = formatCommand(options.executable, options.args);
        this.exitCode = options.exitCode;
        this.stdout = options.stdout ?? "";
        this.stderr = options.stderr ?? "";
    }
}

export function formatCommand(executable: string, args: readonly string[]): string {
    return [executable, ...args].map(quoteShellPart).join(" ");
}

function quoteShellPart(part: string): string {
    if (/^[A-Za-z0-9_./:=@,-]+$/.test(part)) {
        return part;
    }

    return `'${part.replaceAll("'", "'\\''")}'`;
}
