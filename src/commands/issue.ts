import { parseFirstUrl } from "../parse-gh-output.js";
import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor, GhRunOptions } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { IssueFieldMap } from "../types/issue.js";
import type {
    IssueCloseOptions,
    IssueCommentOptions,
    IssueCreateOptions,
    IssueDeleteOptions,
    IssueDevelopOptions,
    IssueEditOptions,
    IssueListOptions,
    IssueLockOptions,
    IssueRefOptions,
    IssueReopenOptions,
    IssueStatusOptions,
    IssueTransferOptions,
    IssueViewOptions,
} from "./issue.options.js";

export type {
    IssueCloseOptions,
    IssueCloseReason,
    IssueCommentOptions,
    IssueCreateOptions,
    IssueDeleteOptions,
    IssueDevelopOptions,
    IssueEditOptions,
    IssueListOptions,
    IssueLockOptions,
    IssueLockReason,
    IssueRefOptions,
    IssueReopenOptions,
    IssueStatusOptions,
    IssueTransferOptions,
    IssueViewOptions,
} from "./issue.options.js";

function addIssueRef(args: string[], options: IssueRefOptions): void {
    args.push(String(options.issue), "--repo", normalizeRepoRef(options.repo));
}

export interface IssueCommands {
    list<Fields extends readonly (keyof IssueFieldMap)[]>(
        options: IssueListOptions<Fields>,
    ): Promise<Array<PickFields<IssueFieldMap, Fields>>>;
    view<Fields extends readonly (keyof IssueFieldMap)[]>(
        options: IssueViewOptions<Fields>,
    ): Promise<PickFields<IssueFieldMap, Fields>>;
    status<Fields extends readonly (keyof IssueFieldMap)[]>(options: IssueStatusOptions<Fields>): Promise<unknown>;
    create(options: IssueCreateOptions): Promise<{ url: string }>;
    close(options: IssueCloseOptions): Promise<void>;
    comment(options: IssueCommentOptions): Promise<void>;
    delete(options: IssueDeleteOptions): Promise<void>;
    develop(options: IssueDevelopOptions): Promise<void>;
    edit(options: IssueEditOptions): Promise<void>;
    lock(options: IssueLockOptions): Promise<void>;
    unlock(options: IssueRefOptions): Promise<void>;
    pin(options: IssueRefOptions): Promise<void>;
    unpin(options: IssueRefOptions): Promise<void>;
    reopen(options: IssueReopenOptions): Promise<void>;
    transfer(options: IssueTransferOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class IssueCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof IssueFieldMap)[]>(
        options: IssueListOptions<Fields>,
    ): Promise<Array<PickFields<IssueFieldMap, Fields>>> {
        const args = [
            "issue",
            "list",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ];
        if (options.state !== undefined) {
            args.push("--state", options.state);
        }
        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }
        if (options.app !== undefined) {
            args.push("--app", options.app);
        }
        if (options.assignee !== undefined) {
            args.push("--assignee", options.assignee);
        }
        if (options.author !== undefined) {
            args.push("--author", options.author);
        }
        if (options.labels !== undefined) {
            for (const label of options.labels) {
                args.push("--label", label);
            }
        }
        if (options.mention !== undefined) {
            args.push("--mention", options.mention);
        }
        if (options.milestone !== undefined) {
            args.push("--milestone", options.milestone);
        }
        if (options.search !== undefined) {
            args.push("--search", options.search);
        }
        return this.executor.json<Array<PickFields<IssueFieldMap, Fields>>>(args);
    }

    view<const Fields extends readonly (keyof IssueFieldMap)[]>(
        options: IssueViewOptions<Fields>,
    ): Promise<PickFields<IssueFieldMap, Fields>> {
        const args = ["issue", "view", String(options.issue), "--repo", normalizeRepoRef(options.repo)];
        if (options.comments) {
            args.push("--comments");
        }
        args.push("--json", joinFields(options.fields as readonly string[]));
        return this.executor.json<PickFields<IssueFieldMap, Fields>>(args);
    }

    status<const Fields extends readonly (keyof IssueFieldMap)[]>(
        options: IssueStatusOptions<Fields>,
    ): Promise<unknown> {
        return this.executor.json([
            "issue",
            "status",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ]);
    }

    async create(options: IssueCreateOptions): Promise<{ url: string }> {
        const args = ["issue", "create", "--repo", normalizeRepoRef(options.repo)];
        if (options.title !== undefined) {
            args.push("--title", options.title);
        }
        if (options.body !== undefined) {
            args.push("--body", options.body);
        }
        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }
        if (options.assignees !== undefined) {
            for (const assignee of options.assignees) {
                args.push("--assignee", assignee);
            }
        }
        if (options.labels !== undefined) {
            for (const label of options.labels) {
                args.push("--label", label);
            }
        }
        if (options.milestone !== undefined) {
            args.push("--milestone", options.milestone);
        }
        if (options.project !== undefined) {
            args.push("--project", options.project);
        }
        if (options.recover !== undefined) {
            args.push("--recover", options.recover);
        }
        if (options.template !== undefined) {
            args.push("--template", options.template);
        }
        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }
        const result = await this.executor.run(args, runOptions);
        return { url: parseFirstUrl(result.stdout) };
    }

    async close(options: IssueCloseOptions): Promise<void> {
        const args = ["issue", "close"];
        addIssueRef(args, options);
        if (options.comment !== undefined) {
            args.push("--comment", options.comment);
        }
        if (options.duplicateOf !== undefined) {
            args.push("--duplicate-of", options.duplicateOf);
        }
        if (options.reason !== undefined) {
            args.push("--reason", options.reason);
        }
        await this.executor.run(args);
    }

    async comment(options: IssueCommentOptions): Promise<void> {
        const args = ["issue", "comment"];
        addIssueRef(args, options);
        if (options.body !== undefined) {
            args.push("--body", options.body);
        }
        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }
        if (options.createIfNone) {
            args.push("--create-if-none");
        }
        if (options.deleteLast) {
            args.push("--delete-last");
        }
        if (options.editLast) {
            args.push("--edit-last");
        }
        if (options.yes) {
            args.push("--yes");
        }
        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }
        await this.executor.run(args, runOptions);
    }

    async delete(options: IssueDeleteOptions): Promise<void> {
        const args = ["issue", "delete"];
        addIssueRef(args, options);
        if (options.yes) {
            args.push("--yes");
        }
        await this.executor.run(args);
    }

    async develop(options: IssueDevelopOptions): Promise<void> {
        const args = ["issue", "develop"];
        addIssueRef(args, options);
        if (options.base !== undefined) {
            args.push("--base", options.base);
        }
        if (options.branchRepo !== undefined) {
            args.push("--branch-repo", options.branchRepo);
        }
        if (options.checkout) {
            args.push("--checkout");
        }
        if (options.list) {
            args.push("--list");
        }
        if (options.name !== undefined) {
            args.push("--name", options.name);
        }
        await this.executor.run(args);
    }

    async edit(options: IssueEditOptions): Promise<void> {
        const args = ["issue", "edit"];
        addIssueRef(args, options);
        if (options.title !== undefined) {
            args.push("--title", options.title);
        }
        if (options.body !== undefined) {
            args.push("--body", options.body);
        }
        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }
        if (options.milestone !== undefined) {
            args.push("--milestone", options.milestone);
        }
        if (options.removeMilestone) {
            args.push("--remove-milestone");
        }
        if (options.addAssignees !== undefined) {
            for (const value of options.addAssignees) {
                args.push("--add-assignee", value);
            }
        }
        if (options.removeAssignees !== undefined) {
            for (const value of options.removeAssignees) {
                args.push("--remove-assignee", value);
            }
        }
        if (options.addLabels !== undefined) {
            for (const value of options.addLabels) {
                args.push("--add-label", value);
            }
        }
        if (options.removeLabels !== undefined) {
            for (const value of options.removeLabels) {
                args.push("--remove-label", value);
            }
        }
        if (options.addProjects !== undefined) {
            for (const value of options.addProjects) {
                args.push("--add-project", value);
            }
        }
        if (options.removeProjects !== undefined) {
            for (const value of options.removeProjects) {
                args.push("--remove-project", value);
            }
        }
        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }
        await this.executor.run(args, runOptions);
    }

    async lock(options: IssueLockOptions): Promise<void> {
        const args = ["issue", "lock"];
        addIssueRef(args, options);
        if (options.reason !== undefined) {
            args.push("--reason", options.reason);
        }
        await this.executor.run(args);
    }

    async unlock(options: IssueRefOptions): Promise<void> {
        const args = ["issue", "unlock"];
        addIssueRef(args, options);
        await this.executor.run(args);
    }

    async pin(options: IssueRefOptions): Promise<void> {
        const args = ["issue", "pin"];
        addIssueRef(args, options);
        await this.executor.run(args);
    }

    async unpin(options: IssueRefOptions): Promise<void> {
        const args = ["issue", "unpin"];
        addIssueRef(args, options);
        await this.executor.run(args);
    }

    async reopen(options: IssueReopenOptions): Promise<void> {
        const args = ["issue", "reopen"];
        addIssueRef(args, options);
        if (options.comment !== undefined) {
            args.push("--comment", options.comment);
        }
        await this.executor.run(args);
    }

    async transfer(options: IssueTransferOptions): Promise<void> {
        const args = [
            "issue",
            "transfer",
            String(options.issue),
            normalizeRepoRef(options.destinationRepo),
            "--repo",
            normalizeRepoRef(options.repo),
        ];
        await this.executor.run(args);
    }
}
