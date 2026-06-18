# Typed fields

JSON-returning methods require `fields`. The field list controls both the `gh --json` fields sent to GitHub CLI and the properties returned by TypeScript.

## Inline fields

Inline field arrays infer narrowed return properties automatically:

```ts
const prs = await gh.pr.list({
  repo: "cli/cli",
  fields: ["number", "title", "url"],
});

for (const pr of prs) {
  console.log(pr.number, pr.title, pr.url);
}
```

The returned PR objects only include the selected properties.

## Field variables

If you store fields in a variable, use `as const` so TypeScript keeps the exact field names:

```ts
const fields = ["number", "title", "url"] as const;

const prs = await gh.pr.list({
  repo: "cli/cli",
  fields,
});
```

Without `as const`, TypeScript may widen the variable to a general string array and lose the specific selected properties.

## Invalid fields

Invalid field names fail at compile time:

```ts
await gh.pr.list({
  repo: "cli/cli",
  fields: ["number", "notARealField"], // TypeScript error
});
```

See the exhaustive field lists in the reference pages:

- [PR fields](../reference/pull-requests.md#pr-fields)
- [PR check fields](../reference/pull-requests.md#pr-check-fields)
- [Repository fields](../reference/repositories.md#repository-fields)
