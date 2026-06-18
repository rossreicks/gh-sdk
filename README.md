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
  pr: 1,
  fields: ["number", "title", "author", "url"] as const,
});

const created = await gh.pr.create({
  repo: "cli/cli",
  title: "Fix bug",
  body: "Details here",
});
console.log(created.url);

await gh.pr.merge({ repo: "cli/cli", pr: 42, strategy: "squash" });

const repos = await gh.repo.list({
  owner: "cli",
  fields: ["nameWithOwner", "url"] as const,
  limit: 5,
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

All top-level `gh pr` and `gh repo` subcommands are wrapped with typed options. Every method requires an explicit `repo` where the CLI supports `--repo` and does not infer repository context from `cwd`.

### Pull requests (`gh.pr`)

| Method | Maps to |
|--------|---------|
| `create` | `gh pr create` |
| `list` | `gh pr list --json ...` |
| `view` | `gh pr view --json ...` |
| `status` | `gh pr status --json ...` |
| `checks` | `gh pr checks --json ...` |
| `close` | `gh pr close` |
| `comment` | `gh pr comment` |
| `edit` | `gh pr edit` |
| `merge` | `gh pr merge` |
| `review` | `gh pr review` |
| `ready` | `gh pr ready` |
| `reopen` | `gh pr reopen` |
| `revert` | `gh pr revert` |
| `updateBranch` | `gh pr update-branch` |
| `lock` / `unlock` | `gh pr lock` / `gh pr unlock` |

### Repositories (`gh.repo`)

| Method | Maps to |
|--------|---------|
| `create` | `gh repo create` |
| `list` | `gh repo list --json ...` |
| `view` | `gh repo view --json ...` |
| `edit` | `gh repo edit` |
| `delete` | `gh repo delete` |
| `archive` / `unarchive` | `gh repo archive` / `gh repo unarchive` |
| `sync` | `gh repo sync` |
| `rename` | `gh repo rename` |
| `setDefault` | `gh repo set-default` |

### Excluded

- Git/filesystem operations: `pr checkout`, `pr diff`, `repo clone`, `repo fork`
- Nested repo groups: `autolink`, `deploy-key`, `gitignore`, `license`
- Interactive/browser/long-poll flags: `--web`, `--editor`, `--watch`, and git-related `repo create` flags (`--clone`, `--push`)

## Errors

Failed commands and JSON parsing failures throw `GhError`:

```ts
import { GhError } from "gh-sdk";

try {
  await gh.pr.view({ repo: "cli/cli", pr: 1, fields: ["title"] as const });
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
