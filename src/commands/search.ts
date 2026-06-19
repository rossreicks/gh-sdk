import type { GhExecutor } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type {
    SearchCodeFieldMap,
    SearchCommitFieldMap,
    SearchIssueFieldMap,
    SearchPrFieldMap,
    SearchRepoFieldMap,
} from "../types/search.js";
import type {
    SearchBaseOptions,
    SearchCodeOptions,
    SearchCommitsOptions,
    SearchIssueFilterOptions,
    SearchIssuesOptions,
    SearchPrsOptions,
    SearchQuery,
    SearchReposOptions,
} from "./search.options.js";

export type {
    SearchArchived,
    SearchBaseOptions,
    SearchCodeOptions,
    SearchCommitsOptions,
    SearchIssueFilterOptions,
    SearchIssuesOptions,
    SearchOrder,
    SearchPrsOptions,
    SearchQuery,
    SearchReposOptions,
    SearchVisibility,
} from "./search.options.js";

function pushQuery(args: string[], query: SearchQuery | undefined): void {
    if (query === undefined) {
        return;
    }
    if (typeof query === "string") {
        args.push(query);
    } else {
        args.push(...query);
    }
}

function pushBase(args: string[], options: SearchBaseOptions): void {
    if (options.limit !== undefined) {
        args.push("--limit", String(options.limit));
    }
    if (options.order !== undefined) {
        args.push("--order", options.order);
    }
    if (options.sort !== undefined) {
        args.push("--sort", options.sort);
    }
    if (options.owners !== undefined) {
        for (const owner of options.owners) {
            args.push("--owner", owner);
        }
    }
    if (options.repos !== undefined) {
        for (const repo of options.repos) {
            args.push("--repo", repo);
        }
    }
    if (options.language !== undefined) {
        args.push("--language", options.language);
    }
    if (options.visibility !== undefined) {
        for (const visibility of options.visibility) {
            args.push("--visibility", visibility);
        }
    }
}

function pushRepeated(args: string[], flag: string, values: readonly string[] | undefined): void {
    if (values !== undefined) {
        for (const value of values) {
            args.push(flag, value);
        }
    }
}

function pushIssueFlags(args: string[], options: SearchIssueFilterOptions): void {
    if (options.app !== undefined) {
        args.push("--app", options.app);
    }
    if (options.archived !== undefined) {
        args.push("--archived", String(options.archived));
    }
    if (options.assignee !== undefined) {
        args.push("--assignee", options.assignee);
    }
    if (options.author !== undefined) {
        args.push("--author", options.author);
    }
    if (options.closed !== undefined) {
        args.push("--closed", options.closed);
    }
    if (options.commenter !== undefined) {
        args.push("--commenter", options.commenter);
    }
    if (options.comments !== undefined) {
        args.push("--comments", options.comments);
    }
    if (options.created !== undefined) {
        args.push("--created", options.created);
    }
    if (options.includePrs) {
        args.push("--include-prs");
    }
    if (options.interactions !== undefined) {
        args.push("--interactions", options.interactions);
    }
    if (options.involves !== undefined) {
        args.push("--involves", options.involves);
    }
    pushRepeated(args, "--label", options.labels);
    if (options.locked) {
        args.push("--locked");
    }
    pushRepeated(args, "--match", options.match);
    if (options.mentions !== undefined) {
        args.push("--mentions", options.mentions);
    }
    if (options.milestone !== undefined) {
        args.push("--milestone", options.milestone);
    }
    if (options.noAssignee) {
        args.push("--no-assignee");
    }
    if (options.noLabel) {
        args.push("--no-label");
    }
    if (options.noMilestone) {
        args.push("--no-milestone");
    }
    if (options.noProject) {
        args.push("--no-project");
    }
    if (options.project !== undefined) {
        args.push("--project", options.project);
    }
    if (options.reactions !== undefined) {
        args.push("--reactions", options.reactions);
    }
    if (options.state !== undefined) {
        args.push("--state", options.state);
    }
    if (options.teamMentions !== undefined) {
        args.push("--team-mentions", options.teamMentions);
    }
    if (options.updated !== undefined) {
        args.push("--updated", options.updated);
    }
}

