# Yad Byad Frontend

## Project Overview

Yad Byad connects students seeking academic assistance with student supporters. Its web interface organizes session planning, matching requests, shared resources, complaints, and report submissions through role-specific workspaces.

## Project Preview

<img src="public/project-preview.webp" alt="Yad Byad Frontend application screens and visual identity" width="520">

Application screens and visual identity. Branding mockups are presentation concepts.

## Key Features

- Student signup, sign-in, profiles, password changes, and recovery-code reset.
- Dashboards and notifications for students, supporters, and administrators.
- Exam, lecture, and casual-session calendars with search and filters.
- Matching and session requests, learning resources, complaints, and report review.
- Authenticated report-file access for the owner or an administrator.
- In-place data refresh after changes and responsive dashboard navigation.

## Live Website & Related Repository

Application: https://yadbyad-frontend.vercel.app/

Backend repository: https://github.com/mayurbohraa/yadbyad-backend

## Tech Stack

- **Interface:** React 18, Vite 4, Material UI 5, Emotion, React Router 6.
- **Libraries:** Axios, Iconify, date-fns, Moment, React Hot Toast.
- **Tools:** SWC, ESLint, Prettier.

## Prerequisites

Node.js, npm, and a configured Yad Byad API. Node.js 24 is used for this documentation verification.

## Installation & Setup

1. Clone and open the frontend:

   ```sh
   git clone https://github.com/mayurbohraa/yadbyad-frontend.git
   cd yadbyad-frontend
   ```

2. Install dependencies:

   ```sh
   npm ci
   ```

3. Configure the companion API and set its local `PORT` to `9000`.
4. If needed, copy `.env.example` to `.env.local` and set `VITE_API_URL` to the full API base URL, including `/api/v1`. Development defaults to `http://localhost:9000/api/v1`; production defaults to the hosted API. Restart Vite after changes.

## Running Locally

Development at `http://localhost:3030`:

```sh
npm run dev
```

Build to `dist/`, then preview:

```sh
npm run build
```

```sh
npm start
```

Run source checks:

```sh
npm run lint
```

There is no frontend test script configured. Dashboard requests require a running API.

## Project Structure

```text
public/               # Branding, static assets, and README preview
src/
├── api/              # Axios client and request helpers
├── components/       # Shared controls
├── forms/            # Account and form workflows
├── layouts/          # Authentication and dashboard shells
├── pages/            # Route entry points
├── routes/           # Routes and account guard
├── sections/         # Feature views and tables
└── theme/            # Material UI theme
.env.example          # Public API configuration
vercel.json           # SPA routing configuration
```

## Acknowledgements & Credits

The frontend includes the Minimal UI / Minimals starter. The MIT license and copyright notice are preserved in `LICENSE.md`.
