# Workflows

Workflow methods live under `gh.workflow` and map to `gh workflow` subcommands.

## List workflows

Lists workflows in a repository.

### Example

```ts
const workflows = await gh.workflow.list({
  repo: "cli/cli",
  fields: ["id", "name", "path", "state"],
  limit: 20,
});
```

### Maps to

```sh
gh workflow list --repo cli/cli --json id,name,path,state --limit 20
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [Workflow fields](#workflow-fields). |
| `all` | `true` | Optional. Includes disabled workflows. |
| `limit` | Number | Optional. Maximum workflows to fetch. |

## Run a workflow

Creates a workflow dispatch event.

::: warning
This starts a workflow run.
:::

### Example

```ts
await gh.workflow.run({
  repo: "cli/cli",
  workflow: "ci.yml",
  ref: "main",
  fields: ["name=octocat"],
});
```

### Maps to

```sh
gh workflow run ci.yml --repo cli/cli --ref main --field name=octocat
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `workflow` | Workflow ID, name, or file name | Optional. Workflow to run. Omitted selects interactively in GitHub CLI. |
| `ref` | Branch or tag name | Optional. Git ref to run the workflow on. |
| `fields` | List of `key=value` strings | Optional. Adds typed input fields with `--field`. |
| `rawFields` | List of `key=value` strings | Optional. Adds raw input fields with `--raw-field`. |
| `json` | JSON string | Optional. Sends workflow inputs on stdin with `--json`. |

## Enable a workflow

Enables a workflow.

::: warning
This mutates workflow state.
:::

### Example

```ts
await gh.workflow.enable({
  repo: "cli/cli",
  workflow: "ci.yml",
});
```

### Maps to

```sh
gh workflow enable ci.yml --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `workflow` | Workflow ID, name, or file name | Optional. Workflow to enable. Omitted selects interactively in GitHub CLI. |

## Disable a workflow

Disables a workflow.

::: warning
This mutates workflow state.
:::

### Example

```ts
await gh.workflow.disable({
  repo: "cli/cli",
  workflow: "ci.yml",
});
```

### Maps to

```sh
gh workflow disable ci.yml --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `workflow` | Workflow ID, name, or file name | Optional. Workflow to disable. Omitted selects interactively in GitHub CLI. |

## Workflow fields

These field names can be used with `workflow.list`.

| Field | Returned value |
| --- | --- |
| `id` | Workflow database ID. |
| `name` | Workflow name. |
| `path` | Workflow file path. |
| `state` | Workflow state. |
