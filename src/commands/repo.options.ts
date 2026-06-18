import type { RepoRef } from "../repo-ref.js";
import type { RepoViewFieldMap } from "../types/repo.js";

/** Options for {@link RepoCommands.view}. Maps to `gh repo view`. */
export type RepoViewOptions<Fields extends readonly (keyof RepoViewFieldMap)[]> = {
    /** Positional `<repository>` — Repository in OWNER/REPO or URL format. */
    repo: RepoRef;
    /** `--json fields` — Output JSON with the specified fields. */
    fields: Fields;
    /** `-b, --branch string` — View a specific branch of the repository. */
    branch?: string;
};

/** Options for {@link RepoCommands.list}. Maps to `gh repo list`. */
export type RepoListOptions<Fields extends readonly (keyof RepoViewFieldMap)[]> = {
    /** Positional `<owner>` — User or organization whose repositories to list. */
    owner?: string;
    /** `--json fields` — Output JSON with the specified fields. */
    fields: Fields;
    /** `--archived` — Show only archived repositories. */
    archived?: boolean;
    /** `--fork` — Show only forks. */
    fork?: boolean;
    /** `--source` — Show only non-forks. */
    source?: boolean;
    /** `-l, --language string` — Filter by primary coding language. */
    language?: string;
    /** `-L, --limit int` — Maximum number of repositories to list (default 30). */
    limit?: number;
    /** `--no-archived` — Omit archived repositories. */
    noArchived?: boolean;
    /** `--topic strings` — Filter by topic. Repeat for multiple topics. */
    topics?: readonly string[];
    /** `--visibility string` — Filter by repository visibility: {public|private|internal}. */
    visibility?: "public" | "private" | "internal";
};

/** Repository visibility for {@link RepoCommands.create} and {@link RepoCommands.edit}. */
export type RepoCreateVisibility = "public" | "private" | "internal";

/** Options for {@link RepoCommands.create}. Maps to `gh repo create`. */
export type RepoCreateOptions = {
    /** Positional `<name>` — Repository name. OWNER/ defaults to the authenticating user. */
    name?: string;
    /** `-d, --description string` — Description of the repository. */
    description?: string;
    /** `--public` | `--private` | `--internal` — Repository visibility. */
    visibility?: RepoCreateVisibility;
    /** `--add-readme` — Add a README file to the new repository. */
    addReadme?: boolean;
    /** `-g, --gitignore string` — Specify a gitignore template for the repository. */
    gitignore?: string;
    /** `-h, --homepage URL` — Repository home page URL. */
    homepage?: string;
    /** `-l, --license string` — Specify an Open Source License for the repository. */
    license?: string;
    /** `--disable-issues` — Disable issues in the new repository. */
    disableIssues?: boolean;
    /** `--disable-wiki` — Disable wiki in the new repository. */
    disableWiki?: boolean;
    /** `--include-all-branches` — Include all branches from template repository. */
    includeAllBranches?: boolean;
    /** `-r, --remote string` — Specify remote name for the new repository. */
    remote?: string;
    /** `-s, --source string` — Specify path to local repository to use as source. */
    source?: string;
    /** `-t, --team name` — The name of the organization team to be granted access. */
    team?: string;
    /** `-p, --template repository` — Make the new repository based on a template repository. */
    template?: string;
};

/** Squash merge commit message style for {@link RepoCommands.edit}. Maps to `--squash-merge-commit-message string`. */
export type RepoSquashMergeCommitMessage = "default" | "pr-title" | "pr-title-commits" | "pr-title-description";

