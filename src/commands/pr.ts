import { parseFirstUrl } from "../parse-gh-output.js";
import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor, GhRunOptions } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { PrFieldMap } from "../types/pr.js";
import type { PrChecksFieldMap } from "../types/pr-checks.js";
import type { PrStatusResult } from "../types/pr-status.js";
import type {
    PrChecksOptions,
    PrCloseOptions,
    PrCommentOptions,
    PrCreateOptions,
    PrEditOptions,
    PrListOptions,
    PrLockOptions,
    PrMergeOptions,
    PrReadyOptions,
    PrReopenOptions,
    PrRevertOptions,
    PrReviewOptions,
    PrStatusOptions,
    PrUnlockOptions,
    PrUpdateBranchOptions,
    PrViewOptions,
} from "./pr.options.js";

export type {
    PrChecksOptions,
    PrCloseOptions,
    PrCommentOptions,
    PrCreateOptions,
    PrEditOptions,
    PrListOptions,
    PrLockOptions,
    PrLockReason,
    PrMergeOptions,
    PrMergeStrategy,
    PrReadyOptions,
    PrReopenOptions,
    PrRevertOptions,
    PrReviewOptions,
    PrStatusOptions,
    PrUnlockOptions,
    PrUpdateBranchOptions,
    PrViewOptions,
} from "./pr.options.js";

/**
 * Pull request commands. Method docs are copied from `gh pr <subcommand> --help`.
 *
 * @see https://cli.github.com/manual/gh_pr
 */
