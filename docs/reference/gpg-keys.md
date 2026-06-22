# GPG keys

GPG key methods live under `gh.gpgKey` and map to `gh gpg-key` subcommands.

## List GPG keys

Lists GPG keys for the authenticated user.

### Example

```ts
const keys = await gh.gpgKey.list();
console.log(keys.data.stdout);
```

### Maps to

```sh
gh gpg-key list
```

### Return value

Returns raw text output from GitHub CLI as `GhTextOutput`:

```ts
{ data: { stdout: string } }
```

## Add a GPG key

Adds a GPG key to the authenticated user's account.

::: warning
This mutates account GPG keys.
:::

### Example

```ts
await gh.gpgKey.add({
  keyFile: "public.gpg",
  title: "work laptop",
});
```

### Maps to

```sh
gh gpg-key add public.gpg --title 'work laptop'
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `keyFile` | File path | Optional. Public key file to add. Omitted reads from stdin in GitHub CLI. |
| `title` | Text | Optional. Key title. |

## Delete a GPG key

Deletes a GPG key from the authenticated user's account.

::: danger
This deletes an account GPG key. Use `yes: true` only when you intend to skip confirmation.
:::

### Example

```ts
await gh.gpgKey.delete({
  keyId: "ABCD1234",
  yes: true,
});
```

### Maps to

```sh
gh gpg-key delete ABCD1234 --yes
```

### Options

| Option | Accepts | Notes |
| --- | --- | --- |
| `keyId` | Key ID | Required. GPG key to delete. |
| `yes` | `true` | Optional. Skips confirmation prompt. |
