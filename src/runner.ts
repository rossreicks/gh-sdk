import { spawn } from "node:child_process";
import { GhError } from "./errors.js";

export type GhRunnerCommand = {
    executable: string;
    args: readonly string[];
    cwd?: string | undefined;
    env?: NodeJS.ProcessEnv | undefined;
    input?: string | undefined;
};

export type GhRunnerResult = {
    exitCode: number;
    stdout: string;
    stderr: string;
};

export type GhRunner = (command: GhRunnerCommand) => Promise<GhRunnerResult>;

export const defaultGhRunner: GhRunner = (command) => {
    return new Promise((resolve, reject) => {
        const child = spawn(command.executable, command.args, {
            cwd: command.cwd,
            env: command.env ? { ...process.env, ...command.env } : process.env,
            stdio: [command.input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
        });

        let stdout = "";
        let stderr = "";

        if (child.stdout) {
            child.stdout.setEncoding("utf8");
            child.stdout.on("data", (chunk: string) => {
                stdout += chunk;
            });
        }

        if (child.stderr) {
            child.stderr.setEncoding("utf8");
            child.stderr.on("data", (chunk: string) => {
                stderr += chunk;
            });
        }

        child.on("error", (cause: NodeJS.ErrnoException) => {
            if (cause.code === "ENOENT") {
                reject(
                    new GhError({
                        code: "GH_NOT_FOUND",
                        message: `GitHub CLI executable not found: ${command.executable}`,
                        executable: command.executable,
                        args: command.args,
                        exitCode: null,
                        cause,
                    }),
                );
                return;
            }

            reject(cause);
        });

        child.on("close", (exitCode) => {
            resolve({ exitCode: exitCode ?? 0, stdout, stderr });
        });

        if (command.input !== undefined && child.stdin) {
            child.stdin.end(command.input);
        }
    });
};

export type GhExecutorOptions = {
    ghPath?: string;
    cwd?: string | undefined;
    env?: NodeJS.ProcessEnv | undefined;
    runner?: GhRunner | undefined;
};

export class GhExecutor {
    readonly ghPath: string;
    readonly cwd: string | undefined;
    readonly env: NodeJS.ProcessEnv | undefined;
    readonly runner: GhRunner;

    constructor(options: GhExecutorOptions = {}) {
        this.ghPath = options.ghPath ?? "gh";
        this.cwd = options.cwd;
        this.env = options.env;
        this.runner = options.runner ?? defaultGhRunner;
    }

    async json<T>(args: readonly string[]): Promise<T> {
        const result = await this.runner({
            executable: this.ghPath,
            args,
            cwd: this.cwd,
            env: this.env,
        });

        if (result.exitCode !== 0) {
            throw new GhError({
                code: "GH_COMMAND_FAILED",
                message: `GitHub CLI command failed with exit code ${result.exitCode}.`,
                executable: this.ghPath,
                args,
                exitCode: result.exitCode,
                stdout: result.stdout,
                stderr: result.stderr,
            });
        }

        try {
            return JSON.parse(result.stdout) as T;
        } catch (cause) {
            throw new GhError({
                code: "GH_JSON_PARSE_FAILED",
                message: "GitHub CLI command did not return valid JSON.",
                executable: this.ghPath,
                args,
                exitCode: result.exitCode,
                stdout: result.stdout,
                stderr: result.stderr,
                cause,
            });
        }
    }
}
