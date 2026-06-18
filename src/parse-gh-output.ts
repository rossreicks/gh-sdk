const URL_PATTERN = /https:\/\/[^\s]+/;

export function parseFirstUrl(stdout: string): string {
    const match = stdout.trim().match(URL_PATTERN);
    if (!match) {
        throw new TypeError("GitHub CLI output did not contain a URL.");
    }

    return match[0];
}

export function parseDefaultRepo(stdout: string): string {
    const trimmed = stdout.trim();
    if (!trimmed) {
        throw new TypeError("GitHub CLI output did not contain a default repository.");
    }

    return trimmed.split(/\s+/)[0] ?? trimmed;
}
