# Pull requests

Pull request methods live under `gh.pr` and map to `gh pr` subcommands.

## List PRs

Lists pull requests in a repository.

### Example

```ts
const prs = await gh.pr.list({
  repo: "cli/cli",
  state: "open",
  limit: 10,
  fields: ["number", "title", "url", "author"],
});
```

### Maps to

```sh
gh pr list --repo cli/cli --state open --limit 10 --json number,title,url,author
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [PR fields](#pr-fields). |
| `state` | `open`, `closed`, `merged`, `all` | Optional. Filters by state. |
| `limit` | Number | Optional. Maximum PRs to fetch. |
| `app` | GitHub App name | Optional. Filters by GitHub App author. |
| `assignee` | GitHub username | Optional. Filters by assignee. |
| `author` | GitHub username | Optional. Filters by author. |
| `base` | Branch name | Optional. Filters by base branch. |
| `draft` | `true` | Optional. Only includes draft PRs. |
| `head` | Branch name | Optional. GitHub CLI does not support `<owner>:<branch>` syntax here. |
| `labels` | List of label names | Optional. All labels must match. |
| `search` | GitHub search query | Optional. Passed to `gh pr list --search`. |

## View a PR

Views one pull request.

### Example

```ts
const pr = await gh.pr.view({
  repo: "cli/cli",
  pr: 123,
  fields: ["number", "title", "author", "url"],
});
```

### Maps to

```sh
gh pr view 123 --repo cli/cli --json number,title,author,url
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Required. Pull request to view. |
| `fields` | List of field names | Required. See [PR fields](#pr-fields). |
| `comments` | `true` | Optional. Includes PR comments. |

## Check PR status

Shows status for relevant pull requests.

### Example

```ts
const status = await gh.pr.status({
  repo: "cli/cli",
  fields: ["number", "title", "url", "state"],
  conflictStatus: true,
});
```

### Maps to

```sh
gh pr status --repo cli/cli --conflict-status --json number,title,url,state
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [PR fields](#pr-fields). |
| `conflictStatus` | `true` | Optional. Displays merge conflict status. |

## Check PR CI

Shows CI status for a pull request.

### Example

```ts
const checks = await gh.pr.checks({
  repo: "cli/cli",
  pr: 123,
  required: true,
  allowPending: true,
  fields: ["name", "state", "bucket", "link"],
});
```

### Maps to

```sh
gh pr checks 123 --repo cli/cli --required --json name,state,bucket,link
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Optional. Omitted selects the current branch PR. |
| `fields` | List of field names | Required. See [PR check fields](#pr-check-fields). |
| `required` | `true` | Optional. Only shows required checks. |
| `allowPending` | `true` | Optional SDK behavior. Allows `gh pr checks` exit code 8 when checks are pending. |

## Create a PR

Creates a pull request and returns its URL.

### Example

```ts
const created = await gh.pr.create({
  repo: "cli/cli",
  title: "Fix login bug",
  body: "Details about the fix.",
  base: "main",
  head: "fix/login-bug",
  labels: ["bug"],
});

console.log(created.url);
```

### Maps to

```sh
gh pr create --repo cli/cli --title 'Fix login bug' --body 'Details about the fix.' --base main --head fix/login-bug --label bug
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `title` | Text | Optional. PR title. |
| `body` | Text | Optional. PR body. |
| `bodyFile` | File path, or `-` | Optional. Reads PR body from a file or stdin. |
| `base` | Branch name | Optional. Target branch. |
| `head` | Branch name | Optional. Source branch. |
| `draft` | `true` | Optional. Creates a draft PR. |
| `dryRun` | `true` | Optional. Prints details instead of creating the PR. May still push git changes. |
| `fill`, `fillFirst`, `fillVerbose` | `true` | Optional. Uses commit information for title/body. |
| `assignees` | List of usernames | Optional. Assigns users. |
| `labels` | List of label names | Optional. Adds labels. |
| `milestone` | Milestone name | Optional. Adds milestone. |
| `project` | Project title | Optional. Adds to project. |
| `reviewers` | List of handles | Optional. Requests reviews. |
| `template` | File path | Optional. Template file. |
| `noMaintainerEdit` | `true` | Optional. Disables maintainer edits. |
| `recover` | Recovery token | Optional. Recovers from a failed create. |

## Close a PR

Closes a pull request.

::: warning
This mutates pull request state.
:::

### Example

```ts
await gh.pr.close({
  repo: "cli/cli",
  pr: 123,
  comment: "Closing in favor of a newer PR.",
});
```

### Maps to

```sh
gh pr close 123 --repo cli/cli --comment 'Closing in favor of a newer PR.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Required. Pull request to close. |
| `comment` | Text | Optional. Closing comment. |
| `deleteBranch` | `true` | Optional. Deletes local and remote branch after close. |

## Comment on a PR

Adds, edits, or deletes a pull request comment.

### Example

```ts
await gh.pr.comment({
  repo: "cli/cli",
  pr: 123,
  body: "Thanks for the update.",
});
```

### Maps to

```sh
gh pr comment 123 --repo cli/cli --body 'Thanks for the update.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Required. Pull request to comment on. |
| `body` | Text | Optional. Comment body. |
| `bodyFile` | File path, or `-` | Optional. Reads comment body from a file or stdin. |
| `createIfNone` | `true` | Optional. Creates a new comment when editing and none exists. |
| `deleteLast` | `true` | Optional. Deletes the last comment by the current user. |
| `editLast` | `true` | Optional. Edits the last comment by the current user. |
| `yes` | `true` | Optional. Skips delete confirmation when `deleteLast` is used. |

## Edit a PR

Edits a pull request.

::: warning
This mutates pull request metadata.
:::

### Example

```ts
await gh.pr.edit({
  repo: "cli/cli",
  pr: 123,
  title: "Improve error handling",
  addLabels: ["maintenance"],
  addReviewers: ["octocat"],
});
```

### Maps to

```sh
gh pr edit 123 --repo cli/cli --title 'Improve error handling' --add-label maintenance --add-reviewer octocat
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Required. Pull request to edit. |
| `title` | Text | Optional. New title. |
| `body` | Text | Optional. New body. |
| `bodyFile` | File path, or `-` | Optional. Reads body from a file or stdin. |
| `base` | Branch name | Optional. Changes base branch. |
| `milestone` | Milestone name | Optional. Sets milestone. |
| `removeMilestone` | `true` | Optional. Removes milestone. |
| `addAssignees`, `removeAssignees` | List of usernames | Optional. Changes assignees. |
| `addLabels`, `removeLabels` | List of label names | Optional. Changes labels. |
| `addProjects`, `removeProjects` | List of project titles | Optional. Changes projects. |
| `addReviewers`, `removeReviewers` | List of handles | Optional. Changes reviewers. |

## Merge a PR

Merges a pull request.

::: warning
This mutates repository history and pull request state.
:::

### Example

```ts
await gh.pr.merge({
  repo: "cli/cli",
  pr: 123,
  strategy: "squash",
  deleteBranch: true,
});
```

### Maps to

```sh
gh pr merge 123 --repo cli/cli --squash --delete-branch
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Optional. Omitted selects the current branch PR. |
| `strategy` | `merge`, `rebase`, `squash` | Optional. Merge strategy. |
| `admin` | `true` | Optional. Uses administrator privileges. |
| `auto` | `true` | Optional. Enables auto-merge. |
| `disableAuto` | `true` | Optional. Disables auto-merge. |
| `deleteBranch` | `true` | Optional. Deletes branch after merge. |
| `body` | Text | Optional. Merge commit body. |
| `bodyFile` | File path, or `-` | Optional. Reads merge body from file or stdin. |
| `subject` | Text | Optional. Merge commit subject. |
| `authorEmail` | Email address | Optional. Merge commit author email. |
| `matchHeadCommit` | Commit SHA | Optional. Requires PR head to match the SHA. |

## Review a PR

Adds a review to a pull request.

### Example

```ts
await gh.pr.review({
  repo: "cli/cli",
  pr: 123,
  approve: true,
  body: "Looks good.",
});
```

### Maps to

```sh
gh pr review 123 --repo cli/cli --approve --body 'Looks good.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Optional. Omitted selects the current branch PR. |
| `approve` | `true` | Optional. Approves the PR. |
| `comment` | `true` | Optional. Comments on the PR. |
| `requestChanges` | `true` | Optional. Requests changes. |
| `body` | Text | Optional. Review body. |
| `bodyFile` | File path, or `-` | Optional. Reads review body from file or stdin. |

## Mark a PR ready for review

Marks a pull request ready for review, or converts it back to draft.

### Example

```ts
await gh.pr.ready({
  repo: "cli/cli",
  pr: 123,
});
```

### Maps to

```sh
gh pr ready 123 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Optional. Omitted selects the current branch PR. |
| `undo` | `true` | Optional. Converts the PR to draft. |

## Reopen a PR

Reopens a pull request.

::: warning
This mutates pull request state.
:::

### Example

```ts
await gh.pr.reopen({
  repo: "cli/cli",
  pr: 123,
  comment: "Reopening for another look.",
});
```

### Maps to

```sh
gh pr reopen 123 --repo cli/cli --comment 'Reopening for another look.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Required. Pull request to reopen. |
| `comment` | Text | Optional. Reopening comment. |

## Revert a PR

Reverts a pull request by creating a revert pull request.

::: warning
This creates a new pull request.
:::

### Example

```ts
const reverted = await gh.pr.revert({
  repo: "cli/cli",
  pr: 123,
  title: "Revert broken change",
  body: "Reverts PR #123.",
});

console.log(reverted.url);
```

### Maps to

```sh
gh pr revert 123 --repo cli/cli --title 'Revert broken change' --body 'Reverts PR #123.'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Required. Pull request to revert. |
| `title` | Text | Optional. Revert PR title. |
| `body` | Text | Optional. Revert PR body. |
| `bodyFile` | File path, or `-` | Optional. Reads body from file or stdin. |
| `draft` | `true` | Optional. Creates the revert PR as draft. |

## Update a PR branch

Updates a pull request branch with the latest base branch changes.

::: warning
This mutates the pull request branch.
:::

### Example

```ts
await gh.pr.updateBranch({
  repo: "cli/cli",
  pr: 123,
  rebase: true,
});
```

### Maps to

```sh
gh pr update-branch 123 --repo cli/cli --rebase
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number, URL, or branch | Optional. Omitted selects the current branch PR. |
| `rebase` | `true` | Optional. Rebase onto the latest base branch instead of merging. |

## Lock a PR conversation

Locks a pull request conversation.

::: warning
This mutates pull request conversation state.
:::

### Example

```ts
await gh.pr.lock({
  repo: "cli/cli",
  pr: 123,
  reason: "resolved",
});
```

### Maps to

```sh
gh pr lock 123 --repo cli/cli --reason resolved
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number or URL | Required. Pull request to lock. |
| `reason` | `off_topic`, `resolved`, `spam`, `too_heated` | Optional. Lock reason. |

## Unlock a PR conversation

Unlocks a pull request conversation.

::: warning
This mutates pull request conversation state.
:::

### Example

```ts
await gh.pr.unlock({
  repo: "cli/cli",
  pr: 123,
});
```

### Maps to

```sh
gh pr unlock 123 --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `pr` | PR number or URL | Required. Pull request to unlock. |

## PR fields

These field names can be used with `pr.list`, `pr.view`, and `pr.status`.

| Field | Returned value |
| --- | --- |
| `additions` | Number of added lines. |
| `assignees` | Assigned user objects. |
| `author` | Author user object, or `null`. |
| `autoMergeRequest` | Auto-merge request data from `gh`. |
| `baseRefName` | Base branch name. |
| `baseRefOid` | Base branch object ID. |
| `body` | PR body Markdown. |
| `changedFiles` | Number of changed files. |
| `closed` | Whether the PR is closed. |
| `closedAt` | ISO timestamp string, or `null`. |
| `closingIssuesReferences` | Closing issue reference data from `gh`. |
| `comments` | Comment data from `gh`. |
| `commits` | Commit data from `gh`. |
| `createdAt` | ISO timestamp string. |
| `deletions` | Number of deleted lines. |
| `files` | File data from `gh`. |
| `fullDatabaseId` | Full GitHub database ID. |
| `headRefName` | Head branch name. |
| `headRefOid` | Head branch object ID. |
| `headRepository` | Head repository data from `gh`. |
| `headRepositoryOwner` | Head repository owner data from `gh`. |
| `id` | GitHub node ID. |
| `isCrossRepository` | Whether the PR comes from another repository. |
| `isDraft` | Whether the PR is a draft. |
| `labels` | Label data from `gh`. |
| `latestReviews` | Latest review data from `gh`. |
| `maintainerCanModify` | Whether maintainers can modify the PR branch. |
| `mergeCommit` | Merge commit data from `gh`. |
| `mergeStateStatus` | Merge state status string. |
| `mergeable` | Mergeability string. |
| `mergedAt` | ISO timestamp string, or `null`. |
| `mergedBy` | User object, or `null`. |
| `milestone` | Milestone data from `gh`. |
| `number` | PR number. |
| `potentialMergeCommit` | Potential merge commit data from `gh`. |
| `projectCards` | Project card data from `gh`. |
| `projectItems` | Project item data from `gh`. |
| `reactionGroups` | Reaction group data from `gh`. |
| `reviewDecision` | Review decision string, or `null`. |
| `reviewRequests` | Review request data from `gh`. |
| `reviews` | Review data from `gh`. |
| `state` | PR state, such as `OPEN`, `CLOSED`, or `MERGED`. |
| `statusCheckRollup` | Status/check data from `gh`. |
| `title` | PR title. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |

## PR check fields

These field names can be used with `pr.checks`.

| Field | Returned value |
| --- | --- |
| `bucket` | Check bucket, such as `pass`, `fail`, `pending`, `skipping`, or `cancel`. |
| `completedAt` | ISO timestamp string, or `null`. |
| `description` | Check description, or `null`. |
| `event` | Check event. |
| `link` | Check URL. |
| `name` | Check name. |
| `startedAt` | ISO timestamp string. |
| `state` | Check state, such as `SUCCESS`, `FAILURE`, `PENDING`, or `SKIPPED`. |
| `workflow` | Workflow name. |
