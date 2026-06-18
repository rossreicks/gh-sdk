# gh-sdk

A Node SDK for GitHub CLI. `gh-sdk` wraps selected [`gh`](https://cli.github.com/) commands with a TypeScript API while delegating authentication, permissions, and command behavior to GitHub CLI.

Full documentation: https://rossreicks.github.io/gh-sdk/

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

const prs = await gh.pr.list({
  repo: "cli/cli",
  state: "open",
  limit: 10,
  fields: ["number", "title", "url"],
});

for (const pr of prs) {
  console.log(`#${pr.number}`, pr.title, pr.url);
}
```

Repository inputs can be strings or objects:

```ts
await gh.repo.view({
  repo: { owner: "cli", name: "cli" },
  fields: ["name", "description", "url"],
});
```

## Development

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm docs:dev
pnpm docs:build
```

## License

MIT
