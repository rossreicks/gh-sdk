import type { GhExecutor } from "../runner.js";
import type { GhTextOutput } from "../types/text-output.js";
import type { GpgKeyAddOptions, GpgKeyDeleteOptions } from "./gpg-key.options.js";

export type { GpgKeyAddOptions, GpgKeyDeleteOptions } from "./gpg-key.options.js";

export interface GpgKeyCommands {
    list(): Promise<GhTextOutput>;
    add(options?: GpgKeyAddOptions): Promise<void>;
    delete(options: GpgKeyDeleteOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class GpgKeyCommands {
    constructor(private readonly executor: GhExecutor) {}

    async list(): Promise<GhTextOutput> {
        const result = await this.executor.run(["gpg-key", "list"]);
        return { data: { stdout: result.stdout } };
    }

    async add(options: GpgKeyAddOptions = {}): Promise<void> {
        const args = ["gpg-key", "add"];
        if (options.keyFile !== undefined) {
            args.push(options.keyFile);
        }
        if (options.title !== undefined) {
            args.push("--title", options.title);
        }
        await this.executor.run(args);
    }

    async delete(options: GpgKeyDeleteOptions): Promise<void> {
        const args = ["gpg-key", "delete", options.keyId];
        if (options.yes) {
            args.push("--yes");
        }
        await this.executor.run(args);
    }
}