export interface PrCommands {
    /**
     * `gh pr list --help`
     *
     * List pull requests in a GitHub repository. By default, this only lists open PRs.
     *
     * USAGE
     *   gh pr list [flags]
     *
     * ALIASES
     *   gh pr ls
     *
     * FLAGS
     *       --app string        Filter by GitHub App author
     *   -a, --assignee string   Filter by assignee
     *   -A, --author string     Filter by author
     *   -B, --base string       Filter by base branch
     *   -d, --draft             Filter by draft state
     *   -H, --head string       Filter by head branch ("<owner>:<branch>" syntax not supported)
     *       --json fields       Output JSON with the specified fields
     *   -l, --label strings     Filter by label
     *   -L, --limit int         Maximum number of items to fetch (default 30)
     *   -S, --search query      Search pull requests with query
     *   -s, --state string      Filter by state: {open|closed|merged|all} (default "open")
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    list<Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrListOptions<Fields>,
    ): Promise<Array<PickFields<PrFieldMap, Fields>>>;

    /**
     * `gh pr view --help`
     *
     * Display the title, body, and other information about a pull request.
     *
     * USAGE
     *   gh pr view [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *   -c, --comments          View pull request comments
     *       --json fields       Output JSON with the specified fields
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    view<Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrViewOptions<Fields>,
    ): Promise<PickFields<PrFieldMap, Fields>>;

    /**
     * `gh pr status --help`
     *
     * Show status of relevant pull requests.
     *
     * USAGE
     *   gh pr status [flags]
     *
     * FLAGS
     *   -c, --conflict-status   Display the merge conflict status of each pull request
     *       --json fields       Output JSON with the specified fields
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    status<Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrStatusOptions<Fields>,
    ): Promise<PrStatusResult<Fields>>;

    /**
     * `gh pr checks --help`
     *
     * Show CI status for a single pull request.
     *
     * Additional exit codes:
     *   8: Checks pending
     *
     * USAGE
     *   gh pr checks [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *       --json fields       Output JSON with the specified fields
     *       --required          Only show checks that are required
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    checks<Fields extends readonly (keyof PrChecksFieldMap)[]>(
        options: PrChecksOptions<Fields>,
    ): Promise<Array<PickFields<PrChecksFieldMap, Fields>>>;

    /**
     * `gh pr create --help`
     *
     * Create a pull request on GitHub. Upon success, the URL of the created pull request will be printed.
     *
     * USAGE
     *   gh pr create [flags]
     *
     * ALIASES
     *   gh pr new
     *
     * FLAGS
     *   -a, --assignee login       Assign people by their login. Use "@me" to self-assign.
     *   -B, --base branch          The branch into which you want your code merged
     *   -b, --body string          Body for the pull request
     *   -F, --body-file file       Read body text from file (use "-" to read from standard input)
     *   -d, --draft                Mark pull request as a draft
     *       --dry-run              Print details instead of creating the PR. May still push git changes.
     *   -f, --fill                 Use commit info for title and body
     *       --fill-first           Use first commit info for title and body
     *       --fill-verbose         Use commits msg+body for description
     *   -H, --head branch          The branch that contains commits for your pull request (default [current branch])
     *   -l, --label name           Add labels by name
     *   -m, --milestone name       Add the pull request to a milestone by name
     *       --no-maintainer-edit   Disable maintainer's ability to modify pull request
     *   -p, --project title        Add the pull request to projects by title
     *       --recover string       Recover input from a failed run of create
     *   -r, --reviewer handle      Request reviews from people or teams by their handle
     *   -T, --template file        Template file to use as starting body text
     *   -t, --title string         Title for the pull request
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    create(options: PrCreateOptions): Promise<{ url: string }>;

    /**
     * `gh pr close --help`
     *
     * Close a pull request.
     *
     * USAGE
     *   gh pr close {<number> | <url> | <branch>} [flags]
     *
     * FLAGS
     *   -c, --comment string   Leave a closing comment
     *   -d, --delete-branch    Delete the local and remote branch after close
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    close(options: PrCloseOptions): Promise<void>;

    /**
     * `gh pr comment --help`
     *
     * Add a comment to a GitHub pull request.
     *
     * USAGE
     *   gh pr comment [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *   -b, --body text        The comment body text
     *   -F, --body-file file   Read body text from file (use "-" to read from standard input)
     *       --create-if-none   Create a new comment if no comments are found. Can be used only with --edit-last
     *       --delete-last      Delete the last comment of the current user
     *       --edit-last        Edit the last comment of the current user
     *       --yes              Skip the delete confirmation prompt when --delete-last is provided
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    comment(options: PrCommentOptions): Promise<void>;

    /**
     * `gh pr edit --help`
     *
     * Edit a pull request.
     *
     * USAGE
     *   gh pr edit [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *       --add-assignee login      Add assigned users by their login. Use "@me" to assign yourself, or "@copilot" to assign Copilot.
     *       --add-label name          Add labels by name
     *       --add-project title       Add the pull request to projects by title
     *       --add-reviewer login      Add or re-request reviewers by their login. Use "@copilot" to request review from Copilot.
     *   -B, --base branch             Change the base branch for this pull request
     *   -b, --body string             Set the new body.
     *   -F, --body-file file          Read body text from file (use "-" to read from standard input)
     *   -m, --milestone name          Edit the milestone the pull request belongs to by name
     *       --remove-assignee login   Remove assigned users by their login. Use "@me" to unassign yourself, or "@copilot" to unassign Copilot.
     *       --remove-label name       Remove labels by name
     *       --remove-milestone        Remove the milestone association from the pull request
     *       --remove-project title    Remove the pull request from projects by title
     *       --remove-reviewer login   Remove reviewers by their login. Use "@copilot" to remove review request from Copilot.
     *   -t, --title string            Set the new title.
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    edit(options: PrEditOptions): Promise<void>;

    /**
     * `gh pr merge --help`
     *
     * Merge a pull request on GitHub.
     *
     * USAGE
     *   gh pr merge [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *       --admin                   Use administrator privileges to merge a pull request that does not meet requirements
     *   -A, --author-email text       Email text for merge commit author
     *       --auto                    Automatically merge only after necessary requirements are met
     *   -b, --body text               Body text for the merge commit
     *   -F, --body-file file          Read body text from file (use "-" to read from standard input)
     *   -d, --delete-branch           Delete the local and remote branch after merge
     *       --disable-auto            Disable auto-merge for this pull request
     *       --match-head-commit SHA   Commit SHA that the pull request head must match to allow merge
     *   -m, --merge                   Merge the commits with the base branch
     *   -r, --rebase                  Rebase the commits onto the base branch
     *   -s, --squash                  Squash the commits into one commit and merge it into the base branch
     *   -t, --subject text            Subject text for the merge commit
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    merge(options: PrMergeOptions): Promise<void>;

    /**
     * `gh pr review --help`
     *
     * Add a review to a pull request.
     *
     * USAGE
     *   gh pr review [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *   -a, --approve           Approve pull request
     *   -b, --body string       Specify the body of a review
     *   -F, --body-file file    Read body text from file (use "-" to read from standard input)
     *   -c, --comment           Comment on a pull request
     *   -r, --request-changes   Request changes on a pull request
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    review(options: PrReviewOptions): Promise<void>;

    /**
     * `gh pr ready --help`
     *
     * Mark a pull request as ready for review.
     *
     * USAGE
     *   gh pr ready [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *   --undo   Convert a pull request to "draft"
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    ready(options: PrReadyOptions): Promise<void>;

    /**
     * `gh pr reopen --help`
     *
     * Reopen a pull request.
     *
     * USAGE
     *   gh pr reopen {<number> | <url> | <branch>} [flags]
     *
     * FLAGS
     *   -c, --comment string   Add a reopening comment
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    reopen(options: PrReopenOptions): Promise<void>;

    /**
     * `gh pr revert --help`
     *
     * Revert a pull request.
     *
     * USAGE
     *   gh pr revert {<number> | <url> | <branch>} [flags]
     *
     * FLAGS
     *   -b, --body string      Body for the revert pull request
     *   -F, --body-file file   Read body text from file (use "-" to read from standard input)
     *   -d, --draft            Mark revert pull request as a draft
     *   -t, --title string     Title for the revert pull request
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    revert(options: PrRevertOptions): Promise<{ url: string }>;

    /**
     * `gh pr update-branch --help`
     *
     * Update a pull request branch with latest changes of the base branch.
     *
     * USAGE
     *   gh pr update-branch [<number> | <url> | <branch>] [flags]
     *
     * FLAGS
     *   --rebase   Update PR branch by rebasing on top of latest base branch
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    updateBranch(options: PrUpdateBranchOptions): Promise<void>;

    /**
     * `gh pr lock --help`
     *
     * Lock pull request conversation.
     *
     * USAGE
     *   gh pr lock {<number> | <url>} [flags]
     *
     * FLAGS
     *   -r, --reason string   Optional reason for locking conversation (off_topic, resolved, spam, too_heated).
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    lock(options: PrLockOptions): Promise<void>;

    /**
     * `gh pr unlock --help`
     *
     * Unlock pull request conversation.
     *
     * USAGE
     *   gh pr unlock {<number> | <url>} [flags]
     *
     * INHERITED FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     */
    unlock(options: PrUnlockOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class PrCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrListOptions<Fields>,
    ): Promise<Array<PickFields<PrFieldMap, Fields>>> {
        const args = [
            "pr",
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

        if (options.base !== undefined) {
            args.push("--base", options.base);
        }

        if (options.draft) {
            args.push("--draft");
        }

        if (options.head !== undefined) {
            args.push("--head", options.head);
        }

        if (options.labels !== undefined) {
            for (const label of options.labels) {
                args.push("--label", label);
            }
        }

        if (options.search !== undefined) {
            args.push("--search", options.search);
        }

        return this.executor.json<Array<PickFields<PrFieldMap, Fields>>>(args);
    }

    view<const Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrViewOptions<Fields>,
    ): Promise<PickFields<PrFieldMap, Fields>> {
        const args = ["pr", "view", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

        if (options.comments) {
            args.push("--comments");
        }

        args.push("--json", joinFields(options.fields as readonly string[]));

        return this.executor.json<PickFields<PrFieldMap, Fields>>(args);
    }

    status<const Fields extends readonly (keyof PrFieldMap)[]>(
        options: PrStatusOptions<Fields>,
    ): Promise<PrStatusResult<Fields>> {
        const args = ["pr", "status", "--repo", normalizeRepoRef(options.repo)];

        if (options.conflictStatus) {
            args.push("--conflict-status");
        }

        args.push("--json", joinFields(options.fields as readonly string[]));

        return this.executor.json<PrStatusResult<Fields>>(args);
    }

    checks<const Fields extends readonly (keyof PrChecksFieldMap)[]>(
        options: PrChecksOptions<Fields>,
    ): Promise<Array<PickFields<PrChecksFieldMap, Fields>>> {
        const args = ["pr", "checks"];

        if (options.pr !== undefined) {
            args.push(String(options.pr));
        }

        args.push("--repo", normalizeRepoRef(options.repo));

        if (options.required) {
            args.push("--required");
        }

        args.push("--json", joinFields(options.fields as readonly string[]));

        const runOptions: GhRunOptions = {};
        if (options.allowPending) {
            runOptions.allowExitCodes = [8];
        }

        return this.executor.json<Array<PickFields<PrChecksFieldMap, Fields>>>(args, runOptions);
    }

    async create(options: PrCreateOptions): Promise<{ url: string }> {
        const args = ["pr", "create", "--repo", normalizeRepoRef(options.repo)];

        if (options.title !== undefined) {
            args.push("--title", options.title);
        }

        if (options.body !== undefined) {
            args.push("--body", options.body);
        }

        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }

        if (options.base !== undefined) {
            args.push("--base", options.base);
        }

        if (options.head !== undefined) {
            args.push("--head", options.head);
        }

        if (options.draft) {
            args.push("--draft");
        }

        if (options.dryRun) {
            args.push("--dry-run");
        }

        if (options.fill) {
            args.push("--fill");
        }

        if (options.fillFirst) {
            args.push("--fill-first");
        }

        if (options.fillVerbose) {
            args.push("--fill-verbose");
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

        if (options.reviewers !== undefined) {
            for (const reviewer of options.reviewers) {
                args.push("--reviewer", reviewer);
            }
        }

        if (options.template !== undefined) {
            args.push("--template", options.template);
        }

        if (options.noMaintainerEdit) {
            args.push("--no-maintainer-edit");
        }

        if (options.recover !== undefined) {
            args.push("--recover", options.recover);
        }

        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }

        const result = await this.executor.run(args, runOptions);
        return { url: parseFirstUrl(result.stdout) };
    }

