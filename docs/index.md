---
layout: home

hero:
  name: "gh-sdk"
  image: './gh-sdk/logo.svg'
  tagline: Type-safe GitHub CLI wrapper for Node.js
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /reference/pull-requests
---

## Easily interact with the gh in your Node apps

```ts
import { GhClient } from "gh-sdk";

const gh = new GhClient();

const prs = await gh.pr.list({
  repo: "cli/cli",
  state: "open",
  limit: 10,
  fields: ["number", "title", "url"],
});

for (const pr of prs) {
  console.log(`#${pr.number}`, pr.title, pr.url);
}
```

This maps to:

```sh
gh pr list --repo cli/cli --state open --limit 10 --json number,title,url
```
