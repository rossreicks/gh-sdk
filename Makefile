pre-publish:
	pnpm install
	pnpm typecheck
	pnpm test
	pnpm build
	npm pack --dry-run --ignore-scripts

publish:
	npm publish

post-publish:
	mkdir /tmp/gh-sdk && cd /tmp/gh-sdk && pnpm init -y && pnpm add gh-sdk@latest && node -e "import { GhClient } from 'gh-sdk'; const gh = new GhClient(); console.log(gh.repo.view({ repo: 'cli/cli', fields: ['name', 'url'] as const }));"