/** Options for {@link RepoCommands.edit}. Maps to `gh repo edit`. */
export type RepoEditOptions = {
    /** Positional `<repository>` — Repository in OWNER/REPO or URL format. */
    repo: RepoRef;
    /** `-d, --description string` — Description of the repository. */
    description?: string;
    /** `-h, --homepage URL` — Repository home page URL. */
    homepage?: string;
    /** `--visibility string` — Change the visibility of the repository to {public,private,internal}. */
    visibility?: RepoCreateVisibility;
    /** `--accept-visibility-change-consequences` — Accept the consequences of changing the repository visibility. Required when changing visibility. */
    acceptVisibilityChangeConsequences?: boolean;
    /** `--default-branch name` — Set the default branch name for the repository. */
    defaultBranch?: string;
    /** `--delete-branch-on-merge` — Delete head branch when pull requests are merged. */
    deleteBranchOnMerge?: boolean;
    /** `--add-topic strings` — Add repository topic. Repeat for multiple topics. */
    addTopics?: readonly string[];
    /** `--remove-topic strings` — Remove repository topic. Repeat for multiple topics. */
    removeTopics?: readonly string[];
    /** `--allow-forking` — Allow forking of an organization repository. */
    allowForking?: boolean;
    /** `--allow-update-branch` — Allow a pull request head branch that is behind its base branch to be updated. */
    allowUpdateBranch?: boolean;
    /** `--enable-advanced-security` — Enable advanced security in the repository. Pass `false` to disable. */
    enableAdvancedSecurity?: boolean;
    /** `--enable-auto-merge` — Enable auto-merge functionality. Pass `false` to disable. */
    enableAutoMerge?: boolean;
    /** `--enable-discussions` — Enable discussions in the repository. Pass `false` to disable. */
    enableDiscussions?: boolean;
    /** `--enable-issues` — Enable issues in the repository. Pass `false` to disable. */
    enableIssues?: boolean;
    /** `--enable-merge-commit` — Enable merging pull requests via merge commit. Pass `false` to disable. */
    enableMergeCommit?: boolean;
    /** `--enable-projects` — Enable projects in the repository. Pass `false` to disable. */
    enableProjects?: boolean;
    /** `--enable-rebase-merge` — Enable merging pull requests via rebase. Pass `false` to disable. */
    enableRebaseMerge?: boolean;
    /** `--enable-secret-scanning` — Enable secret scanning in the repository. Pass `false` to disable. */
    enableSecretScanning?: boolean;
    /** `--enable-secret-scanning-push-protection` — Enable secret scanning push protection. Secret scanning must be enabled first. Pass `false` to disable. */
    enableSecretScanningPushProtection?: boolean;
    /** `--enable-squash-merge` — Enable merging pull requests via squashed commit. Pass `false` to disable. */
    enableSquashMerge?: boolean;
    /** `--enable-wiki` — Enable wiki in the repository. Pass `false` to disable. */
    enableWiki?: boolean;
    /** `--squash-merge-commit-message string` — Default squash merge commit message: {default|pr-title|pr-title-commits|pr-title-description}. */
    squashMergeCommitMessage?: RepoSquashMergeCommitMessage;
    /** `--template` — Make the repository available as a template repository. */
    template?: boolean;
};

/** Options for {@link RepoCommands.delete}. Maps to `gh repo delete`. */
export type RepoDeleteOptions = {
    /** Positional `<repository>` — Repository in OWNER/REPO or URL format. */
    repo: RepoRef;
    /** `--yes` — Confirm deletion without prompting. */
    yes?: boolean;
};

/** Options for {@link RepoCommands.archive}. Maps to `gh repo archive`. */
export type RepoArchiveOptions = {
    /** Positional `<repository>` — Repository in OWNER/REPO or URL format. */
    repo: RepoRef;
    /** `-y, --yes` — Skip the confirmation prompt. */
    yes?: boolean;
};

/** Options for {@link RepoCommands.unarchive}. Maps to `gh repo unarchive`. */
export type RepoUnarchiveOptions = {
    /** Positional `<repository>` — Repository in OWNER/REPO or URL format. */
    repo: RepoRef;
    /** `-y, --yes` — Skip the confirmation prompt. */
    yes?: boolean;
};

/** Options for {@link RepoCommands.sync}. Maps to `gh repo sync`. */
export type RepoSyncOptions = {
    /** Positional `<destination-repository>` — Destination repository to sync. */
    repo?: RepoRef;
    /** `-s, --source string` — Source repository. */
    source?: string;
    /** `-b, --branch string` — Branch to sync (default [default branch]). */
    branch?: string;
    /** `--force` — Hard reset the branch of the destination repository to match the source repository. */
    force?: boolean;
};

/** Options for {@link RepoCommands.rename}. Maps to `gh repo rename`. */
export type RepoRenameOptions = {
    /** `-R, --repo [HOST/]OWNER/REPO` — Repository to rename. */
    repo: RepoRef;
    /** Positional `<new-name>` — Desired repository name without the owner. */
    newName: string;
    /** `-y, --yes` — Skip the confirmation prompt. */
    yes?: boolean;
};

/** View the current default repository. Maps to `gh repo set-default --view`. */
export type RepoSetDefaultViewOptions = {
    /** `-v, --view` — View the current default repository. */
    view: true;
};

/** Unset the default repository. Maps to `gh repo set-default --unset`. */
export type RepoSetDefaultUnsetOptions = {
    /** `-u, --unset` — Unset the current default repository. */
    unset: true;
};

/** Set the default repository. Maps to `gh repo set-default <repository>`. */
export type RepoSetDefaultRepoOptions = {
    /** Positional `<repository>` — Repository, OWNER/REPO, or git remote name to set as default. */
    repo: RepoRef;
};

/** Options for {@link RepoCommands.setDefault}. Maps to `gh repo set-default`. */
export type RepoSetDefaultOptions = RepoSetDefaultViewOptions | RepoSetDefaultUnsetOptions | RepoSetDefaultRepoOptions;
