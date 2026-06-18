# gh-sdk

A Node SDK for GitHub CLI.

`gh-sdk` wraps selected [`gh`](https://cli.github.com/) commands with a typed TypeScript API. It does not replace GitHub's REST or GraphQL APIs; it assumes the GitHub CLI is installed and authenticated, then delegates to it.

## Requirements

- Node.js `>=20`
- `gh` installed and available on `PATH`
- `gh` authenticated for the repositories you access

## Install

```sh
pnpm add gh-sdk
```

## Usage

```ts
import { GhClient } from "gh-sdk";

const gh = new GhClient();

const repo = await gh.repo.view({
  repo: "cli/cli",
  fields: ["name", "description", "url"] as const,
});

const prs = await gh.pr.list({
  repo: { owner: "cli", name: "cli" },
  fields: ["number", "title", "url"] as const,
  state: "open",
  limit: 10,
});

const pr = await gh.pr.view({
  repo: "cli/cli",
  number: 1,
  fields: ["number", "title", "author", "url"] as const,
});
```

Field selections are typed. For example:

```ts
const prs = await gh.pr.list({
  repo: "cli/cli",
  fields: ["number", "title"] as const,
});
```

The return type is narrowed to:

```ts
Array<{
  number: number;
  title: string;
}>;
```

## Supported commands

Initial v1 surface:

- `gh.repo.view(...)` → `gh repo view <repo> --json ...`
- `gh.pr.list(...)` → `gh pr list --repo <repo> --json ...`
- `gh.pr.view(...)` → `gh pr view <number> --repo <repo> --json ...`

High-level methods require an explicit `repo` and do not infer repository context from `cwd`.

## Errors

Failed commands and JSON parsing failures throw `GhError`:

```ts
import { GhError } from "gh-sdk";

try {
  await gh.pr.view({ repo: "cli/cli", number: 1, fields: ["title"] as const });
} catch (error) {
  if (error instanceof GhError) {
    console.error(error.code);
    console.error(error.command);
    console.error(error.stderr);
  }
}
```

## Development

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm spike:gh-json-fields
```

## License

MIT
