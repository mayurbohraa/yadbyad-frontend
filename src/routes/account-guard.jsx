import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import useAccount from 'src/hooks/use-account';

import { readAccount, saveAccount, clearAccount } from 'src/utils/account';

import axios from 'src/api/axios';

export default function AccountGuard() {
  const location = useLocation();
  const account = useAccount();
  const [state, setState] = useState({ loading: true, user: null, error: false });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    if (!readAccount() || !localStorage.getItem('token_status')) {
      clearAccount();
      setState({ loading: false, user: null, error: false });
      return undefined;
    }
    setState((previous) => ({ ...previous, loading: true }));
    axios
      .get('/auth/me')
      .then(({ data }) => {
        if (active) {
          saveAccount(data.data.user, data.data.token);
          setState({ loading: false, user: data.data.user, error: false });
        }
      })
      .catch((error) => {
        if (active) setState({ loading: false, user: null, error: error.response?.status !== 401 });
      });
    return () => {
      active = false;
    };
  }, [retry]);
  if (!account) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  if (state.loading)
    return (
      <Box sx={{ p: 5, textAlign: 'center' }} role="status">
        <CircularProgress aria-label="Checking your session" />
      </Box>
    );
  if (state.error)
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Unable to connect to your account. Please try again.</Alert>
        <Button onClick={() => setRetry(retry + 1)}>Try again</Button>
      </Box>
    );
  if (!state.user) return <Navigate to="/" replace state={{ from: location.pathname }} />;
  return <Outlet context={state.user.role} />;
}
