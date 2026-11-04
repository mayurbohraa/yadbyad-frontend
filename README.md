# Yad Byad Frontend

*Empowering student success through peer collaboration.*

## About the project

Yad Byad is a college-project student support platform developed through a freelance engagement. The frontend connects students with special needs, part-time student supporters, and administrators through role-based screens.

## Key features

- Public student signup, sign-in, and guarded account pages.
- Schedules, session requests, matching, and shared resource views.
- Complaint submission, report slots, submitted reports, and administrator management screens.
- Editable profiles, password changes, and recovery-code password reset.
- Administrator-reviewed recovery requests with private dashboard notifications; no email delivery.
- Signup format information icons and scrolling confined to the form fields.

## Live website

https://yadbyad-frontend.vercel.app/

## Tech stack

React 18, Vite 4, Material UI 5, Emotion, React Router 6, Axios, React Hot Toast, and date-fns. The dashboard also contains an IBM Watson Assistant embed; service availability has not been verified.

## Prerequisites

Node.js, npm, and the running Yad Byad backend. Verification used Node.js 24.13.0 and npm 11.12.1; no Node engine version is pinned in the package.

## Installation and setup

1. Open this repository's folder, `YadByad_Frontend`.
2. Run `npm ci`.
3. If the API address needs changing, copy `.env.example` to `.env.local` without overwriting an existing file.
4. Set `VITE_API_URL=http://localhost:9000/api/v1` for the local backend.
5. Start the backend from its own repository, then run `npm run dev` here.
6. Open http://localhost:3030/. Vite may choose another port if it is occupied.

## Environment configuration

Development defaults to the backend on port 9000; production defaults to the supplied backend address. `VITE_API_URL` overrides either default at build time and must include `/api/v1`. Client environment values are public and must not contain secrets.

## Running locally and verification

```sh
npm run dev
npm run lint
npm run build
npm run start
```

`npm run start` previews the production build locally. Lint and the production build passed after folder organization. The main bundle retains a warning for exceeding 500 kB. Desktop/mobile browser checks passed for the updated authentication screens, dashboard navigation, and profile layout. A comprehensive audit of all legacy workflows remains outstanding.

## Account behavior

Students can create an account at `/signup`. Public signup cannot create administrators. My Profile allows personal-detail edits, recovery-code reveal/hide, and a current-password-verified password change; student ID and role remain read-only there.

Save the recovery code privately. Password reset verifies the email and saved code before accepting a new password. A forgotten-code request goes to the administrator under **Account Recovery**. Acceptance creates a dashboard notification only; it does not send email, reveal a code, or bypass verification.

## Project structure

```text
YadByad_Frontend/
├── public/             # application branding and static assets
├── src/
│   ├── api/            # Axios client, endpoints, shared request helpers
│   ├── components/     # reusable UI
│   ├── forms/          # form workflows
│   ├── layouts/        # authentication and dashboard layouts
│   ├── pages/          # page entry points
│   ├── routes/         # route definitions and account guard
│   ├── sections/       # feature views and tables
│   └── theme/          # design tokens and overrides
├── .env.example
├── package.json
├── vercel.json
└── vite.config.js
```

This remains an independent Git repository inside `YadByad_Code`. Private documentation, original reference files, and reusable asset copies are outside this repository. Application asset paths were preserved during organization.

## Acknowledgements

The frontend uses the Minimal UI/Minimals starter. Retain the existing MIT license and copyright notice in `LICENSE.md`, along with applicable third-party library and resource licenses.

## Dashboard and navigation

The dashboard shows role-specific totals, status bars, and recent notifications. Account Recovery has its own administrator sidebar entry. Open My Profile from the header account menu. It uses the dashboard layout. Authentication pages pair the original green background with an supplied illustration of two students studying together. The 404 page links back to the app home. Sidebar navigation keeps the dashboard layout visible and shows a progress bar while a page loads. Admin pages reuse the verified dashboard session.

Login sessions survive page refreshes and browser reopening. Logout revokes the account's sessions on the server; password changes and account removal also invalidate them. Successful saves refresh affected data in place, preserving filters and valid pagination instead of reloading the page.

Student schedules show the selected month in a calendar and a paginated details table. The event-type filter applies to both views. The table also supports text filtering by course, date, room, status, and other visible details.
