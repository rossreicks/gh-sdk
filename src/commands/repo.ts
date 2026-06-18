import { parseDefaultRepo, parseFirstUrl } from "../parse-gh-output.js";
import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { RepoViewFieldMap } from "../types/repo.js";
import type {
    RepoArchiveOptions,
    RepoCreateOptions,
    RepoDeleteOptions,
    RepoEditOptions,
    RepoListOptions,
    RepoRenameOptions,
    RepoSetDefaultOptions,
    RepoSyncOptions,
    RepoUnarchiveOptions,
    RepoViewOptions,
} from "./repo.options.js";

export type {
    RepoArchiveOptions,
    RepoCreateOptions,
    RepoCreateVisibility,
    RepoDeleteOptions,
    RepoEditOptions,
    RepoListOptions,
    RepoRenameOptions,
    RepoSetDefaultOptions,
    RepoSetDefaultRepoOptions,
    RepoSetDefaultUnsetOptions,
    RepoSetDefaultViewOptions,
    RepoSquashMergeCommitMessage,
    RepoSyncOptions,
    RepoUnarchiveOptions,
    RepoViewOptions,
} from "./repo.options.js";

/**
 * Repository commands. Method docs are copied from `gh repo <subcommand> --help`.
 *
 * @see https://cli.github.com/manual/gh_repo
 */
export interface RepoCommands {
    /**
     * `gh repo view --help`
     *
     * Display the description and the README of a GitHub repository.
     *
     * USAGE
     *   gh repo view [<repository>] [flags]
     *
     * FLAGS
     *   -b, --branch string     View a specific branch of the repository
     *       --json fields       Output JSON with the specified fields
     */
    view<Fields extends readonly (keyof RepoViewFieldMap)[]>(
        options: RepoViewOptions<Fields>,
    ): Promise<PickFields<RepoViewFieldMap, Fields>>;

    /**
     * `gh repo list --help`
     *
     * List repositories owned by a user or organization.
     *
     * USAGE
     *   gh repo list [<owner>] [flags]
     *
     * ALIASES
     *   gh repo ls
     *
     * FLAGS
     *       --archived            Show only archived repositories
     *       --fork                Show only forks
     *       --json fields         Output JSON with the specified fields
     *   -l, --language string     Filter by primary coding language
     *   -L, --limit int           Maximum number of repositories to list (default 30)
     *       --no-archived         Omit archived repositories
     *       --source              Show only non-forks
     *       --topic strings       Filter by topic
     *       --visibility string   Filter by repository visibility: {public|private|internal}
     */
    list<Fields extends readonly (keyof RepoViewFieldMap)[]>(
        options: RepoListOptions<Fields>,
    ): Promise<Array<PickFields<RepoViewFieldMap, Fields>>>;

    /**
     * `gh repo create --help`
     *
     * Create a new GitHub repository.
     *
     * USAGE
     *   gh repo create [<name>] [flags]
     *
     * ALIASES
     *   gh repo new
     *
     * FLAGS
     *       --add-readme             Add a README file to the new repository
     *   -d, --description string     Description of the repository
     *       --disable-issues         Disable issues in the new repository
     *       --disable-wiki           Disable wiki in the new repository
     *   -g, --gitignore string       Specify a gitignore template for the repository
     *   -h, --homepage URL           Repository home page URL
     *       --include-all-branches   Include all branches from template repository
     *       --internal               Make the new repository internal
     *   -l, --license string         Specify an Open Source License for the repository
     *       --private                Make the new repository private
     *       --public                 Make the new repository public
     *   -r, --remote string          Specify remote name for the new repository
     *   -s, --source string          Specify path to local repository to use as source
     *   -t, --team name              The name of the organization team to be granted access
     *   -p, --template repository    Make the new repository based on a template repository
     */
    create(options: RepoCreateOptions): Promise<{ url: string }>;

