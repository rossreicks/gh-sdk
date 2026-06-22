# Issues

Issue methods live under `gh.issue` and map to `gh issue` subcommands.

## List issues

Lists issues in a repository.

### Example

```ts
const issues = await gh.issue.list({
  repo: "cli/cli",
  state: "open",
  limit: 10,
  fields: ["number", "title", "url", "author"],
});
```

### Maps to

```sh
gh issue list --repo cli/cli --state open --limit 10 --json number,title,url,author
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [Issue fields](#issue-fields). |
| `state` | `open`, `closed`, `all` | Optional. Filters by state. |
| `limit` | Number | Optional. Maximum issues to fetch. |
| `app` | GitHub App name | Optional. Filters by GitHub App author. |
| `assignee` | GitHub username | Optional. Filters by assignee. |
| `author` | GitHub username | Optional. Filters by author. |
| `labels` | List of label names | Optional. All labels must match. |
| `mention` | GitHub username | Optional. Filters by mentioned user. |
| `milestone` | Milestone name or number | Optional. Filters by milestone. |
| `search` | GitHub search query | Optional. Passed to `gh issue list --search`. |

## View an issue

Views one issue.

### Example

```ts
const issue = await gh.issue.view({
  repo: "cli/cli",
  issue: 123,
  fields: ["number", "title", "author", "url"],
});
```

### Maps to

```sh
gh issue view 123 --repo cli/cli --json number,title,author,url
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to view. |
| `fields` | List of field names | Required. See [Issue fields](#issue-fields). |
| `comments` | `true` | Optional. Includes issue comments. |

## Check issue status

Shows status for relevant issues.

### Example

```ts
const status = await gh.issue.status({
  repo: "cli/cli",
  fields: ["number", "title", "url", "state"],
});
```

### Maps to

```sh
gh issue status --repo cli/cli --json number,title,url,state
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [Issue fields](#issue-fields). |

## Create an issue

Creates an issue and returns its URL.

### Example

```ts
const created = await gh.issue.create({
  repo: "cli/cli",
  title: "Fix login bug",
  body: "Details about the bug.",
  labels: ["bug"],
});

console.log(created.url);
```

### Maps to

```sh
gh issue create --repo cli/cli --title 'Fix login bug' --body 'Details about the bug.' --label bug
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `title` | Text | Optional. Issue title. |
| `body` | Text | Optional. Issue body. |
| `bodyFile` | File path, or `-` | Optional. Reads body from a file or stdin. |
| `assignees` | List of usernames | Optional. Assigns users. |
| `labels` | List of label names | Optional. Adds labels. |
| `milestone` | Milestone name | Optional. Adds milestone. |
| `project` | Project title | Optional. Adds to project. |
| `recover` | Recovery token | Optional. Recovers from a failed create. |
| `template` | Template name | Optional. Uses an issue template. |

## Close an issue

Closes an issue.

::: warning
This mutates issue state.
:::

### Example

```ts
await gh.issue.close({
  repo: "cli/cli",
  issue: 123,
  reason: "completed",
  comment: "Fixed.",
});
```

### Maps to

```sh
gh issue close 123 --repo cli/cli --comment Fixed. --reason completed
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to close. |
| `comment` | Text | Optional. Closing comment. |
| `duplicateOf` | Issue number or URL | Optional. Marks as duplicate of another issue. |
| `reason` | `completed`, `not planned`, `duplicate` | Optional. Close reason. |

## Comment on an issue

Adds, edits, or deletes an issue comment.

### Example

```ts
await gh.issue.comment({
  repo: "cli/cli",
  issue: 123,
  body: "Thanks for the report.",
});
```

### Maps to

```sh
gh issue comment 123 --repo cli/cli --body 'Thanks for the report.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to comment on. |
| `body` | Text | Optional. Comment body. |
| `bodyFile` | File path, or `-` | Optional. Reads comment body from a file or stdin. |
| `createIfNone` | `true` | Optional. Creates a new comment when editing and none exists. |
| `deleteLast` | `true` | Optional. Deletes the last comment by the current user. |
| `editLast` | `true` | Optional. Edits the last comment by the current user. |
| `yes` | `true` | Optional. Skips delete confirmation when `deleteLast` is used. |

## Delete an issue

Deletes an issue.

::: danger
This deletes an issue. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.issue.delete({
  repo: "cli/cli",
  issue: 123,
  yes: true,
});
```

### Maps to

```sh
gh issue delete 123 --repo cli/cli --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to delete. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Develop an issue

Manages a linked branch for an issue.

### Example

```ts
await gh.issue.develop({
  repo: "cli/cli",
  issue: 123,
  name: "fix-login-bug",
  checkout: true,
});
```

### Maps to

```sh
gh issue develop 123 --repo cli/cli --checkout --name fix-login-bug
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to develop. |
| `base` | Branch name | Optional. Base branch for the new branch. |
| `branchRepo` | `owner/repo` | Optional. Repository for the branch. |
| `checkout` | `true` | Optional. Checks out the branch locally. |
| `list` | `true` | Optional. Lists linked branches. |
| `name` | Branch name | Optional. Name for the branch. |

## Edit an issue

Edits an issue.

::: warning
This mutates issue metadata.
:::

### Example

```ts
await gh.issue.edit({
  repo: "cli/cli",
  issue: 123,
  title: "Improve error handling",
  addLabels: ["maintenance"],
});
```

### Maps to

```sh
gh issue edit 123 --repo cli/cli --title 'Improve error handling' --add-label maintenance
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to edit. |
| `title` | Text | Optional. New title. |
| `body` | Text | Optional. New body. |
| `bodyFile` | File path, or `-` | Optional. Reads body from file or stdin. |
| `milestone` | Milestone name | Optional. Sets milestone. |
| `removeMilestone` | `true` | Optional. Removes milestone. |
| `addAssignees`, `removeAssignees` | List of usernames | Optional. Changes assignees. |
| `addLabels`, `removeLabels` | List of label names | Optional. Changes labels. |
| `addProjects`, `removeProjects` | List of project titles | Optional. Changes projects. |

## Lock an issue conversation

Locks an issue conversation.

::: warning
This mutates issue conversation state.
:::

### Example

```ts
await gh.issue.lock({
  repo: "cli/cli",
  issue: 123,
  reason: "resolved",
});
```

### Maps to

```sh
gh issue lock 123 --repo cli/cli --reason resolved
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to lock. |
| `reason` | `off_topic`, `resolved`, `spam`, `too_heated` | Optional. Lock reason. |

## Unlock an issue conversation

Unlocks an issue conversation.

::: warning
This mutates issue conversation state.
:::

### Example

```ts
await gh.issue.unlock({
  repo: "cli/cli",
  issue: 123,
});
```

### Maps to

```sh
gh issue unlock 123 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to unlock. |

## Pin an issue

Pins an issue.

::: warning
This mutates issue metadata.
:::

### Example

```ts
await gh.issue.pin({ repo: "cli/cli", issue: 123 });
```

### Maps to

```sh
gh issue pin 123 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to pin. |

## Unpin an issue

Unpins an issue.

::: warning
This mutates issue metadata.
:::

### Example

```ts
await gh.issue.unpin({ repo: "cli/cli", issue: 123 });
```

### Maps to

```sh
gh issue unpin 123 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to unpin. |

## Reopen an issue

Reopens an issue.

::: warning
This mutates issue state.
:::

### Example

```ts
await gh.issue.reopen({
  repo: "cli/cli",
  issue: 123,
  comment: "Reopening for another look.",
});
```

### Maps to

```sh
gh issue reopen 123 --repo cli/cli --comment 'Reopening for another look.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `issue` | Issue number or URL | Required. Issue to reopen. |
| `comment` | Text | Optional. Reopening comment. |

## Transfer an issue

Transfers an issue to another repository.

::: warning
This mutates issue ownership.
:::

### Example

```ts
await gh.issue.transfer({
  repo: "cli/cli",
  issue: 123,
  destinationRepo: "octocat/example",
});
```

### Maps to

```sh
gh issue transfer 123 octocat/example --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Current repository. |
| `issue` | Issue number or URL | Required. Issue to transfer. |
| `destinationRepo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Destination repository. |

## Issue fields

These field names can be used with `issue.list`, `issue.view`, and `issue.status`.

| Field | Returned value |
| --- | --- |
| `assignees` | Assigned user data from `gh`. |
| `author` | Author user object, or `null`. |
| `body` | Issue body Markdown. |
| `closed` | Whether the issue is closed. |
| `closedAt` | ISO timestamp string, or `null`. |
| `closedByPullRequestsReferences` | Closing pull request reference data from `gh`. |
| `comments` | Comment data from `gh`. |
| `createdAt` | ISO timestamp string. |
| `id` | GitHub node ID. |
| `isPinned` | Whether the issue is pinned. |
| `labels` | Label data from `gh`. |
| `milestone` | Milestone data from `gh`. |
| `number` | Issue number. |
| `projectCards` | Project card data from `gh`. |
| `projectItems` | Project item data from `gh`. |
| `reactionGroups` | Reaction group data from `gh`. |
| `state` | Issue state, such as `OPEN` or `CLOSED`. |
| `stateReason` | State reason string, or `null`. |
| `title` | Issue title. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |
