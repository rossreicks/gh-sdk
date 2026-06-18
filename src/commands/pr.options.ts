import type { PrRef } from "../pr-ref.js";
import type { RepoRef } from "../repo-ref.js";
import type { PrFieldMap, PrListState } from "../types/pr.js";
import type { PrChecksFieldMap } from "../types/pr-checks.js";

/** Options for {@link PrCommands.list}. Maps to `gh pr list`. */
export type PrListOptions<Fields extends readonly (keyof PrFieldMap)[]> = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** `--json fields` — Output JSON with the specified fields. */
    fields: Fields;
    /** `-s, --state string` — Filter by state: {open|closed|merged|all} (default "open"). */
    state?: PrListState;
    /** `-L, --limit int` — Maximum number of items to fetch (default 30). */
    limit?: number;
    /** `--app string` — Filter by GitHub App author. */
    app?: string;
    /** `-a, --assignee string` — Filter by assignee. */
    assignee?: string;
    /** `-A, --author string` — Filter by author. */
    author?: string;
    /** `-B, --base string` — Filter by base branch. */
    base?: string;
    /** `-d, --draft` — Filter by draft state. */
    draft?: boolean;
    /** `-H, --head string` — Filter by head branch ("<owner>:<branch>" syntax not supported). */
    head?: string;
    /** `-l, --label strings` — Filter by label. Repeat for multiple labels (all must match). */
    labels?: readonly string[];
    /** `-S, --search query` — Search pull requests with query. */
    search?: string;
};

/** Options for {@link PrCommands.view}. Maps to `gh pr view`. */
export type PrViewOptions<Fields extends readonly (keyof PrFieldMap)[]> = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to view. */
    pr: PrRef;
    /** `--json fields` — Output JSON with the specified fields. */
    fields: Fields;
    /** `-c, --comments` — View pull request comments. */
    comments?: boolean;
};

/** Options for {@link PrCommands.status}. Maps to `gh pr status`. */
export type PrStatusOptions<Fields extends readonly (keyof PrFieldMap)[]> = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** `--json fields` — Output JSON with the specified fields. */
    fields: Fields;
    /** `-c, --conflict-status` — Display the merge conflict status of each pull request. */
    conflictStatus?: boolean;
};

/** Options for {@link PrCommands.checks}. Maps to `gh pr checks`. */
export type PrChecksOptions<Fields extends readonly (keyof PrChecksFieldMap)[]> = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to inspect. Omitted selects the current branch PR. */
    pr?: PrRef;
    /** `--json fields` — Output JSON with the specified fields. */
    fields: Fields;
    /** `--required` — Only show checks that are required. */
    required?: boolean;
    /** SDK option. When true, allows exit code 8 (checks pending) from `gh pr checks`. */
    allowPending?: boolean;
};

/** Options for {@link PrCommands.create}. Maps to `gh pr create`. */
export type PrCreateOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** `-t, --title string` — Title for the pull request. */
    title?: string;
    /** `-b, --body string` — Body for the pull request. */
    body?: string;
    /** `-F, --body-file file` — Read body text from file (use "-" to read from standard input). */
    bodyFile?: string;
    /** `-B, --base branch` — The branch into which you want your code merged. */
    base?: string;
    /** `-H, --head branch` — The branch that contains commits for your pull request (default [current branch]). */
    head?: string;
    /** `-d, --draft` — Mark pull request as a draft. */
    draft?: boolean;
    /** `--dry-run` — Print details instead of creating the PR. May still push git changes. */
    dryRun?: boolean;
    /** `-f, --fill` — Use commit info for title and body. */
    fill?: boolean;
    /** `--fill-first` — Use first commit info for title and body. */
    fillFirst?: boolean;
    /** `--fill-verbose` — Use commits msg+body for description. */
    fillVerbose?: boolean;
    /** `-a, --assignee login` — Assign people by their login. Use "@me" to self-assign. Repeat for multiple assignees. */
    assignees?: readonly string[];
    /** `-l, --label name` — Add labels by name. Repeat for multiple labels. */
    labels?: readonly string[];
    /** `-m, --milestone name` — Add the pull request to a milestone by name. */
    milestone?: string;
    /** `-p, --project title` — Add the pull request to projects by title. */
    project?: string;
    /** `-r, --reviewer handle` — Request reviews from people or teams by their handle. Repeat for multiple reviewers. */
    reviewers?: readonly string[];
    /** `-T, --template file` — Template file to use as starting body text. */
    template?: string;
    /** `--no-maintainer-edit` — Disable maintainer's ability to modify pull request. */
    noMaintainerEdit?: boolean;
    /** `--recover string` — Recover input from a failed run of create. */
    recover?: string;
};

