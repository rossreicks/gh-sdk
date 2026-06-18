# Errors

Failed commands and JSON parsing failures throw `GhError`.

```ts
import { GhError } from "gh-sdk";

try {
  await gh.pr.view({
    repo: "cli/cli",
    pr: 1,
    fields: ["title", "url"],
  });
} catch (error) {
  if (error instanceof GhError) {
    console.error(error.code);
    console.error(error.command);
    console.error(error.exitCode);
    console.error(error.stderr);
  }

  throw error;
}
```

## Useful properties

| Property | Description |
| --- | --- |
| `code` | Stable SDK error code. |
| `command` | Formatted command that was executed. |
| `exitCode` | Process exit code, or `null` if the process did not exit normally. |
| `stdout` | Captured standard output. |
| `stderr` | Captured standard error. |

## Error codes

| Code | Meaning |
| --- | --- |
| `GH_NOT_FOUND` | The `gh` executable was not found. |
| `GH_COMMAND_FAILED` | GitHub CLI exited unsuccessfully. |
| `GH_JSON_PARSE_FAILED` | GitHub CLI output could not be parsed as JSON. |
