# Yad Byad Frontend

*Empowering student success through peer collaboration.*

## About the project

Yad Byad is a freelance client project built to support the client’s college project. It demonstrates peer support for students with special needs, part-time student supporters, and administrators. The frontend organizes academic peer support into role-specific dashboards and workflows.

## Key features

- Student signup, sign-in, profiles, password changes, and recovery-code password reset.
- Role-specific activity summaries and notifications, including administrator-reviewed account recovery.
- Exam, lecture, and casual-session calendars with a filterable schedule table and matching requests.
- Shared resources, complaints and replies, report submissions, and report review.
- **View File** opens supported report attachments for their owner or an administrator. Other formats download.

## Live website

https://yadbyad-frontend.vercel.app/

## Tech stack

React 18, Vite 4, Material UI 5, Emotion, React Router 6, Axios, date-fns, and React Hot Toast.

## Prerequisites

Node.js, npm, and a running Yad Byad backend. Verification used Node.js 24.13.0 and npm 11.12.1.

## Installation and setup

1. Open `YadByad_Frontend` and run `npm ci`.
2. Start the backend using its README.
3. If the API address differs from the default, copy `.env.example` to `.env.local` and set `VITE_API_URL`.
4. Run `npm run dev` and open the URL printed by Vite. The default port is 3030.

## Environment configuration

`VITE_API_URL` is a public API base URL that includes `/api/v1`. Development defaults to `http://localhost:9000/api/v1`. The production build defaults to the hosted backend. Keep secrets out of frontend environment files.

## Running locally

| Task | Command |
| --- | --- |
| Development server | `npm run dev` |
| Lint | `npm run lint` |
| Production build | `npm run build` |
| Preview the build | `npm run start` |

## Project structure

```text
YadByad_Frontend/
├── public/           # Branding, illustration, and static assets
├── src/
│   ├── api/          # API client and request helpers
│   ├── components/   # Shared interface controls
│   ├── forms/        # Form workflows
│   ├── layouts/      # Authentication and dashboard layouts
│   ├── pages/        # Route entry points
│   ├── routes/       # Route configuration and account guard
│   ├── sections/     # Feature views and tables
│   └── theme/        # Material UI theme
├── .env.example
└── vercel.json
```

## Acknowledgements

The frontend uses the Minimals starter. Its MIT license and copyright notice are in `LICENSE.md`.
