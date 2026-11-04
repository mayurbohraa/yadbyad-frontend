import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useOutletContext } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import DashboardLayout from 'src/layouts/dashboard';

import AccountGuard from './account-guard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgot-password'));
export const MatchesPage = lazy(() => import('src/pages/matches'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SchedulePage = lazy(() => import('src/pages/schedule'));
export const SubmitReportPage = lazy(() => import('src/pages/submitted-report'));
export const StudentReportSlotPage = lazy(() => import('src/pages/student-report-slot'));
export const ComplainPage = lazy(() => import('src/pages/complain'));
export const ManageReportsPage = lazy(() => import('src/pages/manage-reports'));
export const ReportSlotsPage = lazy(() => import('src/pages/report-slots'));
export const ManageComplainsPage = lazy(() => import('src/pages/manage-complain'));
export const SessionRequestsPage = lazy(() => import('src/pages/session-requests'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const AccountRecoveryPage = lazy(() => import('src/pages/account-recovery'));
export const ManageLibraryPage = lazy(() => import('src/pages/manage-library'));
export const ResourcesPage = lazy(() => import('src/pages/resources'));
export const SlotRequest = lazy(() => import('src/pages/slot-requests'));

function DashboardShell() {
  const role = useOutletContext();
  return (
    <DashboardLayout>
      {/* Keep the shell mounted while the next page's code loads. */}
      <Suspense
        fallback={
          <Box sx={{ px: 3 }}>
            <LinearProgress aria-label="Loading page" />
          </Box>
        }
      >
        <Outlet context={role} />
      </Suspense>
    </DashboardLayout>
  );
}

function AdminPages() {
  const role = useOutletContext();
  return role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default function Router() {
  const routes = useRoutes([
    {
      element: <AccountGuard />,
      children: [
        {
          element: <DashboardShell />,
          children: [
            { path: 'dashboard', element: <IndexPage /> },
            { path: 'profile', element: <ProfilePage /> },
            {
              element: <AdminPages />,
              children: [
                { path: 'account-recovery', element: <AccountRecoveryPage /> },
                { path: 'user', element: <UserPage /> },
              ],
            },
            { path: 'submitreports', element: <SubmitReportPage /> },
            { path: 'complain', element: <ComplainPage /> },
            { path: 'schedules', element: <SchedulePage /> },
            { path: 'managereports', element: <ManageReportsPage /> },
            { path: 'reportsslot', element: <ReportSlotsPage /> },
            { path: 'managecomplains', element: <ManageComplainsPage /> },
            { path: 'matches', element: <MatchesPage /> },
            { path: 'sessionrequests', element: <SessionRequestsPage /> },
            { path: 'studentreportslot', element: <StudentReportSlotPage /> },
            { path: 'managelibrary', element: <ManageLibraryPage /> },
            { path: 'resources', element: <ResourcesPage /> },
            { path: 'requests', element: <SlotRequest /> },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    { path: '/login', element: <Navigate to="/" replace /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
