import type { GhExecutor } from "../runner.js";
import type { GhTextOutput } from "../types/text-output.js";
import type { SshKeyAddOptions, SshKeyDeleteOptions } from "./ssh-key.options.js";

export type { SshKeyAddOptions, SshKeyDeleteOptions } from "./ssh-key.options.js";

export interface SshKeyCommands {
    list(): Promise<GhTextOutput>;
    add(options?: SshKeyAddOptions): Promise<void>;
    delete(options: SshKeyDeleteOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class SshKeyCommands {
    constructor(private readonly executor: GhExecutor) {}

    async list(): Promise<GhTextOutput> {
        const result = await this.executor.run(["ssh-key", "list"]);
        return { data: { stdout: result.stdout } };
    }

    async add(options: SshKeyAddOptions = {}): Promise<void> {
        const args = ["ssh-key", "add"];
        if (options.keyFile !== undefined) {
            args.push(options.keyFile);
        }
        if (options.title !== undefined) {
            args.push("--title", options.title);
        }
        if (options.type !== undefined) {
            args.push("--type", options.type);
        }
        await this.executor.run(args);
    }

    async delete(options: SshKeyDeleteOptions): Promise<void> {
        const args = ["ssh-key", "delete", options.id];
        if (options.yes) {
            args.push("--yes");
        }
        await this.executor.run(args);
    }
}
