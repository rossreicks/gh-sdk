# Releases

Release methods live under `gh.release` and map to `gh release` subcommands.

## List releases

Lists releases in a repository.

### Example

```ts
const releases = await gh.release.list({
  repo: "cli/cli",
  limit: 10,
  fields: ["tagName", "name", "isLatest"],
});
```

### Maps to

```sh
gh release list --repo cli/cli --json tagName,name,isLatest --limit 10
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [Release list fields](#release-list-fields). |
| `excludeDrafts` | `true` | Optional. Omits draft releases. |
| `excludePreReleases` | `true` | Optional. Omits prereleases. |
| `limit` | Number | Optional. Maximum releases to fetch. |
| `order` | `asc`, `desc` | Optional. Sort order. |

## View a release

Views one release.

### Example

```ts
const release = await gh.release.view({
  repo: "cli/cli",
  tag: "v2.0.0",
  fields: ["tagName", "name", "url"],
});
```

### Maps to

```sh
gh release view v2.0.0 --repo cli/cli --json tagName,name,url
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `tag` | Tag name | Optional. Omitted selects the latest release. |
| `fields` | List of field names | Required. See [Release view fields](#release-view-fields). |

## Create a release

Creates a release and returns its URL.

::: warning
This creates a release on GitHub.
:::

### Example

```ts
const created = await gh.release.create({
  repo: "cli/cli",
  tag: "v2.0.0",
  title: "v2.0.0",
  notes: "Release notes.",
  generateNotes: true,
});

console.log(created.url);
```

### Maps to

```sh
gh release create v2.0.0 --repo cli/cli --generate-notes --notes 'Release notes.' --title v2.0.0
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `tag` | Tag name | Optional. Tag to create the release from. |
| `files` | List of file paths | Optional. Assets to upload. |
| `discussionCategory` | Category name | Optional. Starts a discussion in the category. |
| `draft` | `true` | Optional. Creates a draft release. |
| `failOnNoCommits` | `true` | Optional. Fails if there are no commits since the last release. |
| `generateNotes` | `true` | Optional. Generates release notes. |
| `latest` | `true` or `false` | Optional. Marks as latest, or explicitly not latest. |
| `notes` | Text | Optional. Release notes. |
| `notesFile` | File path, or `-` | Optional. Reads notes from a file or stdin. |
| `notesFromTag` | `true` | Optional. Uses the tag annotation as notes. |
| `notesStartTag` | Tag name | Optional. Start tag for generated notes. |
| `prerelease` | `true` | Optional. Marks as prerelease. |
| `target` | Branch or commit SHA | Optional. Target for an automatically-created tag. |
| `title` | Text | Optional. Release title. |
| `verifyTag` | `true` | Optional. Aborts if the git tag does not already exist remotely. |

## Delete a release

Deletes a release.

::: danger
This deletes a release. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.release.delete({
  repo: "cli/cli",
  tag: "v2.0.0",
  cleanupTag: true,
  yes: true,
});
```

### Maps to

```sh
gh release delete v2.0.0 --repo cli/cli --cleanup-tag --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `tag` | Tag name | Required. Release to delete. |
| `cleanupTag` | `true` | Optional. Deletes the specified tag. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Delete a release asset

Deletes an asset from a release.

::: danger
This deletes a release asset. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.release.deleteAsset({
  repo: "cli/cli",
  tag: "v2.0.0",
  assetName: "checksums.txt",
  yes: true,
});
```

### Maps to

```sh
gh release delete-asset v2.0.0 checksums.txt --repo cli/cli --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `tag` | Tag name | Required. Release containing the asset. |
| `assetName` | Asset name | Required. Asset to delete. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Edit a release

Edits a release.

::: warning
This mutates release metadata.
:::

### Example

```ts
await gh.release.edit({
  repo: "cli/cli",
  tag: "v2.0.0",
  title: "Version 2.0.0",
  latest: true,
});
```

### Maps to

```sh
gh release edit v2.0.0 --repo cli/cli --latest --title 'Version 2.0.0'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `tag` | Tag name | Required. Release to edit. |
| `newTag` | Tag name | Optional. Renames the release tag. |
| `discussionCategory` | Category name | Optional. Starts or updates the discussion category. |
| `draft` | `true` | Optional. Marks as draft. |
| `generateNotes` | `true` | Optional. Generates release notes. |
| `latest` | `true` or `false` | Optional. Marks as latest, or explicitly not latest. |
| `notes` | Text | Optional. Release notes. |
| `notesFile` | File path, or `-` | Optional. Reads notes from a file or stdin. |
| `notesFromTag` | `true` | Optional. Uses the tag annotation as notes. |
| `notesStartTag` | Tag name | Optional. Start tag for generated notes. |
| `prerelease` | `true` | Optional. Marks as prerelease. |
| `target` | Branch or commit SHA | Optional. Target commitish. |
| `title` | Text | Optional. Release title. |
| `verifyTag` | `true` | Optional. Aborts if the git tag does not already exist remotely. |

## Upload release assets

Uploads assets to a release.

::: warning
This mutates release assets.
:::

### Example

```ts
await gh.release.upload({
  repo: "cli/cli",
  tag: "v2.0.0",
  files: ["dist/app.tar.gz"],
  clobber: true,
});
```

### Maps to

```sh
gh release upload v2.0.0 dist/app.tar.gz --repo cli/cli --clobber
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `tag` | Tag name | Required. Release to upload assets to. |
| `files` | List of file paths | Required. Assets to upload. |
| `clobber` | `true` | Optional. Overwrites existing assets with the same name. |

## Release list fields

These field names can be used with `release.list`.

| Field | Returned value |
| --- | --- |
| `createdAt` | ISO timestamp string. |
| `isDraft` | Whether the release is a draft. |
| `isImmutable` | Whether the release is immutable. |
| `isLatest` | Whether the release is latest. |
| `isPrerelease` | Whether the release is a prerelease. |
| `name` | Release name, or `null`. |
| `publishedAt` | ISO timestamp string, or `null`. |
| `tagName` | Release tag name. |

## Release view fields

These field names can be used with `release.view`.

| Field | Returned value |
| --- | --- |
| `apiUrl` | GitHub API URL. |
| `assets` | Release asset data from `gh`. |
| `author` | Author user data from `gh`. |
| `body` | Release body Markdown. |
| `createdAt` | ISO timestamp string. |
| `databaseId` | GitHub database ID. |
| `id` | GitHub node ID. |
| `isDraft` | Whether the release is a draft. |
| `isImmutable` | Whether the release is immutable. |
| `isPrerelease` | Whether the release is a prerelease. |
| `name` | Release name, or `null`. |
| `publishedAt` | ISO timestamp string, or `null`. |
| `tagName` | Release tag name. |
| `tarballUrl` | Tarball URL. |
| `targetCommitish` | Target branch or commit. |
| `uploadUrl` | Upload URL. |
| `url` | GitHub URL. |
| `zipballUrl` | Zipball URL. |
