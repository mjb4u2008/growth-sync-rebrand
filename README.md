# GrowthSync Site

## Run Locally

Prerequisite: Node.js 22.

```bash
npm install
npm run dev
```

## Quality Check

Run the same gate used by CI before opening a pull request:

```bash
npm run deploy:check
```

This runs TypeScript checking, blog validation, and a production build.

## Environments

This repo is set up for a development, staging, and production flow:

- Development happens locally and on short-lived branches.
- Staging runs from the protected `staging` branch.
- Production runs from the protected `main` branch and is released manually.

See [docs/deployment-environments.md](docs/deployment-environments.md) for the full promotion workflow, required GitHub secrets, Vercel settings, and rollback procedure.
