# Getting started

`gh-sdk` wraps selected [`gh`](https://cli.github.com/) commands with a TypeScript API. It assumes GitHub CLI is installed and authenticated, then delegates command execution to it.

## Requirements

- Node.js `>=20`
- `gh` installed and available on `PATH`
- `gh` authenticated for the repositories you access

## Install

```sh
pnpm add gh-sdk
```

## Create a client

```ts
import { GhClient } from "gh-sdk";

const gh = new GhClient();

const repo = await gh.repo.view({
  repo: "cli/cli",
  fields: ["name", "description", "url"],
});

console.log(repo.name, repo.url);
```

## Target a repository

Use a repository string:

```ts
await gh.pr.list({
  repo: "cli/cli",
  fields: ["number", "title", "url"],
});
```

Or use an object:

```ts
await gh.pr.list({
  repo: { owner: "cli", name: "cli" },
  fields: ["number", "title", "url"],
});
```

## Next steps

- Learn how [typed fields](./typed-fields.md) work.
- Browse the [pull request reference](../reference/pull-requests.md).
- Browse the [repository reference](../reference/repositories.md).
