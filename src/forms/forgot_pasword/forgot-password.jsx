import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { PASSWORD_HELP, validPassword } from 'src/utils/account';

import axios from 'src/api/axios';

import PasswordField from 'src/components/password-field';

export default function ForgotPasswordForm({ handleClose }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setError('');
    setNotice('');
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 2 && (!validPassword(password) || password !== confirmPassword)) {
      setError(password !== confirmPassword ? 'Passwords do not match.' : PASSWORD_HELP);
      return;
    }
    setBusy(true);
    try {
      if (step === 1) {
        const { data } = await axios.post('/auth/recovery/verify', { email, recoveryCode: code });
        setResetToken(data.data.resetToken);
        setStep(2);
      } else {
        await axios.post('/auth/forgotPassword', { resetToken, newPassword: password });
        setResetToken('');
        setPassword('');
        setConfirmPassword('');
        setCode('');
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to continue. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const requestRecovery = async () => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await axios.post('/auth/recovery/request', { email });
      setNotice('If the email is registered, your request is pending review.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to record the request. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (step === 3)
    return (
      <Stack spacing={3}>
        <Alert severity="success">
          Password updated. You can now sign in with your new password.
        </Alert>
        <Button component={RouterLink} to="/" variant="contained" onClick={handleClose}>
          Back to sign in
        </Button>
      </Stack>
    );

  return (
    <Stack component="form" spacing={3} onSubmit={submit}>
      {error && <Alert severity="error">{error}</Alert>}
      {notice && <Alert severity="info">{notice}</Alert>}
      {step === 0 && (
        <TextField
          required
          type="email"
          fullWidth
          label="Account email"
          autoComplete="email"
          value={email}
          inputProps={{ maxLength: 254 }}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      )}
      {step === 1 && (
        <>
          <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
            Use the code saved from My Profile → Account recovery.
          </Typography>
          <TextField
            required
            fullWidth
            label="Recovery code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            inputProps={{ maxLength: 40, spellCheck: false }}
            helperText="Enter all 24 characters. Hyphens are optional."
          />
          <Button type="button" disabled={busy} onClick={requestRecovery}>
            Request account recovery
          </Button>
          {!notice && (
            <Typography variant="caption" color="text.secondary">
              Approval appears in dashboard notifications.
            </Typography>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <PasswordField
            label="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={PASSWORD_HELP}
            autoComplete="new-password"
            inputProps={{ maxLength: 72 }}
          />
          <PasswordField
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            error={!!confirmPassword && password !== confirmPassword}
            helperText={
              confirmPassword && password !== confirmPassword ? 'Passwords do not match.' : ''
            }
          />
        </>
      )}
      <LoadingButton type="submit" variant="contained" color="inherit" loading={busy}>
        {['Continue', 'Verify recovery code', 'Update password'][step]}
      </LoadingButton>
      {step > 0 && (
        <Button
          disabled={busy}
          onClick={() => {
            setStep(step - 1);
            setError('');
            setNotice('');
            setResetToken('');
          }}
        >
          Back
        </Button>
      )}
      <Link component={RouterLink} to="/" onClick={handleClose} textAlign="center">
        Back to sign in
      </Link>
    </Stack>
  );
}

ForgotPasswordForm.propTypes = { handleClose: PropTypes.func };
