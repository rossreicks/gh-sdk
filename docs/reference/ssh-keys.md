# SSH keys

SSH key methods live under `gh.sshKey` and map to `gh ssh-key` subcommands.

## List SSH keys

Lists SSH keys for the authenticated user.

### Example

```ts
const keys = await gh.sshKey.list();
console.log(keys.data.stdout);
```

### Maps to

```sh
gh ssh-key list
```

### Return value

Returns raw text output from GitHub CLI as `GhTextOutput`:

```ts
{ data: { stdout: string } }
```

## Add an SSH key

Adds an SSH key to the authenticated user's account.

::: warning
This mutates account SSH keys.
:::

### Example

```ts
await gh.sshKey.add({
  keyFile: "~/.ssh/id_ed25519.pub",
  title: "work laptop",
  type: "authentication",
});
```

### Maps to

```sh
gh ssh-key add ~/.ssh/id_ed25519.pub --title 'work laptop' --type authentication
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `keyFile` | File path | Optional. Public key file to add. Omitted reads from stdin in GitHub CLI. |
| `title` | Text | Optional. Key title. |
| `type` | `authentication`, `signing` | Optional. Key type. |

## Delete an SSH key

Deletes an SSH key from the authenticated user's account.

::: danger
This deletes an account SSH key. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.sshKey.delete({
  id: "123456",
  yes: true,
});
```

### Maps to

```sh
gh ssh-key delete 123456 --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `id` | Key ID | Required. SSH key to delete. |
| `yes` | `true` | Optional. Skips confirmation prompt. |
