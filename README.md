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

## Supported command groups

`gh-sdk` currently wraps low-friction, API-shaped GitHub CLI commands in these namespaces:

- `gh.repo`
- `gh.pr`
- `gh.issue`
- `gh.release`
- `gh.run`
- `gh.workflow`
- `gh.label`
- `gh.search`
- `gh.secret`
- `gh.sshKey`
- `gh.gpgKey`

Structured read methods use `gh --json` where available. Text-only SSH and GPG key list commands return `{ data: { stdout } }`.

## Unsupported commands / future enhancements

Some `gh` commands intentionally remain unsupported until they have a clearer SDK contract:

- `gist`: mostly text output and file/clone/edit flows that need a separate filesystem/output design.
- `licenses`: top-level text-only output. This could later return `{ data: { stdout } }` if useful.
- `release download` and `run download`: filesystem-output commands.
- `run view --log`, `run view --log-failed`, and `workflow view --yaml`: text/log/YAML output commands.
- `release verify` and `release verify-asset`: attestation-specific output that should get dedicated result types.
- Browser/editor/formatting flows such as `--web`, `--editor`, `--jq`, `--template`, and highly interactive commands.

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
