# Contribution Guide

This project deploys NodiexTracking to Vercel and stores production data in Supabase Postgres through Prisma.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and fill:

```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="..."
```

3. Start the app:

```bash
npm run dev
```

## Local Checks

Run these before pushing:

```bash
npm run lint
npm run build
```

Use the same checks when reviewing a pull request.

## Branch Flow

- Work on a feature branch.
- Open a pull request into `main`.
- Merge only after lint/build pass and database changes are reviewed.
- A push to `main` triggers the production CI/CD workflow.

## Database Migrations

The database schema is managed with Prisma.

Typical flow:

```bash
npx prisma migrate dev --name short_change_name
npm run lint
npm run build
```

Rules:

- Update `prisma/schema.prisma` first.
- Commit the generated folder under `prisma/migrations`.
- Review the generated SQL before merging.
- Do not change production schema manually unless the same change is also represented by a committed migration.
- Prefer backward-compatible expand/contract changes for production.
- If a migration is not backward-compatible, include a documented manual rollback SQL plan in the pull request.

## CI/CD

GitHub Actions runs `.github/workflows/deploy.yml` on every push to `main`.

The workflow:

1. Installs dependencies with `npm ci`.
2. Runs `npm run lint`.
3. Runs `npm run build`.
4. Pulls Vercel production settings.
5. Builds Vercel output locally in CI.
6. Captures the currently active production deployment.
7. Runs `npx prisma migrate deploy`.
8. Deploys the prebuilt output to Vercel production.
9. Runs a smoke test against `https://nodiex-tracking.vercel.app/api/public?lang=es`.

If deploy or smoke test fails after migration, the workflow rolls Vercel back to the previous production deployment. Prisma does not provide automatic down migrations, so database rollback must be handled by explicit rollback SQL when needed.

## Required GitHub Secrets

Configure repository secrets with GitHub CLI:

```bash
gh secret set VERCEL_TOKEN --repo andre-carbajal/NodiexTracking
gh secret set VERCEL_ORG_ID --repo andre-carbajal/NodiexTracking --body "team_dyQ9QQq1ttQsJHnXmGz0plKr"
gh secret set VERCEL_PROJECT_ID --repo andre-carbajal/NodiexTracking --body "prj_ohiotljTTqaMXEYtBIfWam5wCZez"
gh secret set DATABASE_URL --repo andre-carbajal/NodiexTracking --body "<production-pooler-url>"
```

`VERCEL_TOKEN` can be created in Vercel:

```bash
vercel tokens add "NodiexTracking CI" --project prj_ohiotljTTqaMXEYtBIfWam5wCZez --format json
```

Never commit `.env.local`, tokens, passwords, or connection strings.

## Production URLs

- App: https://nodiex-tracking.vercel.app
- Vercel project: `andre-carbajals-projects/nodiex-tracking`
- Supabase project: `nodiex-tracking` (`vefglgtuutvhcmwrlppx`)
