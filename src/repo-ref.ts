export type RepoRef = string | { owner: string; name: string };

export function normalizeRepoRef(repo: RepoRef): string {
    if (typeof repo === "string") {
        const normalized = repo.trim();
        if (!isValidRepoString(normalized)) {
            throw new TypeError('repo must use the "owner/name" format.');
        }
        return normalized;
    }

    const owner = repo.owner.trim();
    const name = repo.name.trim();

    if (!owner || !name || owner.includes("/") || name.includes("/")) {
        throw new TypeError('repo object must include non-empty owner and name values without "/".');
    }

    return `${owner}/${name}`;
}

function isValidRepoString(repo: string): boolean {
    const parts = repo.split("/");
    return parts.length === 2 && parts.every((part) => part.length > 0);
}