    async close(options: PrCloseOptions): Promise<void> {
        const args = ["pr", "close", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

        if (options.comment !== undefined) {
            args.push("--comment", options.comment);
        }

        if (options.deleteBranch) {
            args.push("--delete-branch");
        }

        await this.executor.run(args);
    }

    async comment(options: PrCommentOptions): Promise<void> {
        const args = ["pr", "comment", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

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

    async edit(options: PrEditOptions): Promise<void> {
        const args = ["pr", "edit", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

        if (options.title !== undefined) {
            args.push("--title", options.title);
        }

        if (options.body !== undefined) {
            args.push("--body", options.body);
        }

        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }

        if (options.base !== undefined) {
            args.push("--base", options.base);
        }

        if (options.milestone !== undefined) {
            args.push("--milestone", options.milestone);
        }

        if (options.removeMilestone) {
            args.push("--remove-milestone");
        }

        if (options.addAssignees !== undefined) {
            for (const assignee of options.addAssignees) {
                args.push("--add-assignee", assignee);
            }
        }

        if (options.removeAssignees !== undefined) {
            for (const assignee of options.removeAssignees) {
                args.push("--remove-assignee", assignee);
            }
        }

        if (options.addLabels !== undefined) {
            for (const label of options.addLabels) {
                args.push("--add-label", label);
            }
        }

        if (options.removeLabels !== undefined) {
            for (const label of options.removeLabels) {
                args.push("--remove-label", label);
            }
        }

        if (options.addProjects !== undefined) {
            for (const project of options.addProjects) {
                args.push("--add-project", project);
            }
        }

        if (options.removeProjects !== undefined) {
            for (const project of options.removeProjects) {
                args.push("--remove-project", project);
            }
        }

        if (options.addReviewers !== undefined) {
            for (const reviewer of options.addReviewers) {
                args.push("--add-reviewer", reviewer);
            }
        }

        if (options.removeReviewers !== undefined) {
            for (const reviewer of options.removeReviewers) {
                args.push("--remove-reviewer", reviewer);
            }
        }

        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }

        await this.executor.run(args, runOptions);
    }

    async merge(options: PrMergeOptions): Promise<void> {
        const args = ["pr", "merge"];

        if (options.pr !== undefined) {
            args.push(String(options.pr));
        }

        args.push("--repo", normalizeRepoRef(options.repo));

        if (options.strategy === "merge") {
            args.push("--merge");
        } else if (options.strategy === "rebase") {
            args.push("--rebase");
        } else if (options.strategy === "squash") {
            args.push("--squash");
        }

        if (options.admin) {
            args.push("--admin");
        }

        if (options.auto) {
            args.push("--auto");
        }

        if (options.disableAuto) {
            args.push("--disable-auto");
        }

        if (options.deleteBranch) {
            args.push("--delete-branch");
        }

        if (options.body !== undefined) {
            args.push("--body", options.body);
        }

        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }

        if (options.subject !== undefined) {
            args.push("--subject", options.subject);
        }

        if (options.authorEmail !== undefined) {
            args.push("--author-email", options.authorEmail);
        }

        if (options.matchHeadCommit !== undefined) {
            args.push("--match-head-commit", options.matchHeadCommit);
        }

        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }

        await this.executor.run(args, runOptions);
    }

