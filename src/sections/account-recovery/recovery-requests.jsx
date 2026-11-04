import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';

import axios from 'src/api/axios';

export default function RecoveryRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/auth/recovery/requests');
      setRequests(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load recovery requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const accept = async (id) => {
    setPendingId(id);
    setError('');
    setNotice('');
    try {
      const { data } = await axios.post(`/auth/recovery/requests/${id}/approve`);
      setRequests((current) =>
        current.map((request) =>
          request._id === id ? { ...request, recoveryRequestStatus: 'approved' } : request
        )
      );
      setNotice(data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Unable to accept the request. Refresh and try again.'
      );
    } finally {
      setPendingId('');
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 3 }}
      >
        <Box>
          <Typography component="h2" variant="h6">
            Account recovery requests
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accept a request to notify the student in their dashboard.
          </Typography>
        </Box>
        <Button onClick={load} disabled={loading || !!pendingId}>
          Refresh
        </Button>
      </Stack>
      {(error || notice) && (
        <Alert severity={error ? 'error' : 'success'} sx={{ mx: 3, mb: 2 }}>
          {error || notice}
        </Alert>
      )}
      {!requests.length && (
        <Typography color="text.secondary" sx={{ px: 3, pb: 4 }}>
          {loading ? 'Loading requests…' : 'No recovery requests yet.'}
        </Typography>
      )}
      {requests.length > 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 620 }} aria-label="Account recovery requests">
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Requested</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>
                    {request.fullName}
                    <Typography variant="caption" component="div" color="text.secondary">
                      {request.username}
                    </Typography>
                  </TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{new Date(request.recoveryRequestedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={request.recoveryRequestStatus === 'pending' ? 'Pending' : 'Accepted'}
                      color={request.recoveryRequestStatus === 'pending' ? 'warning' : 'success'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {request.recoveryRequestStatus === 'pending' ? (
                      <LoadingButton
                        size="small"
                        variant="contained"
                        loading={pendingId === request._id}
                        disabled={!!pendingId}
                        onClick={() => accept(request._id)}
                      >
                        Accept
                      </LoadingButton>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
}
