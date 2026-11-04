import { useState } from 'react';
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import useAccount from 'src/hooks/use-account';

import { saveAccount } from 'src/utils/account';

import axios from 'src/api/axios';
import AuthLayout from 'src/layouts/auth';

import FieldHelp from 'src/components/field-help';
import PasswordField from 'src/components/password-field';

export default function LoginView() {
  const navigate = useNavigate();
  const account = useAccount();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const { data } = await axios.post('/auth/login', { username: username.trim(), password });
      saveAccount(data.data.user, data.data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (account && localStorage.getItem('token_status')) return <Navigate to="/dashboard" replace />;

  return (
    <AuthLayout title="Sign in to Yad Byad">
      <Stack component="form" spacing={3} onSubmit={submit}>
        {error && <Alert severity="error">{error}</Alert>}
        <FieldHelp
          required
          fullWidth
          label="Username"
          hint="Enter the username you registered with, using letters and numbers. Use your username rather than your email address."
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
        <PasswordField
          hint="Enter your account password exactly as created. Passwords are case-sensitive. Use the eye button to show or hide it."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Link component={RouterLink} to="/forgot-password" sx={{ alignSelf: 'flex-end' }}>
          Forgot password?
        </Link>
        <LoadingButton
          type="submit"
          variant="contained"
          color="inherit"
          size="large"
          loading={busy}
        >
          Sign in
        </LoadingButton>
        <Link component={RouterLink} to="/signup" textAlign="center">
          New to Yad Byad? Create an account
        </Link>
      </Stack>
    </AuthLayout>
  );
}
