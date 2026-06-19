import { parseFirstUrl } from "../parse-gh-output.js";
import { normalizeRepoRef } from "../repo-ref.js";
import type { GhExecutor, GhRunOptions } from "../runner.js";
import { joinFields, type PickFields } from "../types/fields.js";
import type { ReleaseListFieldMap, ReleaseViewFieldMap } from "../types/release.js";
import type {
    ReleaseCreateOptions,
    ReleaseDeleteAssetOptions,
    ReleaseDeleteOptions,
    ReleaseEditOptions,
    ReleaseListOptions,
    ReleaseUploadOptions,
    ReleaseViewOptions,
} from "./release.options.js";

export type {
    ReleaseCreateOptions,
    ReleaseDeleteAssetOptions,
    ReleaseDeleteOptions,
    ReleaseEditOptions,
    ReleaseListOptions,
    ReleaseUploadOptions,
    ReleaseViewOptions,
} from "./release.options.js";

function pushReleaseContentArgs(args: string[], options: ReleaseCreateOptions): void {
    if (options.discussionCategory !== undefined) {
        args.push("--discussion-category", options.discussionCategory);
    }
    if (options.draft) {
        args.push("--draft");
    }
    if (options.failOnNoCommits) {
        args.push("--fail-on-no-commits");
    }
    if (options.generateNotes) {
        args.push("--generate-notes");
    }
    if (options.latest === true) {
        args.push("--latest");
    } else if (options.latest === false) {
        args.push("--latest=false");
    }
    if (options.notes !== undefined) {
        args.push("--notes", options.notes);
    }
    if (options.notesFile !== undefined) {
        args.push("--notes-file", options.notesFile);
    }
    if (options.notesFromTag) {
        args.push("--notes-from-tag");
    }
    if (options.notesStartTag !== undefined) {
        args.push("--notes-start-tag", options.notesStartTag);
    }
    if (options.prerelease) {
        args.push("--prerelease");
    }
    if (options.target !== undefined) {
        args.push("--target", options.target);
    }
    if (options.title !== undefined) {
        args.push("--title", options.title);
    }
    if (options.verifyTag) {
        args.push("--verify-tag");
    }
}

export interface ReleaseCommands {
    list<Fields extends readonly (keyof ReleaseListFieldMap)[]>(
        options: ReleaseListOptions<Fields>,
    ): Promise<Array<PickFields<ReleaseListFieldMap, Fields>>>;
    view<Fields extends readonly (keyof ReleaseViewFieldMap)[]>(
        options: ReleaseViewOptions<Fields>,
    ): Promise<PickFields<ReleaseViewFieldMap, Fields>>;
    create(options: ReleaseCreateOptions): Promise<{ url: string }>;
    delete(options: ReleaseDeleteOptions): Promise<void>;
    deleteAsset(options: ReleaseDeleteAssetOptions): Promise<void>;
    edit(options: ReleaseEditOptions): Promise<void>;
    upload(options: ReleaseUploadOptions): Promise<void>;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: merge interface JSDocs onto the class for IDE hovers
export class ReleaseCommands {
    constructor(private readonly executor: GhExecutor) {}

    list<const Fields extends readonly (keyof ReleaseListFieldMap)[]>(
        options: ReleaseListOptions<Fields>,
    ): Promise<Array<PickFields<ReleaseListFieldMap, Fields>>> {
        const args = [
            "release",
            "list",
            "--repo",
            normalizeRepoRef(options.repo),
            "--json",
            joinFields(options.fields as readonly string[]),
        ];
        if (options.excludeDrafts) {
            args.push("--exclude-drafts");
        }
        if (options.excludePreReleases) {
            args.push("--exclude-pre-releases");
        }
        if (options.limit !== undefined) {
            args.push("--limit", String(options.limit));
        }
        if (options.order !== undefined) {
            args.push("--order", options.order);
        }
        return this.executor.json<Array<PickFields<ReleaseListFieldMap, Fields>>>(args);
    }

    view<const Fields extends readonly (keyof ReleaseViewFieldMap)[]>(
        options: ReleaseViewOptions<Fields>,
    ): Promise<PickFields<ReleaseViewFieldMap, Fields>> {
        const args = ["release", "view"];
        if (options.tag !== undefined) {
            args.push(options.tag);
        }
        args.push("--repo", normalizeRepoRef(options.repo), "--json", joinFields(options.fields as readonly string[]));
        return this.executor.json<PickFields<ReleaseViewFieldMap, Fields>>(args);
    }

    async create(options: ReleaseCreateOptions): Promise<{ url: string }> {
        const args = ["release", "create"];
        if (options.tag !== undefined) {
            args.push(options.tag);
        }
        if (options.files !== undefined) {
            args.push(...options.files);
        }
        args.push("--repo", normalizeRepoRef(options.repo));
        pushReleaseContentArgs(args, options);
        const runOptions: GhRunOptions = {};
        if (options.notesFile === "-" && options.notes !== undefined) {
            runOptions.input = options.notes;
        }
        const result = await this.executor.run(args, runOptions);
        return { url: parseFirstUrl(result.stdout) };
    }

    async delete(options: ReleaseDeleteOptions): Promise<void> {
        const args = ["release", "delete", options.tag, "--repo", normalizeRepoRef(options.repo)];
        if (options.cleanupTag) {
            args.push("--cleanup-tag");
        }
        if (options.yes) {
            args.push("--yes");
        }
        await this.executor.run(args);
    }

    async deleteAsset(options: ReleaseDeleteAssetOptions): Promise<void> {
        const args = [
            "release",
            "delete-asset",
            options.tag,
            options.assetName,
            "--repo",
            normalizeRepoRef(options.repo),
        ];
        if (options.yes) {
            args.push("--yes");
        }
        await this.executor.run(args);
    }

    async edit(options: ReleaseEditOptions): Promise<void> {
        const args = ["release", "edit", options.tag, "--repo", normalizeRepoRef(options.repo)];
        pushReleaseContentArgs(args, options);
        if (options.newTag !== undefined) {
            args.push("--tag", options.newTag);
        }
        const runOptions: GhRunOptions = {};
        if (options.notesFile === "-" && options.notes !== undefined) {
            runOptions.input = options.notes;
        }
        await this.executor.run(args, runOptions);
    }

    async upload(options: ReleaseUploadOptions): Promise<void> {
        const args = ["release", "upload", options.tag, ...options.files, "--repo", normalizeRepoRef(options.repo)];
        if (options.clobber) {
            args.push("--clobber");
        }
        await this.executor.run(args);
    }
}
