# Secrets

Secret methods live under `gh.secret` and map to `gh secret` subcommands.

## List secrets

Lists secrets for a repository, environment, organization, or user.

### Example

```ts
const secrets = await gh.secret.list({
  repo: "cli/cli",
  fields: ["name", "updatedAt", "visibility"],
});
```

### Maps to

```sh
gh secret list --json name,updatedAt,visibility --repo cli/cli
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `fields` | List of field names | Required. See [Secret fields](#secret-fields). |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Optional. Lists repository secrets. |
| `org` | Organization name | Optional. Lists organization secrets. |
| `env` | Environment name | Optional. Lists environment secrets. |
| `user` | `true` | Optional. Lists user secrets. |
| `app` | `actions`, `agents`, `codespaces`, `dependabot` | Optional. Secret application. |

## Set a secret

Creates or updates a secret.

::: warning
This mutates secret values.
:::

### Example

```ts
await gh.secret.set({
  repo: "cli/cli",
  name: "NPM_TOKEN",
  body: "token-value",
  app: "actions",
});
```

### Maps to

```sh
gh secret set NPM_TOKEN --repo cli/cli --app actions --body token-value
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `name` | Secret name | Required. Secret to create or update. |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Optional. Sets a repository secret. |
| `org` | Organization name | Optional. Sets an organization secret. |
| `env` | Environment name | Optional. Sets an environment secret. |
| `user` | `true` | Optional. Sets a user secret. |
| `app` | `actions`, `agents`, `codespaces`, `dependabot` | Optional. Secret application. |
| `body` | Text | Optional. Secret value. |
| `envFile` | File path | Optional. Loads one or more secrets from a dotenv file. |
| `noReposSelected` | `true` | Optional. Creates an organization secret with no selected repositories. |
| `noStore` | `true` | Optional. Prints encrypted value instead of storing it. |
| `repos` | List of repository names | Optional. Selected repositories for an organization secret. |
| `visibility` | `all`, `private`, `selected` | Optional. Organization secret visibility. |

## Delete a secret

Deletes a secret.

::: danger
This deletes a secret.
:::

### Example

```ts
await gh.secret.delete({
  repo: "cli/cli",
  name: "NPM_TOKEN",
  app: "actions",
});
```

### Maps to

```sh
gh secret delete NPM_TOKEN --repo cli/cli --app actions
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `name` | Secret name | Required. Secret to delete. |
| `repo` | `"owner/repo"` or `{ owner: "owner", name: "repo" }` | Optional. Deletes a repository secret. |
| `org` | Organization name | Optional. Deletes an organization secret. |
| `env` | Environment name | Optional. Deletes an environment secret. |
| `user` | `true` | Optional. Deletes a user secret. |
| `app` | `actions`, `agents`, `codespaces`, `dependabot` | Optional. Secret application. |

## Secret fields

These field names can be used with `secret.list`.

| Field | Returned value |
| --- | --- |
| `name` | Secret name. |
| `numSelectedRepos` | Number of selected repositories. |
| `selectedReposURL` | Selected repositories API URL, or `null`. |
| `updatedAt` | ISO timestamp string. |
| `visibility` | Secret visibility. |