    async review(options: PrReviewOptions): Promise<void> {
        const args = ["pr", "review"];

        if (options.pr !== undefined) {
            args.push(String(options.pr));
        }

        args.push("--repo", normalizeRepoRef(options.repo));

        if (options.approve) {
            args.push("--approve");
        }

        if (options.comment) {
            args.push("--comment");
        }

        if (options.requestChanges) {
            args.push("--request-changes");
        }

        if (options.body !== undefined) {
            args.push("--body", options.body);
        }

        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }

        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }

        await this.executor.run(args, runOptions);
    }

    async ready(options: PrReadyOptions): Promise<void> {
        const args = ["pr", "ready"];

        if (options.pr !== undefined) {
            args.push(String(options.pr));
        }

        args.push("--repo", normalizeRepoRef(options.repo));

        if (options.undo) {
            args.push("--undo");
        }

        await this.executor.run(args);
    }

    async reopen(options: PrReopenOptions): Promise<void> {
        const args = ["pr", "reopen", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

        if (options.comment !== undefined) {
            args.push("--comment", options.comment);
        }

        await this.executor.run(args);
    }

    async revert(options: PrRevertOptions): Promise<{ url: string }> {
        const args = ["pr", "revert", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

        if (options.title !== undefined) {
            args.push("--title", options.title);
        }

        if (options.body !== undefined) {
            args.push("--body", options.body);
        }

        if (options.bodyFile !== undefined) {
            args.push("--body-file", options.bodyFile);
        }

        if (options.draft) {
            args.push("--draft");
        }

        const runOptions: GhRunOptions = {};
        if (options.bodyFile === "-" && options.body !== undefined) {
            runOptions.input = options.body;
        }

        const result = await this.executor.run(args, runOptions);
        return { url: parseFirstUrl(result.stdout) };
    }

    async updateBranch(options: PrUpdateBranchOptions): Promise<void> {
        const args = ["pr", "update-branch"];

        if (options.pr !== undefined) {
            args.push(String(options.pr));
        }

        args.push("--repo", normalizeRepoRef(options.repo));

        if (options.rebase) {
            args.push("--rebase");
        }

        await this.executor.run(args);
    }

    async lock(options: PrLockOptions): Promise<void> {
        const args = ["pr", "lock", String(options.pr), "--repo", normalizeRepoRef(options.repo)];

        if (options.reason !== undefined) {
            args.push("--reason", options.reason);
        }

        await this.executor.run(args);
    }

    async unlock(options: PrUnlockOptions): Promise<void> {
        await this.executor.run(["pr", "unlock", String(options.pr), "--repo", normalizeRepoRef(options.repo)]);
    }
}