    /**
     * `gh repo edit --help`
     *
     * Edit repository settings. To toggle a setting off, use the `--<flag>=false` syntax.
     *
     * USAGE
     *   gh repo edit [<repository>] [flags]
     *
     * FLAGS
     *       --accept-visibility-change-consequences    Accept the consequences of changing the repository visibility
     *       --add-topic strings                        Add repository topic
     *       --allow-forking                            Allow forking of an organization repository
     *       --allow-update-branch                      Allow a pull request head branch that is behind its base branch to be updated
     *       --default-branch name                      Set the default branch name for the repository
     *       --delete-branch-on-merge                   Delete head branch when pull requests are merged
     *   -d, --description string                       Description of the repository
     *       --enable-advanced-security                 Enable advanced security in the repository
     *       --enable-auto-merge                        Enable auto-merge functionality
     *       --enable-discussions                       Enable discussions in the repository
     *       --enable-issues                            Enable issues in the repository
     *       --enable-merge-commit                      Enable merging pull requests via merge commit
     *       --enable-projects                          Enable projects in the repository
     *       --enable-rebase-merge                      Enable merging pull requests via rebase
     *       --enable-secret-scanning                   Enable secret scanning in the repository
     *       --enable-secret-scanning-push-protection   Enable secret scanning push protection in the repository. Secret scanning must be enabled first
     *       --enable-squash-merge                      Enable merging pull requests via squashed commit
     *       --enable-wiki                              Enable wiki in the repository
     *   -h, --homepage URL                             Repository home page URL
     *       --remove-topic strings                     Remove repository topic
     *       --squash-merge-commit-message string       The default value for a squash merge commit message: {default|pr-title|pr-title-commits|pr-title-description}
     *       --template                                 Make the repository available as a template repository
     *       --visibility string                        Change the visibility of the repository to {public,private,internal}
     */
    edit(options: RepoEditOptions): Promise<void>;

    /**
     * `gh repo delete --help`
     *
     * Delete a GitHub repository.
     *
     * USAGE
     *   gh repo delete [<repository>] [flags]
     *
     * FLAGS
     *   --yes   Confirm deletion without prompting
     */
    delete(options: RepoDeleteOptions): Promise<void>;

    /**
     * `gh repo archive --help`
     *
     * Archive a GitHub repository.
     *
     * USAGE
     *   gh repo archive [<repository>] [flags]
     *
     * FLAGS
     *   -y, --yes   Skip the confirmation prompt
     */
    archive(options: RepoArchiveOptions): Promise<void>;

    /**
     * `gh repo unarchive --help`
     *
     * Unarchive a GitHub repository.
     *
     * USAGE
     *   gh repo unarchive [<repository>] [flags]
     *
     * FLAGS
     *   -y, --yes   Skip the confirmation prompt
     */
    unarchive(options: RepoUnarchiveOptions): Promise<void>;

    /**
     * `gh repo sync --help`
     *
     * Sync destination repository from source repository.
     *
     * USAGE
     *   gh repo sync [<destination-repository>] [flags]
     *
     * FLAGS
     *   -b, --branch string   Branch to sync (default [default branch])
     *       --force           Hard reset the branch of the destination repository to match the source repository
     *   -s, --source string   Source repository
     */
    sync(options: RepoSyncOptions): Promise<void>;

    /**
     * `gh repo rename --help`
     *
     * Rename a GitHub repository.
     *
     * USAGE
     *   gh repo rename [<new-name>] [flags]
     *
     * FLAGS
     *   -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
     *   -y, --yes                      Skip the confirmation prompt
     */
    rename(options: RepoRenameOptions): Promise<void>;

