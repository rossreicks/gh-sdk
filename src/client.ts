import { GpgKeyCommands } from "./commands/gpg-key.js";
import { IssueCommands } from "./commands/issue.js";
import { LabelCommands } from "./commands/label.js";
import { PrCommands } from "./commands/pr.js";
import { ReleaseCommands } from "./commands/release.js";
import { RepoCommands } from "./commands/repo.js";
import { RunCommands } from "./commands/run.js";
import { SearchCommands } from "./commands/search.js";
import { SecretCommands } from "./commands/secret.js";
import { SshKeyCommands } from "./commands/ssh-key.js";
import { WorkflowCommands } from "./commands/workflow.js";
import { GhExecutor, type GhExecutorOptions } from "./runner.js";

export type GhClientOptions = GhExecutorOptions;

export class GhClient {
    readonly repo: RepoCommands;
    readonly pr: PrCommands;
    readonly issue: IssueCommands;
    readonly release: ReleaseCommands;
    readonly run: RunCommands;
    readonly workflow: WorkflowCommands;
    readonly label: LabelCommands;
    readonly search: SearchCommands;
    readonly secret: SecretCommands;
    readonly sshKey: SshKeyCommands;
    readonly gpgKey: GpgKeyCommands;

    constructor(options: GhClientOptions = {}) {
        const executor = new GhExecutor(options);
        this.repo = new RepoCommands(executor);
        this.pr = new PrCommands(executor);
        this.issue = new IssueCommands(executor);
        this.release = new ReleaseCommands(executor);
        this.run = new RunCommands(executor);
        this.workflow = new WorkflowCommands(executor);
        this.label = new LabelCommands(executor);
        this.search = new SearchCommands(executor);
        this.secret = new SecretCommands(executor);
        this.sshKey = new SshKeyCommands(executor);
        this.gpgKey = new GpgKeyCommands(executor);
    }
}
