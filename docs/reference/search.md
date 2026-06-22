# Search

Search methods live under `gh.search` and map to `gh search` subcommands.

## Search repositories

Searches repositories on GitHub.

### Example

```ts
const repos = await gh.search.repos({
  query: "cli language:go",
  limit: 10,
  fields: ["fullName", "description", "url", "stargazersCount"],
});
```

### Maps to

```sh
gh search repos 'cli language:go' --json fullName,description,url,stargazersCount --limit 10
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `query` | Search query string, or list of query parts | Optional. Search terms passed positionally. |
| `fields` | List of field names | Required. See [Search repository fields](#search-repository-fields). |
| `limit` | Number | Optional. Maximum results to fetch. |
| `order` | `asc`, `desc` | Optional. Sort order. |
| `sort` | Sort field | Optional. Passed to `gh search repos --sort`. |
| `owners` | List of owners | Optional. Filters by owner. |
| `repos` | List of `owner/repo` names | Optional. Filters by repository. |
| `language` | Language name | Optional. Filters by language. |
| `visibility` | List of `public`, `private`, `internal` | Optional. Filters by visibility. |
| `archived` | `true` or `false` | Optional. Includes or excludes archived repositories. |
| `created` | Date expression | Optional. Filters by created date. |
| `followers` | Number expression | Optional. Filters by follower count. |
| `forks` | Number expression | Optional. Filters by fork count. |
| `goodFirstIssues` | Number expression | Optional. Filters by good-first-issue count. |
| `helpWantedIssues` | Number expression | Optional. Filters by help-wanted-issue count. |
| `includeForks` | `false`, `true`, `only` | Optional. Controls fork inclusion. |
| `licenses` | List of license keys | Optional. Filters by license. |
| `match` | List of `name`, `description`, `readme` | Optional. Search fields to match. |
| `numberTopics` | Number expression | Optional. Filters by topic count. |
| `size` | Size expression | Optional. Filters by repository size. |
| `stars` | Number expression | Optional. Filters by star count. |
| `topics` | List of topics | Optional. Filters by topic. |
| `updated` | Date expression | Optional. Filters by updated date. |

## Search issues

Searches issues on GitHub.

### Example

```ts
const issues = await gh.search.issues({
  query: "bug",
  repos: ["cli/cli"],
  state: "open",
  labels: ["needs-triage"],
  fields: ["number", "title", "url", "author"],
});
```

### Maps to

```sh
gh search issues bug --json number,title,url,author --repo cli/cli --label needs-triage --state open
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `query` | Search query string, or list of query parts | Optional. Search terms passed positionally. |
| `fields` | List of field names | Required. See [Search issue fields](#search-issue-fields). |
| `limit` | Number | Optional. Maximum results to fetch. |
| `order` | `asc`, `desc` | Optional. Sort order. |
| `sort` | Sort field | Optional. Passed to `gh search issues --sort`. |
| `owners` | List of owners | Optional. Filters by owner. |
| `repos` | List of `owner/repo` names | Optional. Filters by repository. |
| `language` | Language name | Optional. Filters by language. |
| `visibility` | List of `public`, `private`, `internal` | Optional. Filters by visibility. |
| `app` | GitHub App name | Optional. Filters by GitHub App author. |
| `archived` | `true` or `false` | Optional. Includes or excludes archived repositories. |
| `assignee` | GitHub username | Optional. Filters by assignee. |
| `author` | GitHub username | Optional. Filters by author. |
| `closed` | Date expression | Optional. Filters by closed date. |
| `commenter` | GitHub username | Optional. Filters by commenter. |
| `comments` | Number expression | Optional. Filters by comment count. |
| `created` | Date expression | Optional. Filters by created date. |
| `includePrs` | `true` | Optional. Includes pull requests in issue search. |
| `interactions` | Number expression | Optional. Filters by interaction count. |
| `involves` | GitHub username | Optional. Filters by involved user. |
| `labels` | List of label names | Optional. Filters by labels. |
| `locked` | `true` | Optional. Filters to locked issues. |
| `match` | List of `title`, `body`, `comments` | Optional. Search fields to match. |
| `mentions` | GitHub username | Optional. Filters by mentioned user. |
| `milestone` | Milestone name | Optional. Filters by milestone. |
| `noAssignee`, `noLabel`, `noMilestone`, `noProject` | `true` | Optional. Filters missing metadata. |
| `project` | Project board | Optional. Filters by project. |
| `reactions` | Number expression | Optional. Filters by reaction count. |
| `state` | `open`, `closed` | Optional. Filters by issue state. |
| `teamMentions` | Team slug | Optional. Filters by mentioned team. |
| `updated` | Date expression | Optional. Filters by updated date. |

## Search pull requests

Searches pull requests on GitHub.

### Example

```ts
const prs = await gh.search.prs({
  query: "refactor",
  repos: ["cli/cli"],
  review: "approved",
  fields: ["number", "title", "url", "isDraft"],
});
```

### Maps to

```sh
gh search prs refactor --json number,title,url,isDraft --repo cli/cli --review approved
```

### Options

Includes all [Search issues](#search-issues) options, plus:

| Option | Accepts | Notes |
| --- | --- | --- |
| `fields` | List of field names | Required. See [Search pull request fields](#search-pull-request-fields). |
| `base` | Branch name | Optional. Filters by base branch. |
| `checks` | `pending`, `success`, `failure` | Optional. Filters by check status. |
| `draft` | `true` | Optional. Filters to draft pull requests. |
| `head` | Branch name | Optional. Filters by head branch. |
| `merged` | `true` | Optional. Filters to merged pull requests. |
| `mergedAt` | Date expression | Optional. Filters by merged date. |
| `review` | `none`, `required`, `approved`, `changes_requested` | Optional. Filters by review status. |
| `reviewRequested` | GitHub username or team | Optional. Filters by requested reviewer. |
| `reviewedBy` | GitHub username | Optional. Filters by reviewer. |

## Search code

Searches code on GitHub.

### Example

```ts
const matches = await gh.search.code({
  query: "normalizeRepoRef",
  repos: ["rossreicks/gh-sdk"],
  fields: ["path", "repository", "url"],
});
```

### Maps to

```sh
gh search code normalizeRepoRef --json path,repository,url --repo rossreicks/gh-sdk
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `query` | Search query string, or list of query parts | Required. Search terms passed positionally. |
| `fields` | List of field names | Required. See [Search code fields](#search-code-fields). |
| `limit` | Number | Optional. Maximum results to fetch. |
| `order` | `asc`, `desc` | Optional. Sort order. |
| `sort` | Sort field | Optional. Passed to `gh search code --sort`. |
| `owners` | List of owners | Optional. Filters by owner. |
| `repos` | List of `owner/repo` names | Optional. Filters by repository. |
| `language` | Language name | Optional. Filters by language. |
| `visibility` | List of `public`, `private`, `internal` | Optional. Filters by visibility. |
| `extension` | File extension | Optional. Filters by extension. |
| `filename` | File name | Optional. Filters by file name. |
| `match` | List of `file`, `path` | Optional. Search fields to match. |
| `size` | Size expression | Optional. Filters by file size. |

## Search commits

Searches commits on GitHub.

### Example

```ts
const commits = await gh.search.commits({
  query: "fix parser",
  repos: ["cli/cli"],
  author: "octocat",
  fields: ["sha", "url", "repository"],
});
```

### Maps to

```sh
gh search commits 'fix parser' --json sha,url,repository --repo cli/cli --author octocat
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `query` | Search query string, or list of query parts | Optional. Search terms passed positionally. |
| `fields` | List of field names | Required. See [Search commit fields](#search-commit-fields). |
| `limit` | Number | Optional. Maximum results to fetch. |
| `order` | `asc`, `desc` | Optional. Sort order. |
| `sort` | Sort field | Optional. Passed to `gh search commits --sort`. |
| `owners` | List of owners | Optional. Filters by owner. |
| `repos` | List of `owner/repo` names | Optional. Filters by repository. |
| `language` | Language name | Optional. Filters by language. |
| `visibility` | List of `public`, `private`, `internal` | Optional. Filters by visibility. |
| `author` | GitHub username | Optional. Filters by author. |
| `authorDate` | Date expression | Optional. Filters by author date. |
| `authorEmail` | Email address | Optional. Filters by author email. |
| `authorName` | Name | Optional. Filters by author name. |
| `committer` | GitHub username | Optional. Filters by committer. |
| `committerDate` | Date expression | Optional. Filters by committer date. |
| `committerEmail` | Email address | Optional. Filters by committer email. |
| `committerName` | Name | Optional. Filters by committer name. |
| `hash` | SHA | Optional. Filters by commit hash. |
| `merge` | `true` | Optional. Filters to merge commits. |
| `parent` | SHA | Optional. Filters by parent commit. |
| `tree` | SHA | Optional. Filters by tree hash. |

## Search repository fields

These field names can be used with `search.repos`.

| Field | Returned value |
| --- | --- |
| `createdAt` | ISO timestamp string. |
| `defaultBranch` | Default branch name. |
| `description` | Repository description, or `null`. |
| `forksCount` | Number of forks. |
| `fullName` | Repository name with owner. |
| `hasDownloads` | Whether downloads are enabled. |
| `hasIssues` | Whether issues are enabled. |
| `hasPages` | Whether GitHub Pages is enabled. |
| `hasProjects` | Whether projects are enabled. |
| `hasWiki` | Whether wiki is enabled. |
| `homepage` | Homepage URL, or `null`. |
| `id` | GitHub node ID. |
| `isArchived` | Whether the repository is archived. |
| `isDisabled` | Whether the repository is disabled. |
| `isFork` | Whether the repository is a fork. |
| `isPrivate` | Whether the repository is private. |
| `language` | Primary language data from `gh`. |
| `license` | License data from `gh`. |
| `name` | Repository name. |
| `openIssuesCount` | Number of open issues. |
| `owner` | Owner data from `gh`. |
| `pushedAt` | ISO timestamp string, or `null`. |
| `size` | Repository size. |
| `stargazersCount` | Number of stargazers. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |
| `visibility` | Repository visibility. |
| `watchersCount` | Number of watchers. |

## Search issue fields

These field names can be used with `search.issues`.

| Field | Returned value |
| --- | --- |
| `assignees` | Assigned user data from `gh`. |
| `author` | Author user data from `gh`. |
| `authorAssociation` | Author association string. |
| `body` | Issue body Markdown. |
| `closedAt` | ISO timestamp string, or `null`. |
| `commentsCount` | Number of comments. |
| `createdAt` | ISO timestamp string. |
| `id` | GitHub node ID. |
| `isLocked` | Whether the issue is locked. |
| `isPullRequest` | Whether the result is a pull request. |
| `labels` | Label data from `gh`. |
| `number` | Issue number. |
| `repository` | Repository data from `gh`. |
| `state` | Issue state. |
| `title` | Issue title. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |

## Search pull request fields

These field names can be used with `search.prs`.

| Field | Returned value |
| --- | --- |
| `assignees` | Assigned user data from `gh`. |
| `author` | Author user data from `gh`. |
| `authorAssociation` | Author association string. |
| `body` | Pull request body Markdown. |
| `closedAt` | ISO timestamp string, or `null`. |
| `commentsCount` | Number of comments. |
| `createdAt` | ISO timestamp string. |
| `id` | GitHub node ID. |
| `isDraft` | Whether the pull request is a draft. |
| `isLocked` | Whether the pull request is locked. |
| `isPullRequest` | Whether the result is a pull request. |
| `labels` | Label data from `gh`. |
| `number` | Pull request number. |
| `repository` | Repository data from `gh`. |
| `state` | Pull request state. |
| `title` | Pull request title. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |

## Search code fields

These field names can be used with `search.code`.

| Field | Returned value |
| --- | --- |
| `path` | File path. |
| `repository` | Repository data from `gh`. |
| `sha` | Blob SHA. |
| `textMatches` | Text match data from `gh`. |
| `url` | GitHub URL. |

## Search commit fields

These field names can be used with `search.commits`.

| Field | Returned value |
| --- | --- |
| `author` | Author data from `gh`. |
| `commit` | Commit data from `gh`. |
| `committer` | Committer data from `gh`. |
| `id` | GitHub node ID. |
| `parents` | Parent commit data from `gh`. |
| `repository` | Repository data from `gh`. |
| `sha` | Commit SHA. |
| `url` | GitHub URL. |