    /**
     * `gh repo set-default --help`
     *
     * Set the default remote repository to use when querying the GitHub API for the locally cloned repository.
     *
     * USAGE
     *   gh repo set-default [<repository>] [flags]
     *
     * FLAGS
     *   -u, --unset   Unset the current default repository
     *   -v, --view    View the current default repository
     */
    setDefault(options: RepoSetDefaultOptions): Promise<{ repo: string } | undefined>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class RepoCommands {
    constructor(private readonly executor: GhExecutor) {}

    view<const Fields extends readonly (keyof RepoViewFieldMap)[]>(
        options: RepoViewOptions<Fields>,
    ): Promise<PickFields<RepoViewFieldMap, Fields>> {
        const args = ["repo", "view", normalizeRepoRef(options.repo)];

        if (options.branch !== undefined) {
            args.push("--branch", options.branch);
        }

        args.push("--json", joinFields(options.fields as readonly string[]));

        return this.executor.json<PickFields<RepoViewFieldMap, Fields>>(args);
    }

    list<const Fields extends readonly (keyof RepoViewFieldMap)[]>(
        options: RepoListOptions<Fields>,
    ): Promise<Array<PickFields<RepoViewFieldMap, Fields>>> {
        const args = ["repo", "list"];

        if (options.owner !== undefined) {
            args.push(options.owner);
        }

        args.push("--json", joinFields(options.fields as readonly string[]));

        if (options.archived) {
            args.push("--archived");
        }

        if (options.fork) {
            args.push("--fork");
        }

        if (options.source) {
            args.push("--source");
        }

        if (options.language !== undefined) {
            args.push("--language", options.language);
        }

        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }

        if (options.noArchived) {
            args.push("--no-archived");
        }

        if (options.topics !== undefined) {
            for (const topic of options.topics) {
                args.push("--topic", topic);
            }
        }

        if (options.visibility !== undefined) {
            args.push("--visibility", options.visibility);
        }

        return this.executor.json<Array<PickFields<RepoViewFieldMap, Fields>>>(args);
    }

    async create(options: RepoCreateOptions): Promise<{ url: string }> {
        const args = ["repo", "create"];

        if (options.name !== undefined) {
            args.push(options.name);
        }

        if (options.description !== undefined) {
            args.push("--description", options.description);
        }

        if (options.visibility === "public") {
            args.push("--public");
        } else if (options.visibility === "private") {
            args.push("--private");
        } else if (options.visibility === "internal") {
            args.push("--internal");
        }

        if (options.addReadme) {
            args.push("--add-readme");
        }

        if (options.gitignore !== undefined) {
            args.push("--gitignore", options.gitignore);
        }

        if (options.homepage !== undefined) {
            args.push("--homepage", options.homepage);
        }

        if (options.license !== undefined) {
            args.push("--license", options.license);
        }

        if (options.disableIssues) {
            args.push("--disable-issues");
        }

        if (options.disableWiki) {
            args.push("--disable-wiki");
        }

        if (options.includeAllBranches) {
            args.push("--include-all-branches");
        }

        if (options.remote !== undefined) {
            args.push("--remote", options.remote);
        }

        if (options.source !== undefined) {
            args.push("--source", options.source);
        }

        if (options.team !== undefined) {
            args.push("--team", options.team);
        }

        if (options.template !== undefined) {
            args.push("--template", options.template);
        }

        const result = await this.executor.run(args);
        return { url: parseFirstUrl(result.stdout) };
    }