/** Options for {@link PrCommands.close}. Maps to `gh pr close`. */
export type PrCloseOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `{<number> | <url> | <branch>}` — Pull request to close. */
    pr: PrRef;
    /** `-c, --comment string` — Leave a closing comment. */
    comment?: string;
    /** `-d, --delete-branch` — Delete the local and remote branch after close. */
    deleteBranch?: boolean;
};

/** Options for {@link PrCommands.comment}. Maps to `gh pr comment`. */
export type PrCommentOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to comment on. */
    pr: PrRef;
    /** `-b, --body text` — The comment body text. */
    body?: string;
    /** `-F, --body-file file` — Read body text from file (use "-" to read from standard input). */
    bodyFile?: string;
    /** `--create-if-none` — Create a new comment if no comments are found. Can be used only with --edit-last. */
    createIfNone?: boolean;
    /** `--delete-last` — Delete the last comment of the current user. */
    deleteLast?: boolean;
    /** `--edit-last` — Edit the last comment of the current user. */
    editLast?: boolean;
    /** `--yes` — Skip the delete confirmation prompt when --delete-last is provided. */
    yes?: boolean;
};

/** Options for {@link PrCommands.edit}. Maps to `gh pr edit`. */
export type PrEditOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to edit. */
    pr: PrRef;
    /** `-t, --title string` — Set the new title. */
    title?: string;
    /** `-b, --body string` — Set the new body. */
    body?: string;
    /** `-F, --body-file file` — Read body text from file (use "-" to read from standard input). */
    bodyFile?: string;
    /** `-B, --base branch` — Change the base branch for this pull request. */
    base?: string;
    /** `-m, --milestone name` — Edit the milestone the pull request belongs to by name. */
    milestone?: string;
    /** `--remove-milestone` — Remove the milestone association from the pull request. */
    removeMilestone?: boolean;
    /** `--add-assignee login` — Add assigned users by their login. Use "@me" to assign yourself, or "@copilot" to assign Copilot. */
    addAssignees?: readonly string[];
    /** `--remove-assignee login` — Remove assigned users by their login. Use "@me" to unassign yourself, or "@copilot" to unassign Copilot. */
    removeAssignees?: readonly string[];
    /** `--add-label name` — Add labels by name. */
    addLabels?: readonly string[];
    /** `--remove-label name` — Remove labels by name. */
    removeLabels?: readonly string[];
    /** `--add-project title` — Add the pull request to projects by title. */
    addProjects?: readonly string[];
    /** `--remove-project title` — Remove the pull request from projects by title. */
    removeProjects?: readonly string[];
    /** `--add-reviewer login` — Add or re-request reviewers by their login. Use "@copilot" to request review from Copilot. */
    addReviewers?: readonly string[];
    /** `--remove-reviewer login` — Remove reviewers by their login. Use "@copilot" to remove review request from Copilot. */
    removeReviewers?: readonly string[];
};

/** Merge strategy for {@link PrCommands.merge}. Maps to `-m, --merge`, `-r, --rebase`, or `-s, --squash`. */
export type PrMergeStrategy = "merge" | "rebase" | "squash";

