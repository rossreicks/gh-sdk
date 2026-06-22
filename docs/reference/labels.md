# Labels

Label methods live under `gh.label` and map to `gh label` subcommands.

## List labels

Lists labels in a repository.

### Example

```ts
const labels = await gh.label.list({
  repo: "cli/cli",
  limit: 20,
  fields: ["name", "description", "color"],
});
```

### Maps to

```sh
gh label list --repo cli/cli --json name,description,color --limit 20
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `fields` | List of field names | Required. See [Label fields](#label-fields). |
| `limit` | Number | Optional. Maximum labels to fetch. |
| `order` | `asc`, `desc` | Optional. Sort order. |
| `search` | Text | Optional. Searches labels by name or description. |
| `sort` | `created`, `name` | Optional. Sort field. |

## Create a label

Creates a label.

::: warning
This mutates repository labels.
:::

### Example

```ts
await gh.label.create({
  repo: "cli/cli",
  name: "needs-triage",
  color: "ededed",
  description: "Needs initial review",
});
```

### Maps to

```sh
gh label create needs-triage --repo cli/cli --color ededed --description 'Needs initial review'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `name` | Label name | Required. Label to create. |
| `color` | Hex color without `#` | Optional. Label color. |
| `description` | Text | Optional. Label description. |
| `force` | `true` | Optional. Updates the label if it already exists. |

## Edit a label

Edits a label.

::: warning
This mutates repository labels.
:::

### Example

```ts
await gh.label.edit({
  repo: "cli/cli",
  name: "needs-triage",
  newName: "triage",
  color: "cccccc",
});
```

### Maps to

```sh
gh label edit needs-triage --repo cli/cli --name triage --color cccccc
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `name` | Label name | Required. Label to edit. |
| `newName` | Label name | Optional. Renames the label. |
| `color` | Hex color without `#` | Optional. New label color. |
| `description` | Text | Optional. New label description. |

## Delete a label

Deletes a label.

::: danger
This deletes a repository label. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.label.delete({
  repo: "cli/cli",
  name: "old-label",
  yes: true,
});
```

### Maps to

```sh
gh label delete old-label --repo cli/cli --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Explicit repository target. |
| `name` | Label name | Required. Label to delete. |
| `yes` | `true` | Optional. Skips confirmation prompt. |

## Clone labels

Clones labels from another repository.

::: warning
This mutates repository labels.
:::

### Example

```ts
await gh.label.clone({
  repo: "octocat/example",
  sourceRepository: "cli/cli",
  force: true,
});
```

### Maps to

```sh
gh label clone cli/cli --repo octocat/example --force
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Destination repository. |
| `sourceRepository` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Required. Source repository. |
| `force` | `true` | Optional. Overwrites existing labels. |

## Label fields

These field names can be used with `label.list`.

| Field | Returned value |
| --- | --- |
| `color` | Label color hex string. |
| `createdAt` | ISO timestamp string. |
| `description` | Label description, or `null`. |
| `id` | GitHub node ID. |
| `isDefault` | Whether this is a default label. |
| `name` | Label name. |
| `updatedAt` | ISO timestamp string. |
| `url` | GitHub URL. |
