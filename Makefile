pre-publish:
	pnpm install
	pnpm typecheck
	pnpm test
	pnpm build
	npm pack --dry-run --ignore-scripts

publish:
	npm publish

post-publish:
	rm -rf /tmp/gh-sdk && mkdir /tmp/gh-sdk && cd /tmp/gh-sdk && pnpm init && pnpm add gh-sdk@latest && node -e "import { GhClient } from 'gh-sdk'; const gh = new GhClient(); console.log(await gh.repo.view({ repo: 'cli/cli', fields: ['name', 'url'] as const }));"