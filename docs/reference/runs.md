# Workflow runs

Workflow run methods live under `gh.run` and map to `gh run` subcommands.

## List runs

Lists workflow runs in a repository.

### Example

```ts
const runs = await gh.run.list({
  repo: "cli/cli",
  workflow: "ci.yml",
  limit: 10,
  fields: ["databaseId", "status", "conclusion", "url"],
});
```

### Maps to

```sh
gh run list --repo cli/cli --json databaseId,status,conclusion,url --workflow ci.yml --limit 10
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [Run fields](#run-fields). |
| `all` | `true` | Optional. Includes disabled workflows. |
| `branch` | Branch name | Optional. Filters by branch. |
| `commit` | Commit SHA | Optional. Filters by commit SHA. |
| `created` | Date expression | Optional. Filters by created date. |
| `event` | Event name | Optional. Filters by event. |
| `limit` | Number | Optional. Maximum runs to fetch. |
| `status` | Run status | Optional. Filters by status or conclusion. |
| `user` | GitHub username | Optional. Filters by triggering user. |
| `workflow` | Workflow name or file name | Optional. Filters by workflow. |

## View a run

Views one workflow run.

### Example

```ts
const run = await gh.run.view({
  repo: "cli/cli",
  runId: 123456789,
  fields: ["databaseId", "status", "conclusion", "url"],
});
```

### Maps to

```sh
gh run view 123456789 --repo cli/cli --json databaseId,status,conclusion,url
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `runId` | Run ID | Optional. Omitted selects a run interactively in GitHub CLI. |
| `fields` | List of field names | Required. See [Run fields](#run-fields). |
| `attempt` | Number | Optional. Shows a specific attempt. |
| `exitStatus` | `true` | Optional. Exits non-zero if the run failed. |
| `job` | Job ID | Optional. Views a specific job. |
| `verbose` | `true` | Optional. Includes more job details. |

## Cancel a run

Cancels a workflow run.

::: warning
This mutates workflow run state.
:::

### Example

```ts
await gh.run.cancel({
  repo: "cli/cli",
  runId: 123456789,
});
```

### Maps to

```sh
gh run cancel 123456789 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `runId` | Run ID | Optional. Omitted selects a run interactively in GitHub CLI. |
| `force` | `true` | Optional. Bypasses confirmation prompt. |

## Delete a run

Deletes a workflow run.

::: danger
This deletes a workflow run.
:::

### Example

```ts
await gh.run.delete({
  repo: "cli/cli",
  runId: 123456789,
});
```

### Maps to

```sh
gh run delete 123456789 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `runId` | Run ID | Optional. Omitted selects a run interactively in GitHub CLI. |

## Rerun a run

Reruns a workflow run.

::: warning
This creates a new workflow run attempt.
:::

### Example

```ts
await gh.run.rerun({
  repo: "cli/cli",
  runId: 123456789,
  failed: true,
});
```

### Maps to

```sh
gh run rerun 123456789 --repo cli/cli --failed
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `runId` | Run ID | Optional. Omitted selects a run interactively in GitHub CLI. |
| `debug` | `true` | Optional. Reruns with debug logging. |
| `failed` | `true` | Optional. Reruns only failed jobs. |
| `job` | Job ID | Optional. Reruns a specific job. |

## Watch a run

Watches a workflow run until completion.

### Example

```ts
await gh.run.watch({
  repo: "cli/cli",
  runId: 123456789,
  exitStatus: true,
});
```

### Maps to

```sh
gh run watch 123456789 --repo cli/cli --exit-status
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `runId` | Run ID | Required. Run to watch. |
| `compact` | `true` | Optional. Shows compact output. |
| `exitStatus` | `true` | Optional. Exits non-zero if the run fails. |
| `interval` | Number of seconds | Optional. Refresh interval. |

## Run fields

These field names can be used with `run.list` and `run.view`.

| Field | Returned value |
| --- | --- |
| `attempt` | Attempt number. |
| `conclusion` | Run conclusion, or `null`. |
| `createdAt` | ISO timestamp string. |
| `databaseId` | GitHub database ID. |
| `displayTitle` | Display title. |
| `event` | Triggering event. |
| `headBranch` | Head branch name. |
| `headSha` | Head commit SHA. |
| `jobs` | Job data from `gh`. |
| `name` | Run name. |
| `number` | Run number. |
| `startedAt` | ISO timestamp string. |
| `status` | Run status. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |
| `workflowDatabaseId` | Workflow database ID. |
| `workflowName` | Workflow name. |