/** Options for {@link PrCommands.merge}. Maps to `gh pr merge`. */
export type PrMergeOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to merge. Omitted selects the current branch PR. */
    pr?: PrRef;
    /** `-m, --merge` | `-r, --rebase` | `-s, --squash` — Merge strategy. */
    strategy?: PrMergeStrategy;
    /** `--admin` — Use administrator privileges to merge a pull request that does not meet requirements. */
    admin?: boolean;
    /** `--auto` — Automatically merge only after necessary requirements are met. */
    auto?: boolean;
    /** `--disable-auto` — Disable auto-merge for this pull request. */
    disableAuto?: boolean;
    /** `-d, --delete-branch` — Delete the local and remote branch after merge. */
    deleteBranch?: boolean;
    /** `-b, --body text` — Body text for the merge commit. */
    body?: string;
    /** `-F, --body-file file` — Read body text from file (use "-" to read from standard input). */
    bodyFile?: string;
    /** `-t, --subject text` — Subject text for the merge commit. */
    subject?: string;
    /** `-A, --author-email text` — Email text for merge commit author. */
    authorEmail?: string;
    /** `--match-head-commit SHA` — Commit SHA that the pull request head must match to allow merge. */
    matchHeadCommit?: string;
};

/** Options for {@link PrCommands.review}. Maps to `gh pr review`. */
export type PrReviewOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to review. Omitted selects the current branch PR. */
    pr?: PrRef;
    /** `-a, --approve` — Approve pull request. */
    approve?: boolean;
    /** `-c, --comment` — Comment on a pull request. */
    comment?: boolean;
    /** `-r, --request-changes` — Request changes on a pull request. */
    requestChanges?: boolean;
    /** `-b, --body string` — Specify the body of a review. */
    body?: string;
    /** `-F, --body-file file` — Read body text from file (use "-" to read from standard input). */
    bodyFile?: string;
};

/** Options for {@link PrCommands.ready}. Maps to `gh pr ready`. */
export type PrReadyOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to mark ready. Omitted selects the current branch PR. */
    pr?: PrRef;
    /** `--undo` — Convert a pull request to "draft". */
    undo?: boolean;
};

/** Options for {@link PrCommands.reopen}. Maps to `gh pr reopen`. */
export type PrReopenOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `{<number> | <url> | <branch>}` — Pull request to reopen. */
    pr: PrRef;
    /** `-c, --comment string` — Add a reopening comment. */
    comment?: string;
};

/** Options for {@link PrCommands.revert}. Maps to `gh pr revert`. */
export type PrRevertOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `{<number> | <url> | <branch>}` — Pull request to revert. */
    pr: PrRef;
    /** `-t, --title string` — Title for the revert pull request. */
    title?: string;
    /** `-b, --body string` — Body for the revert pull request. */
    body?: string;
    /** `-F, --body-file file` — Read body text from file (use "-" to read from standard input). */
    bodyFile?: string;
    /** `-d, --draft` — Mark revert pull request as a draft. */
    draft?: boolean;
};

/** Options for {@link PrCommands.updateBranch}. Maps to `gh pr update-branch`. */
export type PrUpdateBranchOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `<number> | <url> | <branch>` — Pull request to update. Omitted selects the current branch PR. */
    pr?: PrRef;
    /** `--rebase` — Update PR branch by rebasing on top of latest base branch. */
    rebase?: boolean;
};

/** Lock reason for {@link PrCommands.lock}. Maps to `-r, --reason string`. */
export type PrLockReason = "off_topic" | "resolved" | "spam" | "too_heated";

/** Options for {@link PrCommands.lock}. Maps to `gh pr lock`. */
export type PrLockOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `{<number> | <url>}` — Pull request to lock. */
    pr: PrRef;
    /** `-r, --reason string` — Optional reason for locking conversation (off_topic, resolved, spam, too_heated). */
    reason?: PrLockReason;
};

/** Options for {@link PrCommands.unlock}. Maps to `gh pr unlock`. */
export type PrUnlockOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Select another repository using the [HOST/]OWNER/REPO format. */
    repo: RepoRef;
    /** Positional `{<number> | <url>}` — Pull request to unlock. */
    pr: PrRef;
};