export interface SearchCommands {
    repos<Fields extends readonly (keyof SearchRepoFieldMap)[]>(
        options: SearchReposOptions<Fields>,
    ): Promise<Array<PickFields<SearchRepoFieldMap, Fields>>>;
    issues<Fields extends readonly (keyof SearchIssueFieldMap)[]>(
        options: SearchIssuesOptions<Fields>,
    ): Promise<Array<PickFields<SearchIssueFieldMap, Fields>>>;
    prs<Fields extends readonly (keyof SearchPrFieldMap)[]>(
        options: SearchPrsOptions<Fields>,
    ): Promise<Array<PickFields<SearchPrFieldMap, Fields>>>;
    code<Fields extends readonly (keyof SearchCodeFieldMap)[]>(
        options: SearchCodeOptions<Fields>,
    ): Promise<Array<PickFields<SearchCodeFieldMap, Fields>>>;
    commits<Fields extends readonly (keyof SearchCommitFieldMap)[]>(
        options: SearchCommitsOptions<Fields>,
    ): Promise<Array<PickFields<SearchCommitFieldMap, Fields>>>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class SearchCommands {
    constructor(private readonly executor: GhExecutor) {}

    repos<const Fields extends readonly (keyof SearchRepoFieldMap)[]>(
        options: SearchReposOptions<Fields>,
    ): Promise<Array<PickFields<SearchRepoFieldMap, Fields>>> {
        const args = ["search", "repos"];
        pushQuery(args, options.query);
        args.push("--json", joinFields(options.fields as readonly string[]));
        pushBase(args, options);
        if (options.archived !== undefined) {
            args.push("--archived", String(options.archived));
        }
        if (options.created !== undefined) {
            args.push("--created", options.created);
        }
        if (options.followers !== undefined) {
            args.push("--followers", options.followers);
        }
        if (options.forks !== undefined) {
            args.push("--forks", options.forks);
        }
        if (options.goodFirstIssues !== undefined) {
            args.push("--good-first-issues", options.goodFirstIssues);
        }
        if (options.helpWantedIssues !== undefined) {
            args.push("--help-wanted-issues", options.helpWantedIssues);
        }
        if (options.includeForks !== undefined) {
            args.push("--include-forks", options.includeForks);
        }
        pushRepeated(args, "--license", options.licenses);
        pushRepeated(args, "--match", options.match);
        if (options.numberTopics !== undefined) {
            args.push("--number-topics", options.numberTopics);
        }
        if (options.size !== undefined) {
            args.push("--size", options.size);
        }
        if (options.stars !== undefined) {
            args.push("--stars", options.stars);
        }
        pushRepeated(args, "--topic", options.topics);
        if (options.updated !== undefined) {
            args.push("--updated", options.updated);
        }
        return this.executor.json<Array<PickFields<SearchRepoFieldMap, Fields>>>(args);
    }

    issues<const Fields extends readonly (keyof SearchIssueFieldMap)[]>(
        options: SearchIssuesOptions<Fields>,
    ): Promise<Array<PickFields<SearchIssueFieldMap, Fields>>> {
        const args = ["search", "issues"];
        pushQuery(args, options.query);
        args.push("--json", joinFields(options.fields as readonly string[]));
        pushBase(args, options);
        pushIssueFlags(args, options);
        return this.executor.json<Array<PickFields<SearchIssueFieldMap, Fields>>>(args);
    }

    prs<const Fields extends readonly (keyof SearchPrFieldMap)[]>(
        options: SearchPrsOptions<Fields>,
    ): Promise<Array<PickFields<SearchPrFieldMap, Fields>>> {
        const args = ["search", "prs"];
        pushQuery(args, options.query);
        args.push("--json", joinFields(options.fields as readonly string[]));
        pushBase(args, options);
        pushIssueFlags(args, options);
        if (options.base !== undefined) {
            args.push("--base", options.base);
        }
        if (options.checks !== undefined) {
            args.push("--checks", options.checks);
        }
        if (options.draft) {
            args.push("--draft");
        }
        if (options.head !== undefined) {
            args.push("--head", options.head);
        }
        if (options.merged) {
            args.push("--merged");
        }
        if (options.mergedAt !== undefined) {
            args.push("--merged-at", options.mergedAt);
        }
        if (options.review !== undefined) {
            args.push("--review", options.review);
        }
        if (options.reviewRequested !== undefined) {
            args.push("--review-requested", options.reviewRequested);
        }
        if (options.reviewedBy !== undefined) {
            args.push("--reviewed-by", options.reviewedBy);
        }
        return this.executor.json<Array<PickFields<SearchPrFieldMap, Fields>>>(args);
    }

    code<const Fields extends readonly (keyof SearchCodeFieldMap)[]>(
        options: SearchCodeOptions<Fields>,
    ): Promise<Array<PickFields<SearchCodeFieldMap, Fields>>> {
        const args = ["search", "code"];
        pushQuery(args, options.query);
        args.push("--json", joinFields(options.fields as readonly string[]));
        pushBase(args, options);
        if (options.extension !== undefined) {
            args.push("--extension", options.extension);
        }
        if (options.filename !== undefined) {
            args.push("--filename", options.filename);
        }
        pushRepeated(args, "--match", options.match);
        if (options.size !== undefined) {
            args.push("--size", options.size);
        }
        return this.executor.json<Array<PickFields<SearchCodeFieldMap, Fields>>>(args);
    }

    commits<const Fields extends readonly (keyof SearchCommitFieldMap)[]>(
        options: SearchCommitsOptions<Fields>,
    ): Promise<Array<PickFields<SearchCommitFieldMap, Fields>>> {
        const args = ["search", "commits"];
        pushQuery(args, options.query);
        args.push("--json", joinFields(options.fields as readonly string[]));
        pushBase(args, options);
        if (options.author !== undefined) {
            args.push("--author", options.author);
        }
        if (options.authorDate !== undefined) {
            args.push("--author-date", options.authorDate);
        }
        if (options.authorEmail !== undefined) {
            args.push("--author-email", options.authorEmail);
        }
        if (options.authorName !== undefined) {
            args.push("--author-name", options.authorName);
        }
        if (options.committer !== undefined) {
            args.push("--committer", options.committer);
        }
        if (options.committerDate !== undefined) {
            args.push("--committer-date", options.committerDate);
        }
        if (options.committerEmail !== undefined) {
            args.push("--committer-email", options.committerEmail);
        }
        if (options.committerName !== undefined) {
            args.push("--committer-name", options.committerName);
        }
        if (options.hash !== undefined) {
            args.push("--hash", options.hash);
        }
        if (options.merge) {
            args.push("--merge");
        }
        if (options.parent !== undefined) {
            args.push("--parent", options.parent);
        }
        if (options.tree !== undefined) {
            args.push("--tree", options.tree);
        }
        return this.executor.json<Array<PickFields<SearchCommitFieldMap, Fields>>>(args);
    }
}
