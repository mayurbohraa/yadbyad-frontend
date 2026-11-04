import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import useAccount from 'src/hooks/use-account';
import useApiRefresh from 'src/hooks/use-api-refresh';

import axios from 'src/api/axios';

import Iconify from 'src/components/iconify';

import ActivityOverview from '../activity-overview';

const statsByRole = {
  admin: [
    { key: 'students', label: 'Active students', path: '/user', icon: 'eva:people-outline' },
    {
      key: 'recoveryRequests',
      label: 'Recovery requests',
      path: '/account-recovery',
      icon: 'eva:shield-outline',
    },
    {
      key: 'complaints',
      label: 'Open complaints',
      path: '/managecomplains',
      icon: 'eva:message-square-outline',
    },
    {
      key: 'reports',
      label: 'Reports to review',
      path: '/managereports',
      icon: 'eva:file-text-outline',
    },
  ],
  'special need student': [
    { key: 'matches', label: 'Accepted matches', path: '/matches', icon: 'eva:people-outline' },
    { key: 'requests', label: 'Pending requests', path: '/requests', icon: 'eva:clock-outline' },
    {
      key: 'resources',
      label: 'Available resources',
      path: '/resources',
      icon: 'eva:book-open-outline',
    },
    {
      key: 'complaints',
      label: 'Open complaints',
      path: '/complain',
      icon: 'eva:message-square-outline',
    },
  ],
  'part time student': [
    { key: 'matches', label: 'Accepted matches', path: '/matches', icon: 'eva:people-outline' },
    { key: 'requests', label: 'Pending requests', path: '/matches', icon: 'eva:clock-outline' },
    {
      key: 'reports',
      label: 'Submitted reports',
      path: '/submitreports',
      icon: 'eva:file-text-outline',
    },
    {
      key: 'complaints',
      label: 'Open complaints',
      path: '/complain',
      icon: 'eva:message-square-outline',
    },
  ],
};

export default function AppView() {
  const account = useAccount();
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async ({ showToast = false } = {}) => {
    setError('');
    try {
      const results = await Promise.allSettled([
        axios.get('/dashboard'),
        axios.get('/notifications/fetchNotification'),
      ]);
      if (results[0].status === 'fulfilled') setStats(results[0].value.data.data);
      if (results[1].status === 'fulfilled') setNotifications(results[1].value.data.data || []);
      if (results.some((result) => result.status === 'rejected')) {
        const message = 'Some dashboard information could not be loaded. Please try again.';
        setError(message);
        if (showToast) toast.error(message);
      } else if (showToast) {
        toast.success('Dashboard updated.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
  useApiRefresh(load, [
    '/auth/users',
    '/auth/recovery',
    '/slot',
    '/complain',
    '/reports',
    '/notifications',
    '/library',
  ]);

  if (!account) return null;
  const statsConfig = statsByRole[account.role];
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4">
          Welcome back, {account.fullName?.split(' ')[0] || 'there'}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Your support hub, at a glance.
        </Typography>
      </Box>
      {error && (
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <Button size="small" onClick={() => load({ showToast: true })}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsConfig.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.key}>
            <Card
              component={RouterLink}
              to={stat.path}
              sx={{
                p: 3,
                display: 'block',
                color: 'text.primary',
                textDecoration: 'none',
                height: '100%',
                transition: 'box-shadow 150ms',
                '&:hover': { boxShadow: 8 },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 2,
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Iconify icon={stat.icon} sx={{ color: 'primary.main' }} />
              </Stack>
              {loading ? (
                <Skeleton width={64} height={48} />
              ) : (
                <Typography variant="h3" component="p">
                  {stats?.[stat.key] ?? '—'}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ActivityOverview role={account.role} stats={stats} loading={loading} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Recent notifications
            </Typography>
            {loading && <Skeleton height={90} />}
            {!loading && notifications?.length > 0 && (
              <Stack spacing={2} divider={<Divider />}>
                {notifications.slice(0, 5).map((notification) => (
                  <Box key={notification._id}>
                    <Typography variant="body2">{notification.message}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
            {!loading && notifications?.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                You’re all caught up. New updates will appear here.
              </Typography>
            )}
            {!loading && notifications === null && (
              <Typography variant="body2" color="text.secondary">
                Notifications could not be loaded. Use Retry to try again.
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
