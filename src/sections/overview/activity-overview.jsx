import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const roles = {
  admin: {
    title: 'Work in progress',
    description: 'See what needs attention and what your team has handled.',
    rows: [
      {
        title: 'Account recovery',
        done: ['Approved', 'approvedRecoveries'],
        waiting: ['Pending', 'recoveryRequests'],
      },
      {
        title: 'Complaints',
        done: ['Resolved', 'resolvedComplaints'],
        waiting: ['Open', 'complaints'],
      },
      {
        title: 'Reports',
        done: ['Reviewed', 'reviewedReports'],
        waiting: ['To review', 'reports'],
      },
    ],
  },
  'special need student': {
    title: 'Support activity',
    description: 'See the status of your match requests and complaints.',
  },
  'part time student': {
    title: 'Support activity',
    description: 'Track your match requests, report reviews, and complaints.',
  },
};

const studentRows = [
  {
    title: 'Match requests',
    done: ['Accepted', 'matches'],
    waiting: ['Pending', 'requests'],
    other: ['Declined or dropped', 'otherMatches'],
  },
  {
    title: 'Your complaints',
    done: ['Resolved', 'resolvedComplaints'],
    waiting: ['Open', 'complaints'],
  },
];

const colors = ['#164231', '#a56713', '#637381'];

function StatusRow({ title, segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.count, 0);

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {total ? `${total} total` : 'No records yet'}
        </Typography>
      </Stack>
      <Box
        aria-hidden="true"
        sx={{
          display: 'flex',
          overflow: 'hidden',
          height: 9,
          borderRadius: 1,
          bgcolor: 'action.hover',
        }}
      >
        {total > 0 &&
          segments.map(({ label, count, color }) => (
            <Box key={label} sx={{ width: `${(count / total) * 100}%`, bgcolor: color }} />
          ))}
      </Box>
      <Stack direction="row" flexWrap="wrap" columnGap={2} rowGap={0.5}>
        {segments.map(({ label, count, color }) => (
          <Stack key={label} direction="row" alignItems="center" spacing={0.75}>
            <Box
              aria-hidden="true"
              sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }}
            />
            <Typography variant="caption" color="text.secondary">
              {count} {label.toLowerCase()}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

StatusRow.propTypes = { title: PropTypes.string.isRequired, segments: PropTypes.array.isRequired };

export default function ActivityOverview({ role, stats, loading }) {
  const config = roles[role];
  const rows = config.rows || studentRows;
  const reportCounts = [stats?.reports, stats?.reviewedReports];

  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography component="h2" variant="h6">
        {config.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        {config.description}
      </Typography>
      {loading && <Skeleton variant="rounded" height={140} />}
      {!loading && (
        <Stack spacing={3}>
          {rows.map(({ title, done, waiting, other }) => {
            const statuses = [done, waiting, ...(other ? [other] : [])];
            if (!statuses.every(([, key]) => Number.isFinite(stats?.[key]))) return null;
            return (
              <StatusRow
                key={title}
                title={title}
                segments={statuses.map(([label, key], index) => ({
                  label,
                  count: stats[key],
                  color: colors[index],
                }))}
              />
            );
          })}
          {role === 'part time student' && reportCounts.every(Number.isFinite) && (
            <StatusRow
              title="Your reports"
              segments={[
                { label: 'Reviewed', count: stats.reviewedReports, color: colors[0] },
                {
                  label: 'Awaiting review',
                  count: Math.max(0, stats.reports - stats.reviewedReports),
                  color: colors[1],
                },
              ]}
            />
          )}
          {!Number.isFinite(stats?.resolvedComplaints) && (
            <Typography variant="body2" color="text.secondary">
              Activity is currently unavailable.
            </Typography>
          )}
        </Stack>
      )}
    </Card>
  );
}

ActivityOverview.propTypes = {
  role: PropTypes.string.isRequired,
  stats: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};
