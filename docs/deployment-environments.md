# Deployment Environments

This site uses three release spaces:

- Development: local work and short-lived feature branches.
- Staging: the long-lived `staging` branch and the Vercel staging target.
- Production: the protected `main` branch and production Vercel domains.

The rule is simple: code moves up through pull requests, checks, review, staging verification, and an explicit production release approval.

## Branch Model

| Branch | Purpose | Deploy target | Merge rule |
| --- | --- | --- | --- |
| `feature/*`, `codex/*` | Design experiments and implementation work | Vercel preview deployments, if Git integration is enabled | Open a PR into `staging` |
| `staging` | Shared QA space for testing candidate releases | Vercel custom target `staging`, or preview fallback | PR review required |
| `main` | Production source of truth | Staged production release, then manual promotion | PR review required |

Use `staging` for real QA. Use feature branches for playful exploration.

## GitHub Rules

Protect both `staging` and `main`:

- Require a pull request before merging.
- Require the `Quality gate` and `Vercel` checks.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution before merge.
- Block force pushes and branch deletion.
- After there is a second human reviewer or bot account, require at least one approving review and CODEOWNERS review.

The repository is currently a one-collaborator repo. GitHub does not allow a pull request author to approve their own PR, so enforcing one required PR approval before adding another reviewer would make the repo awkward to operate. Branch protection is bootstrapped to require PRs and checks immediately, and the production environment approval remains the final release gate.

This repo includes:

- `.github/CODEOWNERS` so ownership is explicit.
- `.github/pull_request_template.md` so every PR carries release intent.
- `.github/workflows/ci.yml` so PRs and protected branches run `npm run deploy:check`.

## GitHub Environments

Create two GitHub environments:

- `staging`: used by the staging workflow.
- `production`: used by the production release workflow and should require a reviewer.

The production environment approval is the final human gate before traffic moves.

## Required GitHub Secrets

Add these repository secrets:

| Secret | Purpose |
| --- | --- |
| `VERCEL_TOKEN` | Vercel CLI authentication token. |
| `VERCEL_ORG_ID` | Vercel team or user org ID. |
| `VERCEL_PROJECT_ID` | Vercel project ID for this site. |

Do not commit `.vercel/project.json` or any `.env*` file. They are already ignored.

Bootstrap status:

- `VERCEL_ORG_ID` is configured in GitHub.
- `VERCEL_PROJECT_ID` is configured in GitHub.
- `VERCEL_TOKEN` still needs to be created in Vercel and added to GitHub.

## Optional GitHub Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `VERCEL_STAGING_TARGET` | `staging` | Vercel target for staging. Use `staging` for a custom environment or `preview` for the branch-based fallback. |
| `STAGING_DOMAIN` | empty | Optional persistent staging domain to alias after deployment, for example `staging.example.com`. |

Bootstrap status:

- `VERCEL_STAGING_TARGET=staging` is configured in GitHub.
- `STAGING_DOMAIN` is not configured yet.

## Vercel Setup

Recommended setup on Vercel Pro or Enterprise:

1. Create a custom environment named `staging`.
2. Track the `staging` branch for that environment.
3. Attach a staging domain if you want a stable URL.
4. Add staging-specific environment variables.
5. Keep production variables separate from staging variables.

Fallback setup on plans without custom environments:

1. Set `VERCEL_STAGING_TARGET=preview` in GitHub repository variables.
2. Configure branch-specific preview environment variables for the `staging` branch in Vercel.
3. Optionally assign a branch-specific staging domain in Vercel.

For the cleanest production gate, disable automatic assignment of production domains in Vercel:

1. Open the Vercel project.
2. Go to Settings, Environments, Production.
3. Under Branch Tracking, disable auto-assignment of custom production domains.
4. Use the `Release Production` GitHub Action to create a staged production deployment, smoke-test it, and promote it.

## Promotion Flow

1. Create a branch from `staging` for experiments or design work.
2. Run `npm run deploy:check` locally.
3. Open a PR into `staging`.
4. Wait for CI and review approval.
5. Merge into `staging`.
6. Verify the staging deployment created by `Deploy Staging`.
7. Open a PR from `staging` into `main`.
8. Wait for CI and review approval.
9. Merge into `main`.
10. Run `Release Production` from the `main` branch.
11. Approve the production environment deployment in GitHub.
12. Confirm the workflow staged, smoke-tested, promoted, and scanned production logs.

## Local Development

Use local development for fast iteration:

```bash
npm install
npm run dev
```

Before opening a PR:

```bash
npm run deploy:check
```

To mirror Vercel environment variables locally:

```bash
vercel link
vercel env pull .env.local
```

## Rollback

If production breaks after promotion:

```bash
vercel rollback
```

Then open a follow-up PR with the fix or revert. Do not patch production directly.

## Operational Checklist

- Every code change enters through a branch.
- Every protected branch update happens through a PR.
- Every PR has CI and at least one approval.
- Staging is verified before a `main` PR is merged.
- Production is released by the `Release Production` workflow.
- Production promotion requires GitHub environment approval.
- Secrets live in Vercel or GitHub, never in the repo.
