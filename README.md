**YadByad — Frontend**

**Project Overview**
- **Purpose:** A platform that connects **special needs students** with peers for academic support, offering an accessible and intuitive interface designed for ease of use and inclusivity.
- **Scope:** Frontend implemented independently — component architecture, reusable UI primitives, responsive layouts, and complete **API integration** to communicate with the backend services.

**Codebase Analysis**
- **Architecture:** The app follows a component-driven structure with isolated folders for `components`, `forms`, `pages`, `routes`, `api` and `theme` to keep concerns separated and make the UI easy to maintain and extend.
- **API layer:** Centralized API helpers handle GET/POST/PUT/DELETE calls, token-based authorization, and multipart uploads.
- **State & UX:** Forms and pages use local component state and small custom hooks for responsiveness and common behaviors (scroll-to-top, localStorage helpers, etc.).
- **Styling & Theming:** Theme tokens and overrides are in the theme folder allowing consistent palette/shadow/typography across components.

**Key Features**
- **Authentication & Roles:** Login with role-based behaviors (Admin, Special Needs Student, Part-time Student).
- **Responsive UI:** Mobile-first responsive layouts and accessible components.
- **Modular Components:** Reusable UI pieces (labels, icons, scrollbars, SVG color helpers) for fast feature development.
- **API Integration:** Centralized API service with success/error toasts, file uploads, and error handling.
- **Forms & Validation:** Multiple form flows for creating resources, scheduling, complaints, and reports.
- **Scheduling & Slot Management:** Create and request slots, manage schedules and match sessions.
- **Notifications & Reports:** Read/mark notifications, submit and manage reports.
- **Theming & Customization:** Centralized theme tokens and overrides for consistent branding.

**Install & Run (Frontend)**
- **Prerequisites:** Install Node.js and npm. Verify with:

```
node -v
npm -v
```

- **Install dependencies:**

```
npm install
```

- **Start development server:**

```
npm run dev
```

**Backend (if running locally)**
- The frontend expects a backend API at the configured `baseURL` in `src/api/axios.js`. If you have the backend source, install dependencies and run it with:

```
npm install
npm run start
```

**Standard User Logins**
- **Admin:**
  - **Username:** admin123456
  - **Email:** admin123456@qu.edu.qa
  - **Password:** Admin@123
- **Special Need Student:**
  - **Username:** sn123456
  - **Email:** sns@qu.edu.qa
  - **Password:** Student@123
- **Part Time Student:**
  - **Username:** pt123456
  - **Email:** pts@qu.edu.qa
  - **Password:** Student@123

**Notes & Next Steps**
- The frontend stores the JWT token in `localStorage` and uses it for authorization headers. To debug API calls, open the browser Network tab to inspect requests and responses.
- If you want, I can add a short debugging helper that logs outgoing requests and responses to the console or enable retry/backoff for failed requests.

