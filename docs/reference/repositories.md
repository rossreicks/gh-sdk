# Repositories

Repository methods live under `gh.repo` and map to `gh repo` subcommands.

## View a repository

Views repository information.

### Example

```ts
const repo = await gh.repo.view({
  repo: "cli/cli",
  fields: ["name", "description", "url", "stargazerCount"],
});
```

### Maps to

```sh
gh repo view cli/cli --json name,description,url,stargazerCount
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Repository to view. |
| `fields` | List of field names | Required. See [Repository fields](#repository-fields). |
| `branch` | Branch name | Optional. Views a specific branch. |

## List repositories

Lists repositories owned by a user or organization.

### Example

```ts
const repos = await gh.repo.list({
  owner: "cli",
  limit: 10,
  visibility: "public",
  fields: ["nameWithOwner", "description", "url"],
});
```

### Maps to

```sh
gh repo list cli --json nameWithOwner,description,url --limit 10 --visibility public
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `owner` | GitHub user or organization | Optional. Owner whose repositories to list. |
| `fields` | List of field names | Required. See [Repository fields](#repository-fields). |
| `archived` | `true` | Optional. Shows only archived repositories. |
| `fork` | `true` | Optional. Shows only forks. |
| `source` | `true` | Optional. Shows only non-forks. |
| `language` | Language name | Optional. Filters by primary language. |
| `limit` | Number | Optional. Maximum repositories to list. |
| `noArchived` | `true` | Optional. Omits archived repositories. |
| `topics` | List of topic names | Optional. Filters by topic. |
| `visibility` | `public`, `private`, `internal` | Optional. Filters by visibility. |

## Create a repository

Creates a GitHub repository and returns its URL.

::: warning
This creates a repository on GitHub.
:::

### Example

```ts
const created = await gh.repo.create({
  name: "example-repo",
  description: "An example repository.",
  visibility: "public",
  addReadme: true,
});

console.log(created.url);
```

### Maps to

```sh
gh repo create example-repo --description 'An example repository.' --public --add-readme
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `name` | Repository name | Optional. `OWNER/` defaults to the authenticating user. |
| `description` | Text | Optional. Repository description. |
| `visibility` | `public`, `private`, `internal` | Optional. Repository visibility. |
| `addReadme` | `true` | Optional. Adds a README. |
| `gitignore` | Template name | Optional. Adds a gitignore template. |
| `homepage` | URL | Optional. Repository homepage. |
| `license` | License template | Optional. Adds a license. |
| `disableIssues` | `true` | Optional. Disables issues. |
| `disableWiki` | `true` | Optional. Disables wiki. |
| `includeAllBranches` | `true` | Optional. Includes all branches from template repository. |
| `remote` | Remote name | Optional. Specifies remote name. |
| `source` | Local path | Optional. Uses local repository as source. |
| `team` | Team name | Optional. Grants team access. |
| `template` | `"owner/repo"` | Optional. Creates from a template repository. |

## Edit repository settings

Edits repository settings.

::: warning
This mutates repository settings. Visibility changes may require `acceptVisibilityChangeConsequences`.
:::

### Example

```ts
await gh.repo.edit({
  repo: "cli/cli",
  description: "GitHub CLI",
  homepage: "https://cli.github.com/",
  deleteBranchOnMerge: true,
  enableIssues: true,
});
```

### Maps to

```sh
gh repo edit cli/cli --description 'GitHub CLI' --homepage https://cli.github.com/ --delete-branch-on-merge --enable-issues
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Repository to edit. |
| `description` | Text | Optional. Repository description. |
| `homepage` | URL | Optional. Repository homepage. |
| `visibility` | `public`, `private`, `internal` | Optional. Changes visibility. |
| `acceptVisibilityChangeConsequences` | `true` | Optional. Required by GitHub CLI for visibility changes. |
| `defaultBranch` | Branch name | Optional. Sets default branch. |
| `deleteBranchOnMerge` | `true` | Optional. Deletes head branches after merge. |
| `addTopics`, `removeTopics` | List of topic names | Optional. Changes repository topics. |
| `allowForking` | `true` | Optional. Allows forking for organization repositories. |
| `allowUpdateBranch` | `true` | Optional. Allows updating PR branches behind their base. |
| `enableAdvancedSecurity` | `true` or `false` | Optional. Enables or disables advanced security. |
| `enableAutoMerge` | `true` or `false` | Optional. Enables or disables auto-merge. |
| `enableDiscussions` | `true` or `false` | Optional. Enables or disables discussions. |
| `enableIssues` | `true` or `false` | Optional. Enables or disables issues. |
| `enableMergeCommit` | `true` or `false` | Optional. Enables or disables merge commits. |
| `enableProjects` | `true` or `false` | Optional. Enables or disables projects. |
| `enableRebaseMerge` | `true` or `false` | Optional. Enables or disables rebase merges. |
| `enableSecretScanning` | `true` or `false` | Optional. Enables or disables secret scanning. |
| `enableSecretScanningPushProtection` | `true` or `false` | Optional. Requires secret scanning first. |
| `enableSquashMerge` | `true` or `false` | Optional. Enables or disables squash merges. |
| `enableWiki` | `true` or `false` | Optional. Enables or disables wiki. |
| `squashMergeCommitMessage` | `default`, `pr-title`, `pr-title-commits`, `pr-title-description` | Optional. Sets default squash merge message style. |
| `template` | `true` | Optional. Makes the repository a template. |

## Delete a repository

Deletes a GitHub repository.

::: danger
This deletes a repository. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.repo.delete({
  repo: "octocat/old-demo",
  yes: true,
});
```

### Maps to

```sh
gh repo delete octocat/old-demo --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Repository to delete. |
| `yes` | `true` | Optional. Confirms deletion without prompting. |

## Archive a repository

Archives a repository.

::: warning
This archives a repository.
:::

### Example

```ts
await gh.repo.archive({
  repo: "octocat/old-demo",
  yes: true,
});
```

### Maps to

```sh
gh repo archive octocat/old-demo --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Repository to archive. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Unarchive a repository

Unarchives a repository.

::: warning
This unarchives a repository.
:::

### Example

```ts
await gh.repo.unarchive({
  repo: "octocat/old-demo",
  yes: true,
});
```

### Maps to

```sh
gh repo unarchive octocat/old-demo --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Repository to unarchive. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Sync a repository

Syncs a destination repository from a source repository.

::: warning
With `force: true`, this can hard reset the destination branch.
:::

### Example

```ts
await gh.repo.sync({
  repo: "octocat/fork",
  source: "cli/cli",
  branch: "main",
});
```

### Maps to

```sh
gh repo sync octocat/fork --source cli/cli --branch main
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Optional. Destination repository. |
| `source` | `"owner/repo"` | Optional. Source repository. |
| `branch` | Branch name | Optional. Branch to sync. |
| `force` | `true` | Optional. Hard resets destination branch to match source. |

## Rename a repository

Renames a repository.

::: warning
This renames a repository.
:::

### Example

```ts
await gh.repo.rename({
  repo: "octocat/old-name",
  newName: "new-name",
  yes: true,
});
```

### Maps to

```sh
gh repo rename new-name --repo octocat/old-name --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Repository to rename. |
| `newName` | Repository name without owner | Required. New repository name. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Set or view the default repository

Views, unsets, or sets GitHub CLI's default repository for a local clone.

### View example

```ts
const current = await gh.repo.setDefault({ view: true });
console.log(current?.repo);
```

#### Maps to

```sh
gh repo set-default --view
```

### Set example

```ts
await gh.repo.setDefault({ repo: "cli/cli" });
```

#### Maps to

```sh
gh repo set-default cli/cli
```

### Unset example

```ts
await gh.repo.setDefault({ unset: true });
```

#### Maps to

```sh
gh repo set-default --unset
```

### Options

Pass one of these shapes:

| Shape | Accepts | Notes |
| --- | --- | --- |
| `{ view: true }` | `true` | Returns the current default repository. |
| `{ unset: true }` | `true` | Unsets the current default repository. |
| `{ repo }` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Sets the default repository. |

## Repository fields

These field names can be used with `repo.view` and `repo.list`.

| Field | Returned value |
| --- | --- |
| `archivedAt` | ISO timestamp string, or `null`. |
| `assignableUsers` | Assignable user data from `gh`. |
| `codeOfConduct` | Code of conduct data from `gh`. |
| `contactLinks` | Contact link data from `gh`. |
| `createdAt` | ISO timestamp string. |
| `defaultBranchRef` | Default branch data from `gh`. |
| `deleteBranchOnMerge` | Whether branches are deleted after merge. |
| `description` | Repository description, or `null`. |
| `diskUsage` | Disk usage number, or `null`. |
| `forkCount` | Number of forks. |
| `fundingLinks` | Funding link data from `gh`. |
| `hasDiscussionsEnabled` | Whether discussions are enabled. |
| `hasIssuesEnabled` | Whether issues are enabled. |
| `hasProjectsEnabled` | Whether projects are enabled. |
| `hasWikiEnabled` | Whether wiki is enabled. |
| `homepageUrl` | Homepage URL, or `null`. |
| `id` | GitHub node ID. |
| `isArchived` | Whether the repository is archived. |
| `isBlankIssuesEnabled` | Whether blank issues are enabled. |
| `isEmpty` | Whether the repository is empty. |
| `isFork` | Whether the repository is a fork. |
| `isInOrganization` | Whether the repository belongs to an organization. |
| `isMirror` | Whether the repository is a mirror. |
| `isPrivate` | Whether the repository is private. |
| `isSecurityPolicyEnabled` | Whether a security policy is enabled. |
| `isTemplate` | Whether the repository is a template. |
| `isUserConfigurationRepository` | Whether this is a user configuration repository. |
| `issueTemplates` | Issue template data from `gh`. |
| `issues` | Issue data from `gh`. |
| `labels` | Label data from `gh`. |
| `languages` | Language data from `gh`. |
| `latestRelease` | Latest release data from `gh`. |
| `licenseInfo` | License data from `gh`. |
| `mentionableUsers` | Mentionable user data from `gh`. |
| `mergeCommitAllowed` | Whether merge commits are allowed. |
| `milestones` | Milestone data from `gh`. |
| `mirrorUrl` | Mirror URL, or `null`. |
| `name` | Repository name. |
| `nameWithOwner` | Repository name with owner. |
| `openGraphImageUrl` | Open Graph image URL. |
| `owner` | Owner object. |
| `parent` | Parent repository data from `gh`. |
| `primaryLanguage` | Primary language data from `gh`. |
| `projects` | Project data from `gh`. |
| `projectsV2` | Project v2 data from `gh`. |
| `pullRequestTemplates` | Pull request template data from `gh`. |
| `pullRequests` | Pull request data from `gh`. |
| `pushedAt` | ISO timestamp string, or `null`. |
| `rebaseMergeAllowed` | Whether rebase merges are allowed. |
| `repositoryTopics` | Repository topic data from `gh`. |
| `securityPolicyUrl` | Security policy URL, or `null`. |
| `squashMergeAllowed` | Whether squash merges are allowed. |
| `sshUrl` | SSH clone URL. |
| `stargazerCount` | Number of stargazers. |
| `templateRepository` | Template repository data from `gh`. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |
| `usesCustomOpenGraphImage` | Whether a custom Open Graph image is used. |
| `viewerCanAdminister` | Whether the current viewer can administer the repository. |
| `viewerDefaultCommitEmail` | Current viewer default commit email, or `null`. |
| `viewerDefaultMergeMethod` | Current viewer default merge method. |
| `viewerHasStarred` | Whether the current viewer has starred the repository. |
| `viewerPermission` | Current viewer permission. |
| `viewerPossibleCommitEmails` | Current viewer possible commit emails. |
| `viewerSubscription` | Current viewer subscription, or `null`. |
| `visibility` | Repository visibility, such as `PUBLIC`, `PRIVATE`, or `INTERNAL`. |
| `watchers` | Watcher data from `gh`. |
