import { PrCommands } from "./commands/pr.js";
import { RepoCommands } from "./commands/repo.js";
import { GhExecutor, type GhExecutorOptions } from "./runner.js";

export type GhClientOptions = GhExecutorOptions;

export class GhClient {
    readonly repo: RepoCommands;
    readonly pr: PrCommands;

    constructor(options: GhClientOptions = {}) {
        const executor = new GhExecutor(options);
        this.repo = new RepoCommands(executor);
        this.pr = new PrCommands(executor);
    }
}
