# BrightSide Car Wash Website Frontend

A Next.js frontend for a car wash booking experience, service selection, appointment checkout, AI chatbot assistance, and public content pages.

## Overview

This project is a customer-facing frontend for BrightSide Car Wash. It includes:

- service selection and booking flow
- location/day/time slot selection
- checkout with Square payment form
- appointment summary and booking confirmation
- AI chatbot support for pricing, hours, and service questions
- public marketing pages for services, gallery, FAQs, memberships, and more

## Real stack

This app does not implement a custom authentication system, Redux store, RTK Query, or httpOnly cookie auth flow.

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Styling | Tailwind CSS |
| HTTP client | Axios |
| Notifications | React Toastify |
| Payments | Square Web Payment SDK |
| Build tooling | TypeScript, ESLint |
| Containerization | Docker / docker-compose |

## Prerequisites

- Node.js 24.x (matching the Docker image)
- npm 11.x
- Access to the backend APIs used for appointments, locations, chatbot, and Square

## Environment setup

Copy the example file and fill in the real values before running or building the app:

```bash
cp .env.example .env.local
```

Required environment variables:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_API_BASE_AI_URL=https://chat.example.com
NEXT_PUBLIC_SQUARE_APP_ID=your-square-app-id
NEXT_PUBLIC_SQUARE_ENVIRONMENT=sandbox
```

Notes:

- These are public client-side values, not secrets.
- Do not put server-side secrets in the frontend environment.
- `NEXT_PUBLIC_SQUARE_ENVIRONMENT` must be either `sandbox` or `production`.

## Install dependencies

Use npm for local development, CI, and Docker. Commit `package-lock.json` as the only lockfile.
Use `npm ci` for a clean install; use `npm install <package>` when intentionally changing dependencies and commit both `package.json` and `package-lock.json`.
Dependency version overrides are maintained in the top-level `overrides` field of `package.json`.

```bash
npm ci
```

## Run locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Docker

Use the `.env.local` file created above to supply the public build configuration:

```bash
docker compose --env-file .env.local up --build -d
```

The app is exposed on port 3000. Compose reads the selected file on the host and
passes only the five listed `NEXT_PUBLIC_*` values as build arguments. Missing or
empty required values stop Compose before the build; `NEXT_PUBLIC_IMAGEURL` is
optional. Exported shell variables take precedence over values in the env file.
The Docker image uses a digest-pinned Node base, a reproducible `npm ci` install,
and a multi-stage standalone Next.js build. The runtime contains only traced
production files, runs as the non-root `node` user, and has a health check.
Compose limits the service to 1.5 CPUs and 1 GiB of memory.
If you already use a project-root `.env`, `docker compose up --build -d` reads it
by default. Compose does not automatically read `.env.local`.

`.dockerignore` excludes all `.env*` files (including `.env.example`), Git metadata,
local dependencies, build output, and development documentation from the build
context. Public `NEXT_PUBLIC_*` values are embedded in the client bundle at build
time; the runtime container does not need them injected again.

Next.js embeds `NEXT_PUBLIC_*` values in browser JavaScript during the build.
Changing an env file or passing `docker run -e NEXT_PUBLIC_...` does not update
those browser values. Build a separate image for each environment and rebuild
when an API URL, Square setting, or fallback image URL changes:

```bash
docker compose --env-file .env.production up --build -d
```

Create `.env.production` with the intended public values before running that command.
For CI using `docker build` directly, export the four required variables from the
example, optionally export `NEXT_PUBLIC_IMAGEURL`, then run:

```bash
docker build -t frontend-car-wash-website \
  --build-arg NEXT_PUBLIC_API_BASE_URL \
  --build-arg NEXT_PUBLIC_API_BASE_AI_URL \
  --build-arg NEXT_PUBLIC_SQUARE_APP_ID \
  --build-arg NEXT_PUBLIC_SQUARE_ENVIRONMENT \
  --build-arg NEXT_PUBLIC_IMAGEURL .
```

Build arguments and image environment variables are inspectable. Use them only
for these public values; never add backend credentials or tokens. See the
[Docker build arguments documentation](https://docs.docker.com/compose/compose-file/build/#args).

After building, verify that local env files and repository metadata are absent:

```bash
docker run --rm --entrypoint sh frontend-car-wash-website -c \
  'test "$(id -u)" -ne 0 && test -z "$(find /usr/src/app \( -name ".env*" -o -name ".git" \) -print -quit)'
```

The check should print nothing. Previously built images are unchanged; rebuild
and replace them to apply the exclusions.

## Booking flow

The app is built around a multi-step booking flow:

1. choose services
2. choose a location
3. choose an available date and time slot
4. lock the selected slot
5. enter customer/contact info
6. review total and pay with Square
7. confirm the booking

## Project structure highlights

- `src/app` — route pages and app shell
- `src/components` — UI and page components
- `src/contexts` — shared React context for booking state
- `src/hooks` — custom hooks for availability, validation, booking lock, and checkout
- `src/services` — API integrations for booking, locations, gallery, hours, chatbot, and Square-related calls
- `src/lib` — helper functions and environment validation

## Deployment notes

The Docker deployment runs a Next.js Node.js server using `npm start`. Supply the target environment's public configuration at build time and rebuild after changing it. The image retains those public values for startup; runtime overrides cannot reconfigure the browser bundle.

## Related docs

- [AGENTS.md](AGENTS.md)
- [CLAUDE.md](CLAUDE.md)
- [docker-compose.yml](docker-compose.yml)
