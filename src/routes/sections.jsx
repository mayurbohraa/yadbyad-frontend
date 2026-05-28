import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
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
export const ManageLibraryPage = lazy(() => import('src/pages/manage-library'));
export const ResourcesPage = lazy(() => import('src/pages/resources'));
export const SlotRequest = lazy(() => import('src/pages/slot-requests'));

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
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
    {
      path: 'profile',
      element: <ProfilePage />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