    async edit(options: RepoEditOptions): Promise<void> {
        const args = ["repo", "edit", normalizeRepoRef(options.repo)];

        if (options.description !== undefined) {
            args.push("--description", options.description);
        }

        if (options.homepage !== undefined) {
            args.push("--homepage", options.homepage);
        }

        if (options.visibility !== undefined) {
            args.push("--visibility", options.visibility);
        }

        if (options.acceptVisibilityChangeConsequences) {
            args.push("--accept-visibility-change-consequences");
        }

        if (options.defaultBranch !== undefined) {
            args.push("--default-branch", options.defaultBranch);
        }

        if (options.deleteBranchOnMerge) {
            args.push("--delete-branch-on-merge");
        }

        if (options.addTopics !== undefined) {
            for (const topic of options.addTopics) {
                args.push("--add-topic", topic);
            }
        }

        if (options.removeTopics !== undefined) {
            for (const topic of options.removeTopics) {
                args.push("--remove-topic", topic);
            }
        }

        if (options.allowForking) {
            args.push("--allow-forking");
        }

        if (options.allowUpdateBranch) {
            args.push("--allow-update-branch");
        }

        if (options.enableAdvancedSecurity === true) {
            args.push("--enable-advanced-security");
        } else if (options.enableAdvancedSecurity === false) {
            args.push("--enable-advanced-security=false");
        }

        if (options.enableAutoMerge === true) {
            args.push("--enable-auto-merge");
        } else if (options.enableAutoMerge === false) {
            args.push("--enable-auto-merge=false");
        }

        if (options.enableDiscussions === true) {
            args.push("--enable-discussions");
        } else if (options.enableDiscussions === false) {
            args.push("--enable-discussions=false");
        }

        if (options.enableIssues === true) {
            args.push("--enable-issues");
        } else if (options.enableIssues === false) {
            args.push("--enable-issues=false");
        }

        if (options.enableMergeCommit === true) {
            args.push("--enable-merge-commit");
        } else if (options.enableMergeCommit === false) {
            args.push("--enable-merge-commit=false");
        }

        if (options.enableProjects === true) {
            args.push("--enable-projects");
        } else if (options.enableProjects === false) {
            args.push("--enable-projects=false");
        }

        if (options.enableRebaseMerge === true) {
            args.push("--enable-rebase-merge");
        } else if (options.enableRebaseMerge === false) {
            args.push("--enable-rebase-merge=false");
        }

        if (options.enableSecretScanning === true) {
            args.push("--enable-secret-scanning");
        } else if (options.enableSecretScanning === false) {
            args.push("--enable-secret-scanning=false");
        }

        if (options.enableSecretScanningPushProtection === true) {
            args.push("--enable-secret-scanning-push-protection");
        } else if (options.enableSecretScanningPushProtection === false) {
            args.push("--enable-secret-scanning-push-protection=false");
        }

        if (options.enableSquashMerge === true) {
            args.push("--enable-squash-merge");
        } else if (options.enableSquashMerge === false) {
            args.push("--enable-squash-merge=false");
        }

        if (options.enableWiki === true) {
            args.push("--enable-wiki");
        } else if (options.enableWiki === false) {
            args.push("--enable-wiki=false");
        }

        if (options.squashMergeCommitMessage !== undefined) {
            args.push("--squash-merge-commit-message", options.squashMergeCommitMessage);
        }

        if (options.template) {
            args.push("--template");
        }

        await this.executor.run(args);
    }

    async delete(options: RepoDeleteOptions): Promise<void> {
        const args = ["repo", "delete", normalizeRepoRef(options.repo)];

        if (options.yes) {
            args.push("--yes");
        }

        await this.executor.run(args);
    }

    async archive(options: RepoArchiveOptions): Promise<void> {
        const args = ["repo", "archive", normalizeRepoRef(options.repo)];

        if (options.yes) {
            args.push("--yes");
        }

        await this.executor.run(args);
    }

    async unarchive(options: RepoUnarchiveOptions): Promise<void> {
        const args = ["repo", "unarchive", normalizeRepoRef(options.repo)];

        if (options.yes) {
            args.push("--yes");
        }

        await this.executor.run(args);
    }

    async sync(options: RepoSyncOptions): Promise<void> {
        const args = ["repo", "sync"];

        if (options.repo !== undefined) {
            args.push(normalizeRepoRef(options.repo));
        }

        if (options.source !== undefined) {
            args.push("--source", options.source);
        }

        if (options.branch !== undefined) {
            args.push("--branch", options.branch);
        }

        if (options.force) {
            args.push("--force");
        }

        await this.executor.run(args);
    }

    async rename(options: RepoRenameOptions): Promise<void> {
        const args = ["repo", "rename", options.newName, "--repo", normalizeRepoRef(options.repo)];

        if (options.yes) {
            args.push("--yes");
        }

        await this.executor.run(args);
    }

    async setDefault(options: RepoSetDefaultOptions): Promise<{ repo: string } | undefined> {
        const args = ["repo", "set-default"];

        if ("view" in options) {
            args.push("--view");
            const result = await this.executor.run(args);
            return { repo: parseDefaultRepo(result.stdout) };
        }

        if ("unset" in options) {
            args.push("--unset");
            await this.executor.run(args);
            return;
        }

        args.push(normalizeRepoRef(options.repo));
        await this.executor.run(args);
    }
}